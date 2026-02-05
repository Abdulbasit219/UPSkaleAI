import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile } from "@/store/slices/profileSlice";
import { jobsApi } from "@/lib/api.config";
import { User, FileText, Upload, CheckCircle } from "lucide-react";

export const useJobApplication = (jobId) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";
  const profileData = useSelector((state) => state.profile.data);
  const profileLoading = useSelector((state) => state.profile.loading);

  const [currentStep, setCurrentStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [jobDetails, setJobDetails] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    coverLetter: "",
    salaryExpectation: "",
    availability: "",
    resume: null,
    resumeName: "",
    portfolio: "",
    github: "",
    linkedin: "",
    remoteOk: false,
    relocationOk: false,
  });

  const steps = [
    { number: 1, title: "Personal Info", icon: <User className="w-4 h-4" /> },
    { number: 2, title: "Application", icon: <FileText className="w-4 h-4" /> },
    { number: 3, title: "Attachments", icon: <Upload className="w-4 h-4" /> },
    { number: 4, title: "Review", icon: <CheckCircle className="w-4 h-4" /> },
  ];

  // Fetch profile data on component mount
  useEffect(() => {
    if (!profileData && !profileLoading) {
      dispatch(fetchProfile());
    }
  }, [dispatch, profileData, profileLoading]);

  // Auto-fill form data when profile or session is loaded
  useEffect(() => {
    if (profileData || session?.user) {
      setFormData((prev) => ({
        ...prev,
        fullName: profileData?.name || session?.user?.name || prev.fullName,
        email: session?.user?.email || prev.email,
        phone: profileData?.phone || session?.user?.phone || prev.phone,
        location: profileData?.location || prev.location,
        github: profileData?.socialLinks?.github || prev.github,
        linkedin: profileData?.socialLinks?.linkedin || prev.linkedin,
        portfolio: profileData?.socialLinks?.website || prev.portfolio,
      }));
    }
  }, [profileData, session]);

  // Fetch Job Details
  useEffect(() => {
    const getJobDetails = async () => {
      if (!jobId) return;
      try {
        const response = await jobsApi.getById(jobId);
        if (response.data.success) {
          setJobDetails(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
    getJobDetails();
  }, [jobId]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = async (event, field) => {
    const file = event.target.files[0];
    if (file) {
      if (field === "resume") {
        setIsUploading(true);
        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
          const response = await jobsApi.uploadResume(uploadData);
          setFormData((prev) => ({
            ...prev,
            resume: response.data.url,
            resumeName: file.name,
          }));
        } catch (error) {
          console.error("Error uploading file:", error);
          alert("Failed to upload resume. Please try again.");
        } finally {
          setIsUploading(false);
        }
      }
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (
          !formData.fullName ||
          !formData.email ||
          !formData.phone ||
          !formData.location
        ) {
          alert("Please fill in all required personal information fields.");
          return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          alert("Please enter a valid email address.");
          return false;
        }
        return true;
      case 2:
        if (!formData.coverLetter || formData.coverLetter.length < 50) {
          alert("Cover letter must be at least 50 characters long.");
          return false;
        }
        return true;
      case 3:
        if (!formData.resume) {
          alert("Please upload your resume.");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    try {
      const response = await jobsApi.apply({
        jobId,
        coverLetter: formData.coverLetter,
        resume: formData.resume,
        notes: `Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nLocation: ${formData.location}\nSalary Expectation: ${formData.salaryExpectation}\nAvailability: ${formData.availability}\nGitHub: ${formData.github}\nLinkedIn: ${formData.linkedin}\nPortfolio: ${formData.portfolio}\nRemote OK: ${formData.remoteOk}\nRelocation OK: ${formData.relocationOk}`,
      });

      if (response.data.success) {
        setIsSubmitted(true);
        setCurrentStep(5);
      } else {
        alert(response.data.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert(
        error.response?.data?.message ||
          "Failed to submit application. Please try again.",
      );
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return {
    isDark,
    currentStep,
    steps,
    progress,
    formData,
    handleInputChange,
    handleFileUpload,
    handleNext,
    handlePrevious,
    handleSubmit,
    isUploading,
    jobDetails,
    isSubmitted,
    profileData,
    session,
  };
};

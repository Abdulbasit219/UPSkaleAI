import axios from "axios";

export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const apiClient = axios.create({
  baseURL: apiConfig.baseUrl,
  timeout: apiConfig.timeout,
  headers: apiConfig.headers,
});

// Jobs API
export const jobsApi = {
  // Get all jobs with optional filters
  getAll: (params) => apiClient.get('/jobs', { params }),
  
  // Get single job by ID
  getById: (id) => apiClient.get(`/jobs/${id}`),
  
  // Apply to a job
  apply: (data) => apiClient.post('/jobs/apply', data),
  
  // Create a new job (company/admin)
  create: (data) => apiClient.post('/jobs/create', data),
  
  // Update a job (company/admin)
  update: (id, data) => apiClient.put(`/jobs/update/${id}`, data),
  
  // Delete a job (company/admin)
  delete: (id) => apiClient.delete(`/jobs/update/${id}`),
  
  // Get job matches
  getMatches: () => apiClient.get('/jobs/match'),
  
  // Get user's job applications
  getApplications: () => apiClient.get('/jobs/applications'),
  
  // Upload resume
  uploadResume: (data) => apiClient.post('/upload', data, {
    headers: { "Content-Type": "multipart/form-data" },
  }),
};

// Saved Jobs API
export const savedJobsApi = {
  // Get all saved jobs
  getAll: () => apiClient.get('/jobs/saved'),
  
  // Save a job
  save: (data) => apiClient.post('/jobs/saved', data),
  
  // Remove a saved job
  remove: (id) => apiClient.delete(`/jobs/saved/${id}`),
};

// Authentication API
export const authApi = {
  // Sign up
  signup: (data) => apiClient.post('/user/signup', data),
  
  // Check username availability
  checkUsername: (username) => apiClient.get(`/check-username-unique?username=${username}`),
  
  // Verify code
  verifyCode: (data) => apiClient.post('/verify-code', data),
  
  // Resend verification code
  resendCode: (data) => apiClient.post('/resend-code', data),
};

// Company/Admin API
export const companyApi = {
  // Get company's posted jobs
  getJobs: () => apiClient.get('/company/jobs'),
  
  // Get applications for company's jobs
  getApplications: () => apiClient.get('/company/applications'),
};

// Resume Analysis API
export const resumeApi = {
  // Analyze resume
  analyze: (data) => apiClient.post('/analyze-resume', data),
};

export default apiClient;

"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

import { Rocket, Sparkles, Building } from "lucide-react";
import SharedCTABanner from "@/components/ui/CTABanner";

const CTABanner = () => {
  const router = useRouter();
  return (

  <SharedCTABanner
    className="mt-12"
    badge={{
      text: "Ready to take the next step?",
      icon: <Rocket className="w-4 h-4 text-white" />
    }}
    title="Can't find the perfect role?"
    subtitle="Let our AI create a personalized career path and recommend new opportunities daily"
    primaryBtn={{
      text: "Get AI Career Path",
      icon: <Sparkles className="w-5 h-5" />,
      onClick: () => router.push('/assessment')
    }}

    secondaryBtn={{
      text: "Browse Companies",
      icon: <Building className="w-5 h-5" />,
      onClick: () => router.push('/jobsearch')
    }}
  />
  );
};


export default CTABanner;
import React from 'react';
import { ArrowRight } from 'lucide-react';
import SharedCTABanner from "@/components/ui/CTABanner";

const CTASection = ({ isDark }) => {
  return (
    <SharedCTABanner
      isDark={isDark}
      title="Still have questions?"
      subtitle="Our team is here to help you choose the perfect plan for your career growth journey."
      primaryBtn={{
        text: "Contact Sales",
        icon: <ArrowRight className="w-5 h-5" />,
        onClick: () => {}
      }}
      secondaryBtn={{
        text: "Schedule a Demo",
        onClick: () => {}
      }}
    />
  );
};

export default CTASection;

import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export const getScoreColor = (score) => {
  if (score >= 80) return "from-green-500 to-emerald-500";
  if (score >= 60) return "from-yellow-500 to-orange-500";
  return "from-red-500 to-pink-500";
};

export const getStatusBadge = (status) => {
  const badges = {
    excellent: {
      color: "bg-green-500/10 text-green-500 border-green-500/20",
      icon: <CheckCircle2 className="w-3 h-3" />,
    },
    good: {
      color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      icon: <CheckCircle2 className="w-3 h-3" />,
    },
    average: {
      color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      icon: <AlertTriangle className="w-3 h-3" />,
    },
    poor: {
      color: "bg-red-500/10 text-red-500 border-red-500/20",
      icon: <XCircle className="w-3 h-3" />,
    },
  };
  return badges[status] || badges.poor;
};

export const extractStrengths = (analysisText) => {
  if (!analysisText) return [];

  const strengths = [];
  const lines = analysisText.split("\n");

  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    if (
      lowerLine.includes("strong") ||
      lowerLine.includes("excellent") ||
      lowerLine.includes("good") ||
      lowerLine.includes("demonstrates") ||
      lowerLine.includes("relevant")
    ) {
      if (
        line.length > 20 &&
        !line.includes("KEYWORDS") &&
        !line.includes("MISSING")
      ) {
        strengths.push(line.trim());
      }
    }
  }

  // Fallback strengths if none detected
  if (strengths.length === 0) {
    return [
      "Strong foundation in relevant technologies",
      "Good technical capabilities demonstrated",
      "Relevant experience in key areas",
    ];
  }

  return strengths.slice(0, 4);
};

export const extractImprovements = (analysisText) => {
  if (!analysisText) return [];

  const improvements = [];
  const lines = analysisText.split("\n");

  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    if (
      (lowerLine.includes("lack") ||
        lowerLine.includes("missing") ||
        lowerLine.includes("improve") ||
        lowerLine.includes("gap") ||
        lowerLine.includes("benefit from")) &&
      !line.includes("KEYWORDS FOUND")
    ) {
      if (line.length > 20) {
        improvements.push(line.trim());
      }
    }
  }

  // Fallback improvements if none detected
  if (improvements.length === 0) {
    return [
      "Add more quantifiable achievements",
      "Include missing technical skills",
      "Highlight soft skills and methodologies",
    ];
  }

  return improvements.slice(0, 4);
};

export const extractRecommendations = (analysisText) => {
  if (!analysisText) return [];

  const recommendations = [];
  const finalThoughtsIndex = analysisText
    .toLowerCase()
    .indexOf("final thoughts");

  if (finalThoughtsIndex !== -1) {
    const finalSection = analysisText.slice(finalThoughtsIndex);
    const lines = finalSection.split("\n").slice(1);

    for (const line of lines) {
      if (
        line.trim() &&
        !line.includes("MATCH PERCENTAGE") &&
        !line.includes("KEYWORDS")
      ) {
        recommendations.push(line.trim().replace(/^- /, ""));
      }
    }
  }

  // Fallback recommendations
  if (recommendations.length === 0) {
    return [
      "Quantify achievements with metrics and numbers",
      "Add missing technologies from job description",
      "Highlight Agile/Scrum experience explicitly",
      "Include testing frameworks and build tools",
    ];
  }

  return recommendations.slice(0, 4);
};

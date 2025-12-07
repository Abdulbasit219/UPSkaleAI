import { Flame, Star, TrendingUp, Layers } from "lucide-react";

export const badgeStyles = {
  "7 Day Streak Hero": {
    icon: <Flame size={28} />,
    color: "from-orange-500 to-red-500",
    earned: "Streak Milestone",
  },
  "First Project Badge": {
    icon: <Star size={28} />,
    color: "from-yellow-400 to-yellow-600",
    earned: "Completed 1 Project",
  },
  "Growing Builder Badge": {
    icon: <TrendingUp size={28} />,
    color: "from-green-400 to-green-600",
    earned: "Completed 2 Project",
  },
  "Project Master Badge": {
    icon: <Layers />,
    color: "from-purple-500 to-purple-700",
    earned: "Completed Multiple Projects",
  }
};

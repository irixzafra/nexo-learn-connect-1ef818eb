
import React from "react";

interface CourseProgressBarProps {
  progress: number;
  size?: "sm" | "md" | "lg";
}

export const CourseProgressBar: React.FC<CourseProgressBarProps> = ({ 
  progress, 
  size = "md" 
}) => {
  const getProgressColor = (value: number) => {
    if (value < 25) return "bg-red-500";
    if (value < 75) return "bg-amber-500";
    return "bg-green-500";
  };

  const getHeight = () => {
    switch (size) {
      case "sm": return "h-1.5";
      case "lg": return "h-4";
      default: return "h-2.5";
    }
  };

  const heightClass = getHeight();
  const colorClass = getProgressColor(progress);

  return (
    <div className={`w-full bg-gray-200 rounded-full ${heightClass} dark:bg-gray-700`}>
      <div 
        className={`${heightClass} rounded-full ${colorClass} transition-all duration-300 ease-in-out`} 
        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
      />
    </div>
  );
};

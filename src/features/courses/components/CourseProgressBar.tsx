
import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressBarProps {
  progress: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const CourseProgressBar: React.FC<CourseProgressBarProps> = ({
  progress,
  showLabel = true,
  size = "md",
  className,
}) => {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);
  
  // Round to whole number for display
  const displayProgress = Math.round(normalizedProgress);
  
  // Size classes
  const sizeClasses = {
    sm: "h-2",
    md: "h-4",
    lg: "h-6",
  };

  return (
    <div className={cn("space-y-1", className)}>
      <Progress 
        value={normalizedProgress} 
        className={cn(sizeClasses[size])}
      />
      {showLabel && (
        <p className="text-xs text-muted-foreground text-right">
          {displayProgress}% completado
        </p>
      )}
    </div>
  );
};


import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface InfoTooltipProps {
  content: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({
  content,
  side = "right"
}) => {
  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <button className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground">
          <Info className="h-4 w-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent side={side} className="max-w-xs">
        {content}
      </TooltipContent>
    </Tooltip>
  );
};

export default InfoTooltip;


import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface MoreDropdownMenuProps {
  children: React.ReactNode;
}

export const MoreDropdownMenu: React.FC<MoreDropdownMenuProps> = ({ children }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">More options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background border rounded-md shadow-md w-48">
        <div className="py-1">
          {children}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

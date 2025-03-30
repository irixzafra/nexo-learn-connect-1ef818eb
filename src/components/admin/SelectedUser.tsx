
import React from 'react';
import { UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SelectedUserProps {
  userName: string | null;
  onClearSelection: () => void;
}

const SelectedUser: React.FC<SelectedUserProps> = ({
  userName,
  onClearSelection
}) => {
  return (
    <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-md border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserCircle className="h-5 w-5 text-primary" />
          <span className="font-medium">{userName}</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearSelection}
        >
          Cambiar
        </Button>
      </div>
    </div>
  );
};

export default SelectedUser;

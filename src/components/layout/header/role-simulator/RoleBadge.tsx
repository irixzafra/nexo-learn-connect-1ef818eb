
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getRoleBadgeColor, getRoleName } from './roleUtils';

interface RoleBadgeProps {
  role: string;
  isSimulated: boolean;
  className?: string;
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role, isSimulated, className }) => {
  return (
    <Badge 
      className={cn(
        "cursor-pointer flex items-center gap-1 px-3 py-1.5 transition-all duration-300 hover:shadow-md",
        "border border-transparent hover:scale-102",
        getRoleBadgeColor(role || ''),
        isSimulated && "border-2 border-yellow-500 animate-pulse",
        className
      )}
    >
      <Eye className="h-3.5 w-3.5 mr-1 transition-transform duration-300 group-hover:rotate-12" />
      <span className="font-medium">{getRoleName(role || '')}</span>
      {isSimulated && (
        <span className="text-xs opacity-75 ml-1 animate-fade-in">
          (Simulado)
        </span>
      )}
    </Badge>
  );
};

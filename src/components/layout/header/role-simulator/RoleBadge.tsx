
import React from 'react';
import { UserRoleType } from '@/types/auth';
import { Shield, UserCog, GraduationCap, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoleBadgeProps {
  role: UserRoleType | string;
  isSimulated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ 
  role, 
  isSimulated = false,
  size = 'md'
}) => {
  const getRoleName = (roleStr: string): string => {
    switch (roleStr) {
      case 'admin': return 'Administrador';
      case 'instructor': return 'Instructor';
      case 'student': return 'Estudiante';
      case 'sistemas': return 'Sistemas';
      case 'moderator': return 'Moderador';
      default: return roleStr;
    }
  };
  
  const getRoleIcon = (roleStr: string) => {
    switch (roleStr) {
      case 'admin': return <Shield className="h-3.5 w-3.5" />;
      case 'instructor': return <UserCog className="h-3.5 w-3.5" />;
      case 'student': return <GraduationCap className="h-3.5 w-3.5" />;
      default: return <User className="h-3.5 w-3.5" />;
    }
  };
  
  const getRoleColor = (roleStr: string): string => {
    switch (roleStr) {
      case 'admin': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'instructor': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'student': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'sistemas': return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'moderator': return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getSizeClasses = (sizeValue: string): string => {
    switch (sizeValue) {
      case 'sm': return 'px-2 py-0.5 text-xs';
      case 'lg': return 'px-4 py-2 text-base';
      case 'md':
      default: return 'px-3 py-1.5 text-sm';
    }
  };

  const roleStr = typeof role === 'string' ? role : 'student';
  
  return (
    <button
      className={cn(
        "flex items-center gap-1.5 rounded-full font-medium transition-colors cursor-pointer",
        getRoleColor(roleStr),
        getSizeClasses(size),
        isSimulated && "ring-2 ring-yellow-400"
      )}
      title={isSimulated ? `Simulando rol: ${getRoleName(roleStr)}` : `Rol: ${getRoleName(roleStr)}`}
    >
      {getRoleIcon(roleStr)}
      <span>{getRoleName(roleStr)}</span>
    </button>
  );
};

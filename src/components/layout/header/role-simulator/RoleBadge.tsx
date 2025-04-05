
import React from 'react';
import { UserRoleType } from '@/types/auth';
import { cn } from '@/lib/utils';
import { Shield, UserCog, GraduationCap, Ghost, Terminal, Users, Lightbulb } from 'lucide-react';

interface RoleBadgeProps {
  role: UserRoleType;
  className?: string;
  showIcon?: boolean;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const RoleBadge: React.FC<RoleBadgeProps> = ({ 
  role, 
  className, 
  showIcon = true, 
  showText = true, 
  size = 'md' 
}) => {
  // Mapping of roles to colors and icons
  const roleConfig: Record<string, {
    bg: string;
    text: string;
    icon: React.FC<{ className?: string }>;
    label: string;
  }> = {
    admin: {
      bg: 'bg-red-100 dark:bg-red-900/20',
      text: 'text-red-800 dark:text-red-300',
      icon: Shield,
      label: 'Administrador'
    },
    instructor: {
      bg: 'bg-blue-100 dark:bg-blue-900/20',
      text: 'text-blue-800 dark:text-blue-300',
      icon: UserCog,
      label: 'Instructor'
    },
    student: {
      bg: 'bg-green-100 dark:bg-green-900/20',
      text: 'text-green-800 dark:text-green-300',
      icon: GraduationCap,
      label: 'Estudiante'
    },
    sistemas: {
      bg: 'bg-purple-100 dark:bg-purple-900/20',
      text: 'text-purple-800 dark:text-purple-300',
      icon: Terminal,
      label: 'Sistemas'
    },
    moderator: {
      bg: 'bg-yellow-100 dark:bg-yellow-900/20',
      text: 'text-yellow-800 dark:text-yellow-300',
      icon: Users,
      label: 'Moderador'
    },
    content_creator: {
      bg: 'bg-amber-100 dark:bg-amber-900/20',
      text: 'text-amber-800 dark:text-amber-300',
      icon: Lightbulb,
      label: 'Creador'
    },
    guest: {
      bg: 'bg-gray-100 dark:bg-gray-900/20',
      text: 'text-gray-800 dark:text-gray-300',
      icon: Ghost,
      label: 'Invitado'
    },
    anonimo: {
      bg: 'bg-gray-100 dark:bg-gray-800/20',
      text: 'text-gray-800 dark:text-gray-400',
      icon: Ghost,
      label: 'Anónimo'
    }
  };

  // Default to guest styling if role not found
  const config = roleConfig[role] || roleConfig.guest;
  const Icon = config.icon;

  // Size classes
  const sizeClasses = {
    sm: {
      badge: 'px-1.5 py-0.5 text-xs',
      icon: 'h-3 w-3'
    },
    md: {
      badge: 'px-2 py-1 text-xs',
      icon: 'h-3.5 w-3.5'
    },
    lg: {
      badge: 'px-2.5 py-1 text-sm',
      icon: 'h-4 w-4'
    }
  };

  return (
    <span className={cn(
      'inline-flex items-center gap-1 rounded-full font-medium',
      config.bg,
      config.text,
      sizeClasses[size].badge,
      className
    )}>
      {showIcon && <Icon className={sizeClasses[size].icon} />}
      {showText && <span>{config.label}</span>}
    </span>
  );
};

export default RoleBadge;

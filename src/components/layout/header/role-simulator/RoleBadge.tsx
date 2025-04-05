
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { UserRoleType } from '@/types/auth';
import { Shield, User, UserCog, Terminal, Ghost, BookOpen, Users, Pencil, BarChart, Eye } from 'lucide-react';

interface RoleBadgeProps {
  role: UserRoleType | string;
  isSimulated?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const getRoleName = (role: string): string => {
  switch (role) {
    case 'admin':
      return 'Administrador';
    case 'instructor':
      return 'Instructor';
    case 'student':
      return 'Estudiante';
    case 'sistemas':
      return 'Sistemas';
    case 'moderator':
      return 'Moderador';
    case 'content_creator':
      return 'Creador';
    case 'guest':
      return 'Invitado';
    case 'anonimo':
      return 'Anónimo';
    case 'beta_tester':
      return 'Tester';
    default:
      return role || 'Usuario';
  }
};

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'admin':
      return <Shield className="h-3.5 w-3.5" />;
    case 'instructor':
      return <BookOpen className="h-3.5 w-3.5" />;
    case 'student':
      return <User className="h-3.5 w-3.5" />;
    case 'sistemas':
      return <Terminal className="h-3.5 w-3.5" />;
    case 'moderator':
      return <UserCog className="h-3.5 w-3.5" />;
    case 'content_creator':
      return <Pencil className="h-3.5 w-3.5" />;
    case 'analytics':
      return <BarChart className="h-3.5 w-3.5" />;
    case 'guest':
      return <Users className="h-3.5 w-3.5" />;
    case 'beta_tester':
      return <Eye className="h-3.5 w-3.5" />;
    case 'anonimo':
      return <Ghost className="h-3.5 w-3.5" />;
    default:
      return <User className="h-3.5 w-3.5" />;
  }
};

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case 'admin':
      return "bg-red-100 text-red-800 hover:bg-red-200";
    case 'instructor':
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case 'student':
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case 'sistemas':
      return "bg-purple-100 text-purple-800 hover:bg-purple-200";
    case 'moderator':
      return "bg-orange-100 text-orange-800 hover:bg-orange-200";
    case 'content_creator':
      return "bg-pink-100 text-pink-800 hover:bg-pink-200";
    case 'analytics':
      return "bg-sky-100 text-sky-800 hover:bg-sky-200";
    case 'beta_tester':
      return "bg-violet-100 text-violet-800 hover:bg-violet-200";
    case 'guest':
    case 'anonimo':
      return "bg-slate-100 text-slate-800 hover:bg-slate-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

export const RoleBadge: React.FC<RoleBadgeProps> = ({
  role,
  isSimulated = false,
  size = 'md',
  onClick
}) => {
  const sizeClasses = {
    sm: 'text-[10px] py-0 h-5',
    md: 'text-xs py-0.5 h-6',
    lg: 'text-sm py-1 h-7'
  };

  return (
    <Badge
      variant="outline"
      className={`
        cursor-pointer font-medium border-none px-2 rounded-full
        ${getRoleBadgeColor(role)}
        ${sizeClasses[size]}
        ${isSimulated ? 'ring-1 ring-orange-400' : ''}
      `}
      onClick={onClick}
    >
      <div className="flex items-center gap-1">
        {getRoleIcon(role)}
        <span>{getRoleName(role)}</span>
        {isSimulated && (
          <span className="bg-orange-500 rounded-full h-1.5 w-1.5"></span>
        )}
      </div>
    </Badge>
  );
};

export default RoleBadge;

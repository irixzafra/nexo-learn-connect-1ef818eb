
import React from 'react';
import { UserRoleType } from '@/types/auth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, User, BookOpen, Users, GraduationCap, Ghost } from 'lucide-react';

interface UserRoleSelectorProps {
  value: UserRoleType;
  onChange: (role: UserRoleType) => void;
  disabled?: boolean;
}

export const UserRoleSelector: React.FC<UserRoleSelectorProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  const roles = [
    { value: 'admin', label: 'Administrador', icon: Shield },
    { value: 'instructor', label: 'Instructor', icon: BookOpen },
    { value: 'student', label: 'Estudiante', icon: GraduationCap },
    { value: 'moderator', label: 'Moderador', icon: Users },
    { value: 'guest', label: 'Invitado', icon: Ghost }
  ];

  return (
    <Select
      value={value}
      onValueChange={(newValue) => onChange(newValue as UserRoleType)}
      disabled={disabled}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Seleccionar rol" />
      </SelectTrigger>
      <SelectContent>
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <SelectItem key={role.value} value={role.value}>
              <div className="flex items-center">
                <Icon className="mr-2 h-4 w-4" />
                <span>{role.label}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

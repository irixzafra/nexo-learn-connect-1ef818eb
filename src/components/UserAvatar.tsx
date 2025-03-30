
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserAvatarProps {
  src?: string;
  fallback: string;
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ src, fallback, className }) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt={fallback} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

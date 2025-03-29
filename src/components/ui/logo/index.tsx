
import { NexoLogoBase } from './nexo-logo-base';
import { NexoLogoIcon } from './nexo-logo-icon';
import { NexoLogoLanding } from './nexo-logo-landing';

export interface NexoLogoProps {
  className?: string;
  variant?: 'default' | 'icon' | 'landing';
  subtitle?: string;
  animate?: boolean;
}

export const NexoLogo: React.FC<NexoLogoProps> = ({ 
  variant = 'default',
  ...props
}) => {
  if (variant === 'icon') {
    return <NexoLogoIcon {...props} />;
  }
  
  if (variant === 'landing') {
    return <NexoLogoLanding {...props} />;
  }
  
  return <NexoLogoBase {...props} />;
};

export * from './nexo-logo-base';
export * from './nexo-logo-icon';
export * from './nexo-logo-landing';
export * from './logo-letter-animation';
export * from './logo-particles';

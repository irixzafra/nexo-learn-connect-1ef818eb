
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { useAccessibility } from '@/hooks/useAccessibility';

interface LocalizedLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  language?: string;
  /** ID for the link, useful for accessibility */
  id?: string;
  /** Additional accessibility props */
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaHidden?: boolean;
}

/**
 * A wrapper around Link with enhanced accessibility support
 */
const LocalizedLink: React.FC<LocalizedLinkProps> = ({
  to,
  children,
  id,
  ariaLabel,
  ariaDescribedBy,
  ariaHidden,
  ...props
}) => {
  const { isScreenReaderOptimized } = useAccessibility();
  
  // Enhanced accessibility props if screen reader optimization is enabled
  const accessibilityProps = isScreenReaderOptimized
    ? {
        role: 'link',
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedBy,
        'aria-hidden': ariaHidden,
        id
      }
    : { 
        id,
        'aria-hidden': ariaHidden
      };
  
  return (
    <Link 
      to={to} 
      {...accessibilityProps}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LocalizedLink;

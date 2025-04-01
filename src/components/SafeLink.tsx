
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { isValidPath, normalizePath } from '@/utils/routeValidation';

interface SafeLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  fallbackUrl?: string;
  trackBrokenLink?: boolean;
}

/**
 * A wrapper around Link that validates the path before rendering
 * If the path is invalid, it can either show a fallback or render nothing
 */
const SafeLink: React.FC<SafeLinkProps> = ({
  to,
  fallbackUrl = '/',
  trackBrokenLink = true,
  children,
  ...props
}) => {
  // Normalize the path
  const normalizedPath = normalizePath(to);
  
  // Check if the path is valid
  const isValid = isValidPath(normalizedPath);
  
  // If not valid and we want to track broken links, log it
  if (!isValid && trackBrokenLink) {
    console.warn(`Broken link detected: ${normalizedPath}`);
    // In a real implementation, we could send this to an analytics service
  }
  
  // If the path is not valid, use the fallback or return null
  const effectivePath = isValid ? normalizedPath : fallbackUrl;
  
  return (
    <Link to={effectivePath} {...props}>
      {children}
    </Link>
  );
};

export default SafeLink;

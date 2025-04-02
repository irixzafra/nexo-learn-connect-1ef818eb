
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface SafeLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
}

const SafeLink: React.FC<SafeLinkProps> = ({ to, children, ...props }) => {
  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
};

export default SafeLink;

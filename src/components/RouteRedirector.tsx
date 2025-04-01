
import React, { ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export interface RouteRedirectorProps {
  children?: ReactNode;
}

const RouteRedirector: React.FC<RouteRedirectorProps> = ({ children }) => {
  const navigate = useNavigate();
  const { path } = useParams<{ path: string }>();

  useEffect(() => {
    if (path) {
      // Decode the path, as it might be URL encoded
      const decodedPath = decodeURIComponent(path);
      navigate(decodedPath, { replace: true });
    }
  }, [path, navigate]);

  return <>{children}</>;
};

export default RouteRedirector;

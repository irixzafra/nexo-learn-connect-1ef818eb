
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader } from 'lucide-react';
import { useRoleBasedNavigation } from '@/hooks/useRoleBasedNavigation';
import { UserRoleType } from '@/types/auth';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, userRole } = useAuth();
  const navigation = useRoleBasedNavigation(userRole as UserRoleType);
  
  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // Get role-specific home path
        let homePath = navigation.getRoleHomePath();
        
        // Make sure we're redirecting to a page with the sidebar
        if (homePath === '/home') {
          homePath = '/dashboard';
        }
        
        // Check for admin users
        if (userRole === 'admin' && !homePath.startsWith('/admin')) {
          homePath = '/admin/dashboard';
        }
        
        // Check for instructor users
        if (userRole === 'instructor' && 
            !homePath.startsWith('/instructor')) {
          homePath = '/instructor/dashboard';
        }
        
        console.log('Redirecting authenticated user to:', homePath);
        navigate(homePath);
      } else {
        // If not authenticated, redirect to landing page
        const settings = localStorage.getItem('nexo_settings');
        let defaultLandingUrl = '/landing';
        
        if (settings) {
          try {
            const parsedSettings = JSON.parse(settings);
            defaultLandingUrl = parsedSettings.default_landing_url || defaultLandingUrl;
          } catch (error) {
            console.error('Error parsing settings:', error);
          }
        }
        
        navigate(defaultLandingUrl);
      }
    }
  }, [navigate, isAuthenticated, isLoading, navigation, userRole]);
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">Cargando aplicación...</p>
        </div>
      </div>
    );
  }
  
  return null;
};

export default Index;


import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, BookOpen } from 'lucide-react';
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types/auth';

interface HomeNavigationProps {
  userRole?: UserRole;
}

const HomeNavigation: React.FC<HomeNavigationProps> = ({ userRole }) => {
  // Determine "My Courses" link based on user role
  const myCoursesLink = userRole === 'instructor' ? '/instructor/courses' : '/my-courses';
  
  // Don't show My Courses for anonymous users
  const showMyCourses = userRole !== 'anonimo';
  
  return (
    <div className="px-3 space-y-1">
      <div className="py-1">
        <h2 className="px-2 text-xs font-medium text-muted-foreground">PRINCIPAL</h2>
      </div>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <NavLink to="/home" className={({ isActive }) => 
              cn("flex items-center gap-3 w-full px-2 py-2 rounded-md",
                isActive 
                  ? "bg-accent text-accent-foreground font-medium" 
                  : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
              )
            }>
              <Home className="h-4 w-4 flex-shrink-0" />
              <span>Inicio</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
        
        <SidebarMenuItem>
          <SidebarMenuButton>
            <NavLink to="/courses" className={({ isActive }) => 
              cn("flex items-center gap-3 w-full px-2 py-2 rounded-md",
                isActive 
                  ? "bg-accent text-accent-foreground font-medium" 
                  : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
              )
            }>
              <Compass className="h-4 w-4 flex-shrink-0" />
              <span>Explorar Cursos</span>
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
        
        {showMyCourses && (
          <SidebarMenuItem>
            <SidebarMenuButton>
              <NavLink to={myCoursesLink} className={({ isActive }) => 
                cn("flex items-center gap-3 w-full px-2 py-2 rounded-md",
                  isActive 
                    ? "bg-accent text-accent-foreground font-medium" 
                    : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
                )
              }>
                <BookOpen className="h-4 w-4 flex-shrink-0" />
                <span>Mis Cursos</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </div>
  );
};

export default HomeNavigation;

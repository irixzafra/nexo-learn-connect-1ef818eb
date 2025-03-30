
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home,
  LayoutDashboard,
  Compass,
  BookOpen,
  Newspaper
} from 'lucide-react';
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { UserRoleType } from '@/types/auth';

interface HomeNavigationProps {
  role: UserRoleType;
}

const HomeNavigation: React.FC<HomeNavigationProps> = ({ role }) => {
  return (
    <SidebarGroup className="px-3">
      <SidebarGroupContent className="space-y-1">
        <SidebarMenu>
          {role === 'admin' ? (
            <SidebarMenuItem>
              <SidebarMenuButton>
                <NavLink to="/admin/dashboard" className={({ isActive }) => 
                  isActive ? "text-primary flex items-center w-full" : "flex items-center w-full"
                }>
                  <LayoutDashboard className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span>Dashboard</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : (
            <SidebarMenuItem>
              <SidebarMenuButton>
                <NavLink to="/home" className={({ isActive }) => 
                  isActive ? "text-primary flex items-center w-full" : "flex items-center w-full"
                }>
                  <Home className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span>Inicio</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          
          <SidebarMenuItem>
            <SidebarMenuButton>
              <NavLink to="/courses" className={({ isActive }) => 
                isActive ? "text-primary flex items-center w-full" : "flex items-center w-full"
              }>
                <Compass className="h-4 w-4 mr-3 flex-shrink-0" />
                <span>Explorar Cursos</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton>
              <NavLink to="/my-learning" className={({ isActive }) => 
                isActive ? "text-primary flex items-center w-full" : "flex items-center w-full"
              }>
                <BookOpen className="h-4 w-4 mr-3 flex-shrink-0" />
                <span>Mi Aprendizaje</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton>
              <NavLink to="/blog" className={({ isActive }) => 
                isActive ? "text-primary flex items-center w-full" : "flex items-center w-full"
              }>
                <Newspaper className="h-4 w-4 mr-3 flex-shrink-0" />
                <span>Blog</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default HomeNavigation;

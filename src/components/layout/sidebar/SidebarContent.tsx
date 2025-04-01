
import React, { useState } from "react";
import { LayoutDashboard, BookOpen, Users, MessageSquare, Calendar, Settings, Shield, CreditCard } from 'lucide-react';
import { useSidebar } from "@/components/ui/sidebar/use-sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar/sidebar-group";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar/sidebar-menu";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export function SidebarContent() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const isInstructor = user?.role === "instructor";

  // Estado para grupos expandibles
  const [openGroups, setOpenGroups] = useState({
    dashboard: true,
    courses: false,
    community: false,
    calendar: false,
    messages: false,
    payments: false,
    settings: false,
    admin: false,
  });

  const toggleGroup = (group: keyof typeof openGroups) => {
    setOpenGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  return (
    <div className="flex flex-col gap-1 py-2 px-2 h-full overflow-y-auto">
      {/* Dashboard Group */}
      <SidebarGroup>
        <SidebarGroupLabel 
          onClick={() => toggleGroup("dashboard")}
          className={cn("cursor-pointer", openGroups.dashboard ? "font-semibold" : "")}
        >
          Principal
        </SidebarGroupLabel>
        
        {openGroups.dashboard && (
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/dashboard" 
                    className={({ isActive }) => cn(
                      "flex items-center gap-2",
                      isActive ? "text-primary" : ""
                    )}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        )}
      </SidebarGroup>
      
      {/* Courses Group */}
      <SidebarGroup>
        <SidebarGroupLabel 
          onClick={() => toggleGroup("courses")}
          className={cn("cursor-pointer", openGroups.courses ? "font-semibold" : "")}
        >
          Cursos
        </SidebarGroupLabel>
        
        {openGroups.courses && (
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/courses" 
                    className={({ isActive }) => cn(
                      "flex items-center gap-2",
                      isActive ? "text-primary" : ""
                    )}
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Explorar Cursos</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/my-courses" 
                    className={({ isActive }) => cn(
                      "flex items-center gap-2",
                      isActive ? "text-primary" : ""
                    )}
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Mis Cursos</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        )}
      </SidebarGroup>
      
      {/* Community Group */}
      <SidebarGroup>
        <SidebarGroupLabel 
          onClick={() => toggleGroup("community")}
          className={cn("cursor-pointer", openGroups.community ? "font-semibold" : "")}
        >
          Comunidad
        </SidebarGroupLabel>
        
        {openGroups.community && (
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/community" 
                    className={({ isActive }) => cn(
                      "flex items-center gap-2",
                      isActive ? "text-primary" : ""
                    )}
                  >
                    <Users className="h-4 w-4" />
                    <span>Foros</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/messages" 
                    className={({ isActive }) => cn(
                      "flex items-center gap-2",
                      isActive ? "text-primary" : ""
                    )}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Mensajes</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        )}
      </SidebarGroup>
      
      {/* Calendar Group */}
      <SidebarGroup>
        <SidebarGroupLabel 
          onClick={() => toggleGroup("calendar")}
          className={cn("cursor-pointer", openGroups.calendar ? "font-semibold" : "")}
        >
          Calendario
        </SidebarGroupLabel>
        
        {openGroups.calendar && (
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/calendar" 
                    className={({ isActive }) => cn(
                      "flex items-center gap-2",
                      isActive ? "text-primary" : ""
                    )}
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Mi Calendario</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        )}
      </SidebarGroup>
      
      {/* Payments Group */}
      <SidebarGroup>
        <SidebarGroupLabel 
          onClick={() => toggleGroup("payments")}
          className={cn("cursor-pointer", openGroups.payments ? "font-semibold" : "")}
        >
          Pagos
        </SidebarGroupLabel>
        
        {openGroups.payments && (
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/billing" 
                    className={({ isActive }) => cn(
                      "flex items-center gap-2",
                      isActive ? "text-primary" : ""
                    )}
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Mis Pagos</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        )}
      </SidebarGroup>
      
      {/* Settings Group */}
      <SidebarGroup>
        <SidebarGroupLabel 
          onClick={() => toggleGroup("settings")}
          className={cn("cursor-pointer", openGroups.settings ? "font-semibold" : "")}
        >
          Configuración
        </SidebarGroupLabel>
        
        {openGroups.settings && (
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/settings" 
                    className={({ isActive }) => cn(
                      "flex items-center gap-2",
                      isActive ? "text-primary" : ""
                    )}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Configuración</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        )}
      </SidebarGroup>
      
      {/* Admin Group - Only visible for admin/instructor */}
      {(isAdmin || isInstructor) && (
        <SidebarGroup>
          <SidebarGroupLabel 
            onClick={() => toggleGroup("admin")}
            className={cn("cursor-pointer", openGroups.admin ? "font-semibold" : "")}
          >
            Administración
          </SidebarGroupLabel>
          
          {openGroups.admin && (
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to="/admin/dashboard" 
                      className={({ isActive }) => cn(
                        "flex items-center gap-2",
                        isActive ? "text-primary" : ""
                      )}
                    >
                      <Shield className="h-4 w-4" />
                      <span>Panel Admin</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>
      )}
    </div>
  );
};

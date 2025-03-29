
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Book, GraduationCap, Home } from 'lucide-react';
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from './SidebarMenuComponents';

const CommonNavigation: React.FC = () => {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <NavLink to="/home" end>
                <Home className="h-4 w-4" />
                <span>Inicio</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <NavLink to="/courses">
                <Book className="h-4 w-4" />
                <span>Cursos</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <NavLink to="/home/my-courses">
                <GraduationCap className="h-4 w-4" />
                <span>Mi aprendizaje</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* Solo mostramos enlaces a funcionalidades implementadas */}
          {/*
          <SidebarMenuItem>
            <SidebarMenuButton>
              <NavLink to="/home/calendar">
                <Calendar className="h-4 w-4" />
                <span>Calendario</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <NavLink to="/home/messages">
                <MessageSquare className="h-4 w-4" />
                <span>Mensajes</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          */}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default CommonNavigation;

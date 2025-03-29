
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Book, Home, Users } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDown } from 'lucide-react';
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from './SidebarMenuComponents';

const InstructorNavigation: React.FC = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="instructor">
        <AccordionTrigger className='hover:no-underline'>
          Instructor
          <ChevronDown className="h-4 w-4" />
        </AccordionTrigger>
        <AccordionContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <NavLink to="/instructor/dashboard">
                      <Home className="h-4 w-4" />
                      <span>Dashboard</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <NavLink to="/instructor/courses">
                      <Book className="h-4 w-4" />
                      <span>Mis Cursos</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <NavLink to="/instructor/students">
                      <Users className="h-4 w-4" />
                      <span>Estudiantes</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default InstructorNavigation;

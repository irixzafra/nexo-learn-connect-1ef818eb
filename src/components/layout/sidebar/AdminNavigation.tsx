
import React from 'react';
import { NavLink } from 'react-router-dom';
import { TestTube, Users } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDown } from 'lucide-react';
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from './SidebarMenuComponents';

const AdminNavigation: React.FC = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="admin">
        <AccordionTrigger className='hover:no-underline'>
          Administración
          <ChevronDown className="h-4 w-4" />
        </AccordionTrigger>
        <AccordionContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <NavLink to="/home/users">
                      <Users className="h-4 w-4" />
                      <span>Usuarios</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <NavLink to="/admin/test-data">
                      <TestTube className="h-4 w-4" />
                      <span>Datos de Prueba</span>
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

export default AdminNavigation;

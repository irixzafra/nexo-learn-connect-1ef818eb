
import React from 'react';
import { NavLink } from 'react-router-dom';
import { CaseSensitive, BookOpen, School, FileText, CheckSquare } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface EnsenanzaNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const EnsenanzaNavigation: React.FC<EnsenanzaNavigationProps> = ({ isOpen, onToggle }) => {
  return (
    <div className="px-3 py-1">
      <Collapsible 
        open={isOpen} 
        onOpenChange={onToggle}
        className="space-y-1"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-2 text-sm font-medium rounded-md hover:bg-accent/50 transition-colors">
          <div className="flex items-center gap-3">
            <CaseSensitive className="h-4 w-4 text-primary" />
            <span>Enseñanza</span>
          </div>
          <div className={cn(
            "h-5 w-5 rounded-md flex items-center justify-center transition-transform",
            isOpen ? "rotate-180" : ""
          )}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1 animate-accordion">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <NavLink to="/instructor/dashboard" className={({ isActive }) => 
                  cn("flex items-center gap-3 w-full px-2 py-2 rounded-md ml-7",
                    isActive 
                      ? "bg-accent text-accent-foreground font-medium" 
                      : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
                  )
                }>
                  <CaseSensitive className="h-4 w-4 flex-shrink-0" />
                  <span>Panel Instructor</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton>
                <NavLink to="/instructor/courses" className={({ isActive }) => 
                  cn("flex items-center gap-3 w-full px-2 py-2 rounded-md ml-7",
                    isActive 
                      ? "bg-accent text-accent-foreground font-medium" 
                      : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
                  )
                }>
                  <BookOpen className="h-4 w-4 flex-shrink-0" />
                  <span>Gestionar Mis Cursos</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton>
                <NavLink to="/instructor/students" className={({ isActive }) => 
                  cn("flex items-center gap-3 w-full px-2 py-2 rounded-md ml-7",
                    isActive 
                      ? "bg-accent text-accent-foreground font-medium" 
                      : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
                  )
                }>
                  <School className="h-4 w-4 flex-shrink-0" />
                  <span>Estudiantes</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton>
                <div className="flex items-center gap-3 w-full px-2 py-2 rounded-md ml-7 opacity-50 text-foreground cursor-not-allowed">
                  <CheckSquare className="h-4 w-4 flex-shrink-0" />
                  <span>Quizzes</span>
                  <span className="ml-auto text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">Próximamente</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton>
                <div className="flex items-center gap-3 w-full px-2 py-2 rounded-md ml-7 opacity-50 text-foreground cursor-not-allowed">
                  <FileText className="h-4 w-4 flex-shrink-0" />
                  <span>Tareas</span>
                  <span className="ml-auto text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">Próximamente</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default EnsenanzaNavigation;


import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { UserRoleType } from '@/types/auth';
import { RoleSwitcher } from '@/components/admin/RoleSwitcher';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { UserSearch } from '@/components/admin/UserSearch';
import { ArrowLeft, Search, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GlobalRoleSwitcherProps {
  className?: string;
  showLabel?: boolean;
  compact?: boolean;
}

const GlobalRoleSwitcher: React.FC<GlobalRoleSwitcherProps> = ({ 
  className,
  showLabel = true,
  compact = false
}) => {
  const { userRole, viewAsRole, setViewAsRole } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Si no es admin, no mostrar el componente
  if (userRole !== 'admin') {
    return null;
  }

  const handleRoleChange = (role: UserRoleType) => {
    setViewAsRole(role);
    toast.success(`Vista cambiada a: ${role}`);
  };

  const handleReturnToOriginalRole = () => {
    setViewAsRole('current');
    toast.success('Volviendo a tu rol original');
  };

  const isViewingAs = viewAsRole !== 'current';

  return (
    <div className={cn("space-y-2", className)}>
      {isViewingAs && !compact && (
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex items-center justify-center gap-1"
          onClick={handleReturnToOriginalRole}
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-1" />
          Volver a mi rol (admin)
        </Button>
      )}
      
      <div className="flex items-center gap-2">
        <RoleSwitcher 
          currentViewRole={viewAsRole} 
          onChange={handleRoleChange}
          showLabel={showLabel}
          size={compact ? "sm" : "default"}
        />
        
        <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size={compact ? "icon" : "default"} 
              className={compact ? "h-8 w-8 p-0" : ""}
            >
              <Search className="h-4 w-4 mr-2" />
              {!compact && <span>Buscar usuario</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="end">
            <UserSearch onClose={() => setIsSearchOpen(false)} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default GlobalRoleSwitcher;

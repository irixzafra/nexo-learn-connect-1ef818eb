
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { UserRoleType } from '@/types/auth';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, ArrowLeftRight, Shield, User, Terminal, Ghost, GraduationCap, BookOpen, Users, Lightbulb, Search, Loader } from 'lucide-react';
import RoleIndicator from '@/components/layout/header/RoleIndicator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { supabase } from '@/lib/supabase';
import { debounce } from 'lodash.debounce';

interface UserSearchResult {
  id: string;
  fullName: string;
  email: string;
  role: UserRoleType;
}

interface RoleSwitcherProps {
  className?: string;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ className }) => {
  const { userRole, effectiveRole, simulatedRole, setSimulatedRole, resetToOriginalRole, isViewingAsOtherRole } = useAuth();
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<UserSearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  // Solo los administradores pueden cambiar roles
  if (userRole !== 'admin') {
    return null;
  }

  // Función para buscar usuarios (debounced)
  const searchUsers = async (term: string) => {
    if (term.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('search-users-simulation', {
        body: { searchTerm: term },
      });

      if (error) {
        console.error('Error searching users:', error);
        return;
      }

      setSearchResults(data || []);
    } catch (err) {
      console.error('Error calling search function:', err);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounce the search to avoid too many API calls
  const debouncedSearch = debounce(searchUsers, 300);

  // Search when the term changes
  useEffect(() => {
    if (searchTerm.length >= 2) {
      debouncedSearch(searchTerm);
    } else {
      setSearchResults([]);
    }
    return () => debouncedSearch.cancel();
  }, [searchTerm]);
  
  const handleRoleChange = (role: UserRoleType | 'current') => {
    if (role === 'current') {
      resetToOriginalRole();
    } else {
      setSimulatedRole(role);
    }
    setIsOpen(false);
  };

  const handleUserSelect = (user: UserSearchResult) => {
    setSimulatedRole(user.role, user.id, user.fullName);
    setSearchTerm('');
    setSearchResults([]);
    setIsOpen(false);
  };

  const getRoleIcon = (role: UserRoleType) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'instructor':
        return <BookOpen className="h-4 w-4 text-amber-500" />;
      case 'sistemas':
        return <Terminal className="h-4 w-4 text-blue-500" />;
      case 'moderator':
        return <Users className="h-4 w-4 text-purple-500" />;
      case 'content_creator':
        return <Lightbulb className="h-4 w-4 text-yellow-500" />;
      case 'anonimo':
      case 'guest':
        return <Ghost className="h-4 w-4" />;
      case 'student':
      default:
        return <GraduationCap className="h-4 w-4 text-emerald-500" />;
    }
  };

  const getRoleLabel = (role: UserRoleType) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'instructor':
        return 'Instructor';
      case 'student':
        return 'Estudiante';
      case 'sistemas':
        return 'Sistemas';
      case 'moderator':
        return 'Moderador';
      case 'content_creator':
        return 'Creador de Contenido';
      case 'guest':
        return 'Invitado';
      case 'anonimo':
        return 'Anónimo';
      default:
        return role;
    }
  };

  // Roles disponibles para vista previa
  const availableRoles: UserRoleType[] = ['admin', 'instructor', 'student', 'sistemas', 'moderator', 'content_creator', 'guest', 'anonimo'];
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`flex items-center gap-2 ${className}`}
            >
              <GraduationCap className="h-4 w-4" />
              <span className="hidden md:inline">Vista como: {getRoleLabel(effectiveRole as UserRoleType)}</span>
              <span className="inline md:hidden">Vista</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              Buscar usuario específico:
            </div>
            
            <div className="px-2 pb-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre o email..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {isSearching && (
                  <Loader className="absolute right-2 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />
                )}
              </div>
            </div>
            
            {searchResults.length > 0 && (
              <>
                <div className="max-h-60 overflow-y-auto">
                  {searchResults.map((user) => (
                    <DropdownMenuItem 
                      key={user.id}
                      onSelect={() => handleUserSelect(user)}
                      className="flex items-start gap-2 py-2"
                    >
                      <User className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-medium">{user.fullName}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-muted-foreground">Rol:</span>
                          <span className="flex items-center gap-1 text-xs">
                            {getRoleIcon(user.role)}
                            {getRoleLabel(user.role)}
                          </span>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
              </>
            )}
            
            {searchTerm && searchResults.length === 0 && !isSearching && (
              <div className="px-2 py-2 text-center text-sm text-muted-foreground">
                No se encontraron usuarios
              </div>
            )}
            
            <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              Vista previa como rol:
            </div>
            
            {availableRoles.map((role) => (
              <DropdownMenuItem 
                key={role}
                onSelect={() => handleRoleChange(role)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    {getRoleIcon(role)}
                    <span>{getRoleLabel(role)}</span>
                  </div>
                  {effectiveRole === role && <Check className="h-4 w-4" />}
                </div>
              </DropdownMenuItem>
            ))}
            
            {isViewingAsOtherRole && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onSelect={() => handleRoleChange('current')}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeftRight className="h-4 w-4 mr-2" />
                  <span>Volver a mi rol ({getRoleLabel(userRole as UserRoleType)})</span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>Vista previa como otro rol</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default RoleSwitcher;

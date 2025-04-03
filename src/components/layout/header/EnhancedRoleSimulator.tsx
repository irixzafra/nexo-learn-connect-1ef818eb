
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { 
  Shield, 
  BookOpen, 
  GraduationCap, 
  Terminal, 
  Ghost, 
  Eye, 
  RotateCcw,
  Search,
  UserCog,
  Users
} from 'lucide-react';
import { UserRoleType } from '@/types/auth';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

interface UserSearchResult {
  id: string;
  full_name: string;
  email?: string;
  role: string;
}

export const EnhancedRoleSimulator = () => {
  const { userRole, effectiveRole, isViewingAsOtherRole, setSimulatedRole, resetToOriginalRole } = useAuth();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userResults, setUserResults] = useState<UserSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Get the badge styling based on the role
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200';
      case 'instructor':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200';
      case 'student':
        return 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200';
      case 'sistemas':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200';
      case 'moderator':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200';
      case 'content_creator':
        return 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  // Get the friendly display name for a role
  const getRoleName = (role: string) => {
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
        return role.charAt(0).toUpperCase() + role.slice(1);
    }
  };

  // Get an appropriate icon for each role
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'instructor':
        return <BookOpen className="h-4 w-4" />;
      case 'student':
        return <GraduationCap className="h-4 w-4" />;
      case 'sistemas':
        return <Terminal className="h-4 w-4" />;
      case 'moderator':
        return <UserCog className="h-4 w-4" />;
      case 'content_creator':
        return <Users className="h-4 w-4" />;
      case 'anonimo':
      case 'guest':
        return <Ghost className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  // List of available roles for quick selection
  const availableRoles: UserRoleType[] = [
    'admin',
    'instructor',
    'student',
    'sistemas',
    'moderator',
    'content_creator',
    'guest',
    'anonimo'
  ];
  
  // Handle switching to a specific role
  const handleSwitchRole = (role: UserRoleType) => {
    setSimulatedRole(role);
    setOpen(false);
  };
  
  // Search for users by name or email
  const searchUsers = async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setUserResults([]);
      return;
    }
    
    setIsSearching(true);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email, role')
        .or(`full_name.ilike.%${query}%,email.ilike.%${query}%`)
        .limit(5);
      
      if (error) throw error;
      
      setUserResults(data || []);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setIsSearching(false);
    }
  };
  
  // When search query changes, search for users
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        searchUsers(searchQuery);
      }
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Reseteamos los resultados cuando se cierra el popover
  useEffect(() => {
    if (!open) {
      setSearchQuery('');
      setUserResults([]);
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Badge 
          className={cn(
            "cursor-pointer flex items-center gap-1 px-3 py-1 transition-colors",
            getRoleBadgeColor(effectiveRole || ''),
            isViewingAsOtherRole && "border-2 border-yellow-500"
          )}
        >
          <Eye className="h-3.5 w-3.5 mr-1" />
          <span>{getRoleName(effectiveRole || '')}</span>
          {isViewingAsOtherRole && <span className="text-xs opacity-75">(Simulado)</span>}
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Command>
          <CommandInput 
            placeholder="Buscar rol o usuario..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandEmpty>No se encontraron resultados</CommandEmpty>
            
            {/* Quick role selection */}
            <CommandGroup heading="Cambiar a rol">
              {availableRoles.map((role) => (
                <CommandItem
                  key={role}
                  onSelect={() => handleSwitchRole(role)}
                  className="flex items-center gap-2"
                >
                  {getRoleIcon(role)}
                  <span>{getRoleName(role)}</span>
                  {role === effectiveRole && 
                    <Badge variant="outline" className="ml-auto text-xs">Actual</Badge>
                  }
                </CommandItem>
              ))}
            </CommandGroup>
            
            {/* User search results */}
            {userResults.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup heading="Usuarios encontrados">
                  {userResults.map((user) => (
                    <CommandItem
                      key={user.id}
                      onSelect={() => {
                        // Simulate this user's role
                        if (user.role) {
                          handleSwitchRole(user.role as UserRoleType);
                        }
                      }}
                      className="flex items-center gap-2"
                    >
                      {getRoleIcon(user.role)}
                      <div className="flex flex-col">
                        <span className="text-sm">{user.full_name}</span>
                        <span className="text-xs text-muted-foreground">{user.email || 'No email'}</span>
                      </div>
                      <Badge variant="outline" className="ml-auto text-xs">
                        {getRoleName(user.role)}
                      </Badge>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
            
            {/* Reset option when viewing as another role */}
            {isViewingAsOtherRole && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      resetToOriginalRole();
                      setOpen(false);
                    }}
                    className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Volver a mi rol original: {getRoleName(userRole || '')}</span>
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default EnhancedRoleSimulator;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bell, Search } from 'lucide-react';
import { UserMenu } from '@/components/layout/header/UserMenu';
import { useAuth } from '@/contexts/auth';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const HeaderActions = () => {
  const { isAuthenticated, profile } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => navigate('/auth/login')}>Iniciar sesión</Button>
        <Button onClick={() => navigate('/auth/register')}>Registrarse</Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="relative hidden md:flex items-center">
        <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar en la plataforma"
          className="w-[200px] lg:w-[300px] pl-8 bg-background"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="h-5 w-5 p-0 flex items-center justify-center absolute -top-1 -right-1">3</Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            Nueva lección disponible
          </DropdownMenuItem>
          <DropdownMenuItem>
            Tu curso ha sido actualizado
          </DropdownMenuItem>
          <DropdownMenuItem>
            Mensaje del instructor
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UserMenu />
    </div>
  );
};

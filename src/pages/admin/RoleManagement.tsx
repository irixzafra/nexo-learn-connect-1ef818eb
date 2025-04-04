
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserRolesTable from '@/components/admin/roles/UserRolesTable';
import RoleManagementSearch from '@/components/admin/roles/RoleManagementSearch';
import { useRoleManagement } from '@/hooks/useRoleManagement';
import { Button } from '@/components/ui/button';
import { PlusCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserRoleSearch } from '@/components/admin/UserRoleSearch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UserProfile } from '@/types/auth'; // Make sure we're using the correct UserProfile type

const RoleManagement: React.FC = () => {
  const { users, isLoading, searchTerm, setSearchTerm, handleRoleChange } = useRoleManagement();
  const [openAddDialog, setOpenAddDialog] = React.useState(false);

  // Cast the users array to ensure TypeScript knows we're working with the correct type
  // This is necessary because there seems to be a mismatch between different UserProfile types
  const typedUsers = users as any[];

  return (
    <div className="container mx-auto p-6">
      {/* AdminNavigation was removed as it's no longer needed */}
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Roles y Permisos</h1>
          <p className="text-muted-foreground mt-1">
            Administra los roles y permisos de los usuarios de la plataforma
          </p>
        </div>
        
        <div className="flex gap-2">
          <Link to="/admin/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Dashboard
            </Button>
          </Link>
          
          <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
            <DialogTrigger asChild>
              <Button size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Añadir Usuario
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Buscar y Añadir Usuario</DialogTitle>
                <DialogDescription>
                  Busca usuarios por nombre y asígnales un rol en el sistema.
                </DialogDescription>
              </DialogHeader>
              <UserRoleSearch onClose={() => setOpenAddDialog(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <RoleManagementSearch 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />
          
          <UserRolesTable 
            users={typedUsers} 
            isLoading={isLoading} 
            handleRoleChange={handleRoleChange} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleManagement;

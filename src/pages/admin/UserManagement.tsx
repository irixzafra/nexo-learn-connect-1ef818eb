import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { UserProfile, UserRoleType } from "@/types/auth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UserRoleSwitcher } from "@/components/admin/UserRoleSwitcher";
import { Search, RefreshCw, UserPlus, ChevronLeft, UserCog, PencilLine, Trash2, ArrowLeft, LayoutDashboard, Users as UsersIcon, BarChart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRoleSearch } from "@/components/admin/UserRoleSearch";
import SectionPageLayout, { PageSection } from "@/layouts/SectionPageLayout";
import { UserRoleDisplay } from "@/features/users/UserRoleType";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserAdminStats } from "@/features/users/UserAdminStats";
import UserActivityChart from "@/features/users/charts/UserActivityChart";
import UserRoleDistribution from "@/features/users/charts/UserRoleDistribution";
import { useUserStatistics } from "@/features/users/hooks/useUserStatistics";
import { UserManagementTabs } from "@/features/users/UserManagementTabs";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  const { stats, isLoading: isStatsLoading } = useUserStatistics();
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching users:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudieron cargar los usuarios.",
        });
        return;
      }
      
      setUsers(data as UserProfile[]);
    } catch (error) {
      console.error('Error in fetchUsers:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al obtener los usuarios.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: UserRoleType) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) {
        console.error('Error updating user role:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo actualizar el rol del usuario.",
        });
        return;
      }

      setUsers(prevUsers => 
        prevUsers.map(u => 
          u.id === userId ? { ...u, role: newRole } : u
        )
      );

      // Update selected user if dialog is open
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser({...selectedUser, role: newRole});
      }

      toast({
        title: "Rol actualizado",
        description: `El rol del usuario ha sido actualizado a ${newRole}.`,
      });
    } catch (error) {
      console.error('Error in handleRoleChange:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al cambiar el rol.",
      });
    }
  };

  const handleSelectUser = (user: UserProfile) => {
    setSelectedUser(user);
    setIsUserDialogOpen(true);
  };

  const handleSelectAllUsers = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleToggleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers(prev => [...prev, userId]);
    } else {
      setSelectedUsers(prev => prev.filter(id => id !== userId));
    }
  };

  const filteredUsers = searchTerm.trim() === "" 
    ? users 
    : users.filter(user => 
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <SectionPageLayout
      header={{
        title: "Gestión de Usuarios",
        description: "Administra los usuarios y sus roles en la plataforma",
        actions: [
          {
            label: "Añadir Usuario",
            icon: <UserPlus className="h-4 w-4" />,
            onClick: () => console.log("Añadir usuario clicked"),
          }
        ],
        breadcrumbs: [
          { title: "Dashboard", href: "/admin/dashboard" },
          { title: "Gestión de Usuarios" }
        ]
      }}
    >
      <div className="flex mb-4">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/admin/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Dashboard
          </Link>
        </Button>
      </div>

      <Tabs 
        defaultValue="overview" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden md:inline">Vista General</span>
          </TabsTrigger>
          <TabsTrigger value="user-management" className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4" />
            <span className="hidden md:inline">Gestión de Usuarios</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span className="hidden md:inline">Analíticas</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Vista General / Dashboard */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <UserAdminStats 
            totalUsers={stats.totalUsers} 
            activeUsers={stats.activeUsers}
            newUsers={stats.newUsers}
            inactiveUsers={stats.inactiveUsers}
            loading={isStatsLoading}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Activity Chart */}
            <UserActivityChart 
              data={stats.activityData}
              loading={isStatsLoading}
            />
            
            {/* User Role Distribution */}
            <UserRoleDistribution 
              data={stats.roleDistribution}
              loading={isStatsLoading}
            />
          </div>
          
          {/* Recent Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Usuarios Recientes</CardTitle>
              <CardDescription>
                Últimos usuarios registrados en la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Usuario</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Fecha de registro</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center h-24">
                          <div className="flex justify-center">
                            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-primary"></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.slice(0, 5).map((user) => (
                        <TableRow 
                          key={user.id} 
                          className="cursor-pointer hover:bg-accent"
                          onClick={() => handleSelectUser(user)}
                        >
                          <TableCell className="font-medium">
                            {user.full_name || 'Usuario sin nombre'}
                          </TableCell>
                          <TableCell>
                            <UserRoleDisplay role={user.role} showIcon={true} />
                          </TableCell>
                          <TableCell>
                            {new Date(user.created_at || '').toLocaleDateString()}
                          </TableCell>
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-2">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectUser(user);
                                }}
                              >
                                <PencilLine className="h-4 w-4" />
                              </Button>
                              <UserRoleSwitcher 
                                userId={user.id}
                                currentRole={user.role}
                                onRoleChange={handleRoleChange}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              {!isLoading && users.length > 5 && (
                <div className="flex justify-center mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab("user-management")}
                  >
                    Ver todos los usuarios
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* User Management Tab */}
        <TabsContent value="user-management" className="space-y-6">
          <UserManagementTabs isAdmin={true} />
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <CardTitle>Lista de Usuarios</CardTitle>
                  <CardDescription>
                    Gestiona los usuarios de la plataforma y sus roles
                  </CardDescription>
                </div>
                <div className="relative mt-4 md:mt-0 w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar usuarios..."
                    className="pl-8 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox 
                            checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                            onCheckedChange={handleSelectAllUsers}
                            aria-label="Seleccionar todos"
                          />
                        </TableHead>
                        <TableHead className="w-[250px]">Usuario</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead className="hidden md:table-cell">Fecha de registro</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <TableRow 
                            key={user.id} 
                            className="cursor-pointer hover:bg-accent"
                            onClick={() => handleSelectUser(user)}
                          >
                            <TableCell onClick={(e) => e.stopPropagation()}>
                              <Checkbox 
                                checked={selectedUsers.includes(user.id)}
                                onCheckedChange={(checked) => handleToggleSelectUser(user.id, !!checked)}
                                aria-label={`Seleccionar ${user.full_name || 'Usuario sin nombre'}`}
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              {user.full_name || 'Usuario sin nombre'}
                            </TableCell>
                            <TableCell>
                              <UserRoleDisplay role={user.role} showIcon={true} />
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {new Date(user.created_at || '').toLocaleDateString()}
                            </TableCell>
                            <TableCell onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center gap-2">
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectUser(user);
                                  }}
                                >
                                  <PencilLine className="h-4 w-4" />
                                </Button>
                                <UserRoleSwitcher 
                                  userId={user.id}
                                  currentRole={user.role}
                                  onRoleChange={handleRoleChange}
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center h-24">
                            {searchTerm.trim() !== "" 
                              ? "No se encontraron usuarios que coincidan con la búsqueda." 
                              : "No hay usuarios para mostrar."}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <UserAdminStats 
            totalUsers={stats.totalUsers} 
            activeUsers={stats.activeUsers}
            newUsers={stats.newUsers}
            inactiveUsers={stats.inactiveUsers}
            loading={isStatsLoading}
          />
          
          <Card>
            <CardHeader>
              <CardTitle>Tendencias de Crecimiento</CardTitle>
              <CardDescription>
                Análisis detallado del crecimiento de usuarios en la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <UserActivityChart 
                data={stats.activityData}
                loading={isStatsLoading}
                className="h-full border-0 shadow-none"
              />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribución por Roles</CardTitle>
                <CardDescription>
                  Distribución de usuarios según su rol
                </CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <UserRoleDistribution 
                  data={stats.roleDistribution}
                  loading={isStatsLoading}
                  className="h-full border-0 shadow-none"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Retención de Usuarios</CardTitle>
                <CardDescription>
                  Tasa de retención de usuarios por mes
                </CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                {isStatsLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    Gráfico de retención en desarrollo
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* User Details Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Detalles del Usuario</DialogTitle>
            <DialogDescription>
              Información completa del usuario seleccionado
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium">Nombre:</span>
                <span>{selectedUser.full_name || 'Usuario sin nombre'}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium">Rol:</span>
                <UserRoleDisplay role={selectedUser.role} showIcon={true} />
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium">Fecha de registro:</span>
                <span>{new Date(selectedUser.created_at || '').toLocaleDateString()}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium">ID de usuario:</span>
                <span className="text-xs text-muted-foreground break-all">{selectedUser.id}</span>
              </div>
              <div className="pt-4">
                <span className="text-sm font-medium">Cambiar rol:</span>
                <div className="mt-2">
                  <UserRoleSwitcher 
                    userId={selectedUser.id}
                    currentRole={selectedUser.role}
                    onRoleChange={handleRoleChange}
                  />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SectionPageLayout>
  );
};

export default UserManagement;

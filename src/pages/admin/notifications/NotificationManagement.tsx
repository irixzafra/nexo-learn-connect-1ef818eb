
import React, { useState } from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Bell, 
  MessageSquare, 
  Trophy, 
  Users, 
  Megaphone, 
  Sparkles, 
  Filter, 
  PlusCircle, 
  Send, 
  Trash2,
  Info,
  Search
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { NotificationType } from '@/types/notifications';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
}

const NotificationManagement: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [notificationType, setNotificationType] = useState<NotificationType>('announcement');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationContent, setNotificationContent] = useState('');
  const [selectedReceiverType, setSelectedReceiverType] = useState<'all' | 'role' | 'individual'>('all');
  const [selectedRole, setSelectedRole] = useState<string>('student');
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [actionUrl, setActionUrl] = useState('');

  // Fetch notifications
  const { data: notifications = [], isLoading: isLoadingNotifications } = useQuery({
    queryKey: ['admin-notifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch users for recipient selection
  const { data: users = [], isLoading: isLoadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email, role');
      
      if (error) throw error;
      return data as User[];
    }
  });

  // Send notification mutation
  const sendNotification = useMutation({
    mutationFn: async ({ 
      userIds, 
      type, 
      title, 
      content, 
      actionUrl 
    }: { 
      userIds: string[]; 
      type: NotificationType; 
      title: string; 
      content?: string; 
      actionUrl?: string;
    }) => {
      if (!userIds.length) {
        throw new Error('No recipients selected');
      }

      const notificationsToInsert = userIds.map(userId => ({
        user_id: userId,
        type,
        title,
        content,
        action_url: actionUrl,
        is_read: false,
        sender_id: user?.id,
        sender_name: user?.user_metadata?.full_name || 'Admin',
        sender_avatar: user?.user_metadata?.avatar_url
      }));

      const { data, error } = await supabase
        .from('notifications')
        .insert(notificationsToInsert)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-notifications'] });
      toast.success('Notificaciones enviadas correctamente');
      setShowSendDialog(false);
      resetForm();
    },
    onError: (error) => {
      console.error('Error sending notifications:', error);
      toast.error('Error al enviar notificaciones');
    }
  });

  // Delete notification mutation
  const deleteNotification = useMutation({
    mutationFn: async (notificationId: string) => {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-notifications'] });
      toast.success('Notificación eliminada correctamente');
    },
    onError: (error) => {
      console.error('Error deleting notification:', error);
      toast.error('Error al eliminar la notificación');
    }
  });

  const resetForm = () => {
    setNotificationType('announcement');
    setNotificationTitle('');
    setNotificationContent('');
    setSelectedReceiverType('all');
    setSelectedRole('student');
    setSelectedUserId('');
    setActionUrl('');
  };

  const handleSendNotification = () => {
    if (!notificationTitle) {
      toast.error('Por favor, introduce un título para la notificación');
      return;
    }

    let recipientUserIds: string[] = [];

    // Determine recipients based on selection
    if (selectedReceiverType === 'all') {
      recipientUserIds = users.map(user => user.id);
    } else if (selectedReceiverType === 'role') {
      recipientUserIds = users
        .filter(user => user.role === selectedRole)
        .map(user => user.id);
    } else if (selectedReceiverType === 'individual' && selectedUserId) {
      recipientUserIds = [selectedUserId];
    }

    if (recipientUserIds.length === 0) {
      toast.error('No se han seleccionado destinatarios');
      return;
    }

    sendNotification.mutate({
      userIds: recipientUserIds,
      type: notificationType,
      title: notificationTitle,
      content: notificationContent,
      actionUrl: actionUrl || undefined
    });
  };

  const getNotificationTypeBadge = (type: NotificationType) => {
    switch (type) {
      case 'message':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Mensaje</Badge>;
      case 'course_completed':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Curso</Badge>;
      case 'announcement':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Anuncio</Badge>;
      case 'achievement':
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Logro</Badge>;
      case 'community':
        return <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">Comunidad</Badge>;
      case 'system':
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Sistema</Badge>;
    }
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-4 w-4" />;
      case 'course_completed':
        return <Trophy className="h-4 w-4" />;
      case 'announcement':
        return <Megaphone className="h-4 w-4" />;
      case 'achievement':
        return <Sparkles className="h-4 w-4" />;
      case 'community':
        return <Users className="h-4 w-4" />;
      case 'system':
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const filteredNotifications = notifications.filter(notification => 
    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (notification.content && notification.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AdminPageLayout
      title="Gestión de Notificaciones"
      subtitle="Administra notificaciones para usuarios, instructores y grupos"
    >
      <Tabs defaultValue="notifications">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar notificaciones..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Nueva Notificación
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Enviar nueva notificación</DialogTitle>
                  <DialogDescription>
                    Crea y envía notificaciones a usuarios específicos o grupos.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="notification-type">Tipo de notificación</Label>
                    <Select 
                      value={notificationType} 
                      onValueChange={(value) => setNotificationType(value as NotificationType)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="announcement">
                          <div className="flex items-center gap-2">
                            <Megaphone className="h-4 w-4 text-purple-500" />
                            <span>Anuncio</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="course_completed">
                          <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-amber-500" />
                            <span>Curso</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="achievement">
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-emerald-500" />
                            <span>Logro</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="message">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-blue-500" />
                            <span>Mensaje</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="community">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-indigo-500" />
                            <span>Comunidad</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="system">
                          <div className="flex items-center gap-2">
                            <Bell className="h-4 w-4 text-gray-500" />
                            <span>Sistema</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="title">Título <span className="text-red-500">*</span></Label>
                    <Input 
                      id="title" 
                      value={notificationTitle}
                      onChange={(e) => setNotificationTitle(e.target.value)}
                      placeholder="Título de la notificación"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="content">Contenido</Label>
                    <Textarea 
                      id="content" 
                      value={notificationContent}
                      onChange={(e) => setNotificationContent(e.target.value)}
                      placeholder="Contenido de la notificación"
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="action-url">URL de acción (opcional)</Label>
                    <Input 
                      id="action-url" 
                      value={actionUrl}
                      onChange={(e) => setActionUrl(e.target.value)}
                      placeholder="Ej: /courses/123"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="recipient-type">Destinatarios</Label>
                    <Select 
                      value={selectedReceiverType} 
                      onValueChange={(value) => setSelectedReceiverType(value as 'all' | 'role' | 'individual')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona destinatarios" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los usuarios</SelectItem>
                        <SelectItem value="role">Por rol</SelectItem>
                        <SelectItem value="individual">Usuario individual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedReceiverType === 'role' && (
                    <div className="grid gap-2">
                      <Label htmlFor="role">Rol</Label>
                      <Select 
                        value={selectedRole} 
                        onValueChange={setSelectedRole}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un rol" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Estudiante</SelectItem>
                          <SelectItem value="instructor">Instructor</SelectItem>
                          <SelectItem value="admin">Administrador</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {selectedReceiverType === 'individual' && (
                    <div className="grid gap-2">
                      <Label htmlFor="user">Usuario</Label>
                      <Select 
                        value={selectedUserId} 
                        onValueChange={setSelectedUserId}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un usuario" />
                        </SelectTrigger>
                        <SelectContent>
                          {users.map(user => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.full_name} ({user.email})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowSendDialog(false)}>
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleSendNotification} 
                    className="gap-2"
                    disabled={sendNotification.isPending || !notificationTitle}
                  >
                    {sendNotification.isPending ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Enviar Notificación
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <TabsContent value="notifications" className="mt-0">
          <Card>
            <CardContent className="p-0">
              {isLoadingNotifications ? (
                <div className="flex justify-center items-center p-8">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <Bell className="h-12 w-12 mb-3 text-muted-foreground/30" />
                  {searchTerm ? (
                    <>
                      <h3 className="text-lg font-medium mb-1">No hay notificaciones que coincidan</h3>
                      <p className="text-muted-foreground">
                        Intenta con otros términos de búsqueda
                      </p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => setSearchTerm('')}
                      >
                        Mostrar todas las notificaciones
                      </Button>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-medium mb-1">No hay notificaciones</h3>
                      <p className="text-muted-foreground">
                        No se han creado notificaciones en el sistema
                      </p>
                      <Button 
                        className="mt-4 gap-2"
                        onClick={() => setShowSendDialog(true)}
                      >
                        <PlusCircle className="h-4 w-4" />
                        Crear primera notificación
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Tipo</TableHead>
                        <TableHead>Título</TableHead>
                        <TableHead>Contenido</TableHead>
                        <TableHead>Destinatario</TableHead>
                        <TableHead className="w-[100px]">Estado</TableHead>
                        <TableHead className="w-[150px]">Fecha</TableHead>
                        <TableHead className="w-[100px]">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredNotifications.map((notification) => (
                        <TableRow key={notification.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getNotificationIcon(notification.type as NotificationType)}
                              {getNotificationTypeBadge(notification.type as NotificationType)}
                            </div>
                          </TableCell>
                          <TableCell>{notification.title}</TableCell>
                          <TableCell className="max-w-[200px] truncate">
                            {notification.content || '-'}
                          </TableCell>
                          <TableCell>
                            {notification.user_id ? 
                              users.find(u => u.id === notification.user_id)?.full_name || notification.user_id.slice(0, 8) 
                              : 'Todos'}
                          </TableCell>
                          <TableCell>
                            {notification.is_read ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700">Leída</Badge>
                            ) : (
                              <Badge variant="outline" className="bg-amber-50 text-amber-700">No leída</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {format(new Date(notification.created_at), 'dd MMM yyyy, HH:mm', { locale: es })}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteNotification.mutate(notification.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Notificaciones</CardTitle>
                <CardDescription>
                  Configura cómo se muestran y envían las notificaciones en la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="notification-expiry">Caducidad de notificaciones (días)</Label>
                    <Input 
                      id="notification-expiry" 
                      type="number" 
                      defaultValue="30" 
                      min="1" 
                      max="365"
                    />
                    <p className="text-sm text-muted-foreground">
                      Número de días que permanecen las notificaciones antes de caducar
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="max-notifications">Máximo de notificaciones por usuario</Label>
                    <Input 
                      id="max-notifications" 
                      type="number" 
                      defaultValue="100" 
                      min="10" 
                      max="1000"
                    />
                    <p className="text-sm text-muted-foreground">
                      Limitar el número de notificaciones almacenadas por usuario
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between flex-wrap gap-3">
                <Button variant="outline">Restaurar valores por defecto</Button>
                <Button>Guardar configuración</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plantillas de Notificación</CardTitle>
                <CardDescription>
                  Gestiona plantillas para envíos automáticos de notificaciones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[200px]">Nombre</TableHead>
                          <TableHead>Descripción</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Bienvenida</TableCell>
                          <TableCell>Mensaje de bienvenida para nuevos usuarios</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">Editar</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Curso completado</TableCell>
                          <TableCell>Notificación cuando un usuario completa un curso</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">Editar</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Nuevo mensaje</TableCell>
                          <TableCell>Notificación de nuevos mensajes recibidos</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">Editar</Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Añadir plantilla
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </AdminPageLayout>
  );
};

export default NotificationManagement;

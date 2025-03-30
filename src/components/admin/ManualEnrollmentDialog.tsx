
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { UserProfile } from "@/types/auth";
import { Search, Loader2 } from "lucide-react";

interface ManualEnrollmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId?: string;
  courseName?: string;
  onEnrollmentComplete?: () => void;
}

const ManualEnrollmentDialog: React.FC<ManualEnrollmentDialogProps> = ({
  open,
  onOpenChange,
  courseId,
  courseName,
  onEnrollmentComplete
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      loadUsers();
    } else {
      setSearchTerm("");
      setSelectedUserId("");
    }
  }, [open]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setUsers(data || []);
      setFilteredUsers(data || []);
    } catch (error) {
      console.error('Error loading users:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar los usuarios",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnrollUser = async () => {
    if (!selectedUserId || !courseId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Selecciona un usuario para matricular",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Verificar si ya está matriculado
      const { data: existingEnrollment, error: checkError } = await supabase
        .from('enrollments')
        .select('id')
        .eq('user_id', selectedUserId)
        .eq('course_id', courseId)
        .single();

      if (existingEnrollment) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "El usuario ya está matriculado en este curso",
        });
        return;
      }

      // Realizar la matrícula
      const { error } = await supabase
        .from('enrollments')
        .insert({
          user_id: selectedUserId,
          course_id: courseId,
          enrolled_at: new Date().toISOString(),
          status: 'active'
        });

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Usuario matriculado correctamente",
      });
      
      onOpenChange(false);
      if (onEnrollmentComplete) {
        onEnrollmentComplete();
      }
    } catch (error) {
      console.error('Error enrolling user:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo matricular al usuario",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Matricular Usuario Manualmente</DialogTitle>
          <DialogDescription>
            {courseName 
              ? `Selecciona un usuario para matricularlo en ${courseName}` 
              : "Selecciona un usuario para matricularlo en el curso"}
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="search-user">Buscar usuario</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search-user"
                type="text"
                placeholder="Buscar por nombre..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-select">Seleccionar usuario</Label>
            {isLoading ? (
              <div className="flex justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : (
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger id="user-select">
                  <SelectValue placeholder="Selecciona un usuario" />
                </SelectTrigger>
                <SelectContent>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.full_name || 'Usuario sin nombre'}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="text-center p-2 text-muted-foreground">
                      No se encontraron usuarios
                    </div>
                  )}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button 
            type="button" 
            onClick={handleEnrollUser}
            disabled={!selectedUserId || isSubmitting}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Matricular
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManualEnrollmentDialog;


import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Loader2, UserPlus } from "lucide-react";
import { useUserSearch } from "@/hooks/useUserSearch";
import UserSearchResults from "./UserSearchResults";
import SelectedUser from "./SelectedUser";

interface ManualEnrollmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: string;
  courseName: string;
  onEnrollmentComplete?: () => void;
}

const ManualEnrollmentDialog: React.FC<ManualEnrollmentDialogProps> = ({
  open,
  onOpenChange,
  courseId,
  courseName,
  onEnrollmentComplete
}) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  
  const { 
    searchTerm, 
    setSearchTerm, 
    searchResults, 
    isSearching, 
    noResults, 
    searchError,
    setSearchResults
  } = useUserSearch();

  // Manejar la selección de usuario
  const handleSelectUser = (userId: string, userName: string | null) => {
    setSelectedUserId(userId);
    setSelectedUserName(userName || 'Usuario seleccionado');
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleEnroll = async () => {
    if (!selectedUserId) {
      toast.error("Por favor, selecciona un usuario para matricular");
      return;
    }
    
    try {
      setIsEnrolling(true);
      
      // Verificar si el usuario ya está matriculado - CORREGIDO SIN .single()
      const { data: existingEnrollments, error: checkError } = await supabase
        .from('enrollments')
        .select('id')
        .eq('user_id', selectedUserId)
        .eq('course_id', courseId);
      
      // Error general en la consulta (no relacionado con registros no encontrados)
      if (checkError) {
        throw checkError;
      }
      
      // Verificar si existe alguna matrícula (data tendrá longitud > 0)
      if (existingEnrollments && existingEnrollments.length > 0) {
        toast.info("El usuario ya está matriculado en este curso");
        onOpenChange(false);
        return;
      }
      
      // Crear la matrícula
      const { error: enrollmentError } = await supabase
        .from('enrollments')
        .insert([
          { 
            user_id: selectedUserId, 
            course_id: courseId 
          }
        ]);
      
      if (enrollmentError) throw enrollmentError;
      
      toast.success("Usuario matriculado exitosamente");
      
      // Llamar al callback si existe
      if (onEnrollmentComplete) {
        onEnrollmentComplete();
      }
      
      // Cerrar el diálogo
      onOpenChange(false);
      
    } catch (error: any) {
      console.error('Error matriculando usuario:', error);
      toast.error("Error al matricular usuario: " + error.message);
    } finally {
      setIsEnrolling(false);
    }
  };

  // Limpiar estados al cerrar el diálogo
  useEffect(() => {
    if (!open) {
      setSearchTerm("");
      setSelectedUserId(null);
      setSelectedUserName(null);
      setSearchResults([]);
    }
  }, [open, setSearchTerm, setSearchResults]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Matricular Usuario</DialogTitle>
          <DialogDescription>
            Matricula manualmente un usuario en el curso: <span className="font-medium">{courseName}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {selectedUserId ? (
            <SelectedUser 
              userName={selectedUserName} 
              onClearSelection={() => {
                setSelectedUserId(null);
                setSelectedUserName(null);
              }}
            />
          ) : (
            <UserSearchResults
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchResults={searchResults}
              isSearching={isSearching}
              noResults={noResults}
              searchError={searchError}
              handleSelectUser={handleSelectUser}
            />
          )}
        </div>
        
        <DialogFooter>
          <Button 
            onClick={() => onOpenChange(false)} 
            variant="outline"
            disabled={isEnrolling}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleEnroll} 
            disabled={!selectedUserId || isEnrolling}
          >
            {isEnrolling ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Matriculando...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Matricular
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManualEnrollmentDialog;

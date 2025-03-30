
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Loader2, SearchIcon, UserPlus } from "lucide-react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    try {
      setIsSearching(true);
      
      // Buscar usuarios que coincidan con el término de búsqueda
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, role')
        .ilike('full_name', `%${searchTerm}%`)
        .limit(10);
      
      if (error) throw error;
      
      setSearchResults(data || []);
    } catch (error: any) {
      console.error('Error buscando usuarios:', error);
      toast.error("Error al buscar usuarios: " + error.message);
    } finally {
      setIsSearching(false);
    }
  };

  const handleEnroll = async () => {
    if (!selectedUserId) {
      toast.error("Por favor, selecciona un usuario para matricular");
      return;
    }
    
    try {
      setIsEnrolling(true);
      
      // Verificar si el usuario ya está matriculado
      const { data: existingEnrollment, error: checkError } = await supabase
        .from('enrollments')
        .select('id')
        .eq('user_id', selectedUserId)
        .eq('course_id', courseId)
        .single();
      
      if (checkError && !checkError.message.includes('No rows found')) {
        throw checkError;
      }
      
      if (existingEnrollment) {
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
      
      // Actualizar el contador de estudiantes del curso
      const { error: updateError } = await supabase
        .from('courses')
        .update({ 
          students_count: supabase.rpc('calculate_course_students_count', { course_id_param: courseId }) 
        })
        .eq('id', courseId);
      
      if (updateError) {
        console.error('Error actualizando contador de estudiantes:', updateError);
        // No mostramos error al usuario, simplemente lo registramos
      }
      
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

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
          <div className="space-y-2">
            <Label htmlFor="search">Buscar usuario por nombre</Label>
            <div className="flex space-x-2">
              <Input
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nombre del usuario"
                onKeyDown={handleKeyDown}
                disabled={isSearching}
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleSearch}
                disabled={isSearching || !searchTerm.trim()}
              >
                {isSearching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <SearchIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          {searchResults.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="user">Seleccionar usuario</Label>
              <Select 
                value={selectedUserId || undefined} 
                onValueChange={setSelectedUserId}
              >
                <SelectTrigger id="user">
                  <SelectValue placeholder="Selecciona un usuario" />
                </SelectTrigger>
                <SelectContent>
                  {searchResults.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.full_name} ({user.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {searchResults.length === 0 && searchTerm && !isSearching && (
            <div className="text-center p-4 text-sm text-gray-500">
              No se encontraron usuarios con ese nombre
            </div>
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

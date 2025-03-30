
import React, { useState, useEffect, useCallback } from 'react';
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
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Loader2, SearchIcon, UserPlus, UserCircle } from "lucide-react";
import debounce from 'lodash.debounce';
import { UserProfile } from "@/types/auth";

interface ManualEnrollmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: string;
  courseName: string;
  onEnrollmentComplete?: () => void;
}

interface Profile {
  id: string;
  full_name: string | null;
  role: string;
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
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Función de búsqueda de usuarios
  const searchUsers = async (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      setNoResults(false);
      setSearchError(null);
      return;
    }
    
    try {
      setIsSearching(true);
      setSearchError(null);
      
      // Buscar usuarios que coincidan con el término de búsqueda
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, role')
        .ilike('full_name', `%${term}%`)
        .limit(10);
      
      if (error) throw error;
      
      setSearchResults(data || []);
      setNoResults(data?.length === 0);
    } catch (error: any) {
      console.error('Error buscando usuarios:', error);
      setSearchError(`Error al buscar usuarios: ${error.message}`);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounce para evitar demasiadas peticiones mientras se escribe
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      searchUsers(term);
    }, 300),
    []
  );

  // Efecto para manejar el cambio en el término de búsqueda
  useEffect(() => {
    debouncedSearch(searchTerm);
    
    // Limpiar el debounce al desmontar
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

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

  // Limpiar estados al cerrar el diálogo
  useEffect(() => {
    if (!open) {
      setSearchTerm("");
      setSelectedUserId(null);
      setSelectedUserName(null);
      setSearchResults([]);
      setNoResults(false);
      setSearchError(null);
    }
  }, [open]);

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
            <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-md border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCircle className="h-5 w-5 text-primary" />
                  <span className="font-medium">{selectedUserName}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setSelectedUserId(null);
                    setSelectedUserName(null);
                  }}
                >
                  Cambiar
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="search">Buscar usuario por nombre</Label>
              <div className="relative">
                <Input
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nombre del usuario"
                  className="pr-10"
                  disabled={isSearching}
                  autoComplete="off"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {isSearching ? (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  ) : (
                    <SearchIcon className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
              
              {/* Resultados de búsqueda */}
              {searchResults.length > 0 && (
                <div className="mt-2 border rounded-md overflow-hidden max-h-[200px] overflow-y-auto">
                  <ul className="divide-y">
                    {searchResults.map((user) => (
                      <li 
                        key={user.id} 
                        className="px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                        onClick={() => handleSelectUser(user.id, user.full_name)}
                      >
                        <div className="flex justify-between items-center">
                          <span>{user.full_name || 'Sin nombre'}</span>
                          <span className="text-xs text-muted-foreground bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                            {user.role}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Mensaje de no resultados */}
              {noResults && searchTerm && !isSearching && (
                <div className="text-center p-3 text-sm text-muted-foreground bg-slate-50 dark:bg-slate-800 rounded-md">
                  No se encontraron usuarios con ese nombre
                </div>
              )}
              
              {/* Mensaje de error */}
              {searchError && (
                <div className="text-center p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-md">
                  {searchError}
                </div>
              )}
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


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Module } from "@/types/course";
import { LessonsList } from "./LessonsList";

interface ModulesListProps {
  modules: Module[];
  courseId: string;
  onCreateModule: (title: string) => void;
  onUpdateModule: (moduleId: string, title: string) => void;
  onDeleteModule: (moduleId: string) => void;
  expandedModules: string[];
  onToggleModuleExpansion: (moduleId: string) => void;
}

export const ModulesList: React.FC<ModulesListProps> = ({
  modules,
  courseId,
  onCreateModule,
  onUpdateModule,
  onDeleteModule,
  expandedModules,
  onToggleModuleExpansion,
}) => {
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [editModuleId, setEditModuleId] = useState<string | null>(null);
  const [editModuleTitle, setEditModuleTitle] = useState("");

  const handleCreateModule = () => {
    if (!newModuleTitle.trim()) return;
    onCreateModule(newModuleTitle);
    setNewModuleTitle("");
  };

  const handleUpdateModule = () => {
    if (!editModuleTitle.trim() || !editModuleId) return;
    onUpdateModule(editModuleId, editModuleTitle);
    setEditModuleId(null);
    setEditModuleTitle("");
  };

  if (modules.length === 0) {
    return (
      <div className="p-4 bg-muted rounded-md text-center">
        <p>No hay módulos en este curso todavía. Añade tu primer módulo.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Añadir Nuevo Módulo</h3>
        <div className="flex items-center gap-2">
          <Input
            value={newModuleTitle}
            onChange={(e) => setNewModuleTitle(e.target.value)}
            placeholder="Título del nuevo módulo"
            className="flex-1"
          />
          <Button onClick={handleCreateModule}>
            Añadir
          </Button>
        </div>
      </div>

      <Accordion type="multiple" value={expandedModules} className="border rounded-md">
        {modules.map((module) => (
          <AccordionItem key={module.id} value={module.id} className="border-b">
            <AccordionTrigger
              onClick={() => onToggleModuleExpansion(module.id)}
              className="px-4 hover:no-underline"
            >
              <div className="flex items-center justify-between w-full">
                <span>{module.title}</span>
                <div className="flex items-center gap-1 mr-4">
                  <Dialog>
                    <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Módulo</DialogTitle>
                        <DialogDescription>
                          Actualiza el título del módulo
                        </DialogDescription>
                      </DialogHeader>
                      <Input
                        value={editModuleId === module.id ? editModuleTitle : module.title}
                        onChange={(e) => {
                          setEditModuleId(module.id);
                          setEditModuleTitle(e.target.value);
                        }}
                        placeholder="Título del módulo"
                        className="my-4"
                      />
                      <DialogFooter>
                        <Button onClick={handleUpdateModule}>
                          Guardar Cambios
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción eliminará el módulo y todas sus lecciones. Esta acción no puede deshacerse.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => onDeleteModule(module.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <LessonsList 
                moduleId={module.id}
                courseId={courseId}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

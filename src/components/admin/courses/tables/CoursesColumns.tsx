
import React from "react";
import { BookOpen, Calendar, Edit, Eye, Trash, Users } from "lucide-react";
import { createColumn, createActionsColumn } from "@/components/shared/DataTableUtils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Course } from "@/features/admin/hooks/useCoursesManagement";

export const createCoursesColumns = (
  handleEditCourse: (course: Course) => void,
  handleViewCourse: (course: Course) => void,
  handleDeleteClick: (course: Course) => void,
) => [
  createColumn<Course>({
    accessorKey: 'title',
    header: 'Título',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-primary" />
        <span className="font-medium">{row.getValue('title')}</span>
      </div>
    )
  }),
  createColumn<Course>({
    accessorKey: 'is_published',
    header: 'Estado',
    cell: ({ getValue }) => (
      getValue() ? 
        <Badge className="bg-green-500">Publicado</Badge> : 
        <Badge variant="outline">Borrador</Badge>
    )
  }),
  createColumn<Course>({
    accessorKey: 'price',
    header: 'Precio',
    cell: ({ getValue }) => `€${(getValue() as number).toFixed(2)}`
  }),
  createColumn<Course>({
    accessorKey: 'student_count',
    header: 'Estudiantes',
    cell: ({ getValue }) => (
      <div className="flex items-center gap-1">
        <Users className="h-4 w-4 text-muted-foreground" />
        <span>{getValue() as number || 0}</span>
      </div>
    )
  }),
  createColumn<Course>({
    accessorKey: 'created_at',
    header: 'Creado',
    cell: ({ getValue }) => (
      <div className="flex items-center gap-1 text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>{format(new Date(getValue() as string), 'dd/MM/yyyy')}</span>
      </div>
    )
  }),
  createActionsColumn<Course>(({ row }) => {
    const course = row.original;
    return (
      <div className="flex justify-end gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            handleEditCourse(course);
          }}
        >
          <Edit className="h-4 w-4" />
          <span className="sr-only">Editar</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            handleViewCourse(course);
          }}
        >
          <Eye className="h-4 w-4" />
          <span className="sr-only">Ver</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="text-destructive hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteClick(course);
          }}
        >
          <Trash className="h-4 w-4" />
          <span className="sr-only">Eliminar</span>
        </Button>
      </div>
    );
  })
];

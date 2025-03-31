
import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { EntityDrawer } from "@/components/shared/EntityDrawer";
import { AdvancedDataTable } from "@/components/shared/AdvancedDataTable";
import { Course, useCoursesManagement } from "@/features/admin/hooks/useCoursesManagement";
import CourseForm from "../CourseForm";
import { createCoursesColumns } from "../tables/CoursesColumns";

const AllCoursesTab: React.FC = () => {
  const navigate = useNavigate();
  const {
    courses,
    loading,
    deleteDialogOpen,
    courseToDelete,
    editorOpen,
    selectedCourse,
    setEditorOpen,
    handleDeleteClick,
    confirmDelete,
    handleEditCourse,
    handleSaveCourse,
    handleViewCourse,
    setDeleteDialogOpen
  } = useCoursesManagement();

  const columns = createCoursesColumns(
    handleEditCourse,
    handleViewCourse,
    handleDeleteClick
  );

  const emptyStateComponent: ReactNode = (
    <div className="flex flex-col items-center justify-center text-muted-foreground py-8">
      <BookOpen className="h-8 w-8 mb-2" />
      <p className="mb-2">No hay cursos disponibles</p>
      <Button 
        variant="link" 
        onClick={() => navigate('/instructor/create-course')}
      >
        Crear primer curso
      </Button>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <Button onClick={() => navigate("/instructor/create-course")} className="gap-2">
          <Plus className="h-4 w-4" />
          Crear Curso
        </Button>
      </div>
      
      <Card className="p-4">
        <AdvancedDataTable
          columns={columns}
          data={courses}
          searchPlaceholder="Buscar por título, estado o nivel..."
          exportFilename="cursos"
          emptyState={emptyStateComponent}
          onRowClick={(course) => handleEditCourse(course as Course)}
        />
      </Card>

      <EntityDrawer<Course>
        title="Editar Curso"
        description="Modifica los detalles del curso"
        isOpen={editorOpen}
        onOpenChange={setEditorOpen}
        onSave={handleSaveCourse}
        entity={selectedCourse}
      >
        {(props: { data: Course | null; onChange: (data: Course) => void }) => (
          <CourseForm data={props.data} onChange={props.onChange} />
        )}
      </EntityDrawer>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar curso?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El curso 
              <span className="font-semibold mx-1">
                {courseToDelete?.title}
              </span> 
              será eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AllCoursesTab;

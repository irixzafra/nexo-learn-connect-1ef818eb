
import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
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
import { Course, useCoursesManagement } from "@/features/admin/hooks/useCoursesManagement";
import CourseForm from "../CourseForm";

const AllCoursesTab: React.FC = () => {
  const navigate = useNavigate();
  const {
    courses,
    deleteDialogOpen,
    courseToDelete,
    editorOpen,
    selectedCourse,
    setEditorOpen,
    handleDeleteClick,
    confirmDelete,
    handleEditCourse,
    handleSaveCourse,
    setDeleteDialogOpen
  } = useCoursesManagement();

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <Button onClick={() => navigate("/instructor/create-course")} className="gap-2">
          <Plus className="h-4 w-4" />
          Crear Curso
        </Button>
      </div>
      
      <Card className="p-4">
        <div className="text-center py-6">
          {courses.length === 0 ? (
            <p className="text-muted-foreground">No hay cursos disponibles</p>
          ) : (
            <ul className="space-y-2">
              {courses.map((course) => (
                <li 
                  key={course.id} 
                  className="flex justify-between items-center border p-3 rounded-md cursor-pointer hover:bg-muted"
                  onClick={() => handleEditCourse(course)}
                >
                  <div>
                    <h3 className="font-medium">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {course.is_published ? "Publicado" : "Borrador"} - {course.level || "Sin nivel"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditCourse(course);
                      }}
                    >
                      Editar
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(course);
                      }}
                    >
                      Eliminar
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>

      <EntityDrawer<Course>
        title="Editar Curso"
        description="Modifica los detalles del curso"
        isOpen={editorOpen}
        onOpenChange={setEditorOpen}
        onSave={handleSaveCourse}
        entity={selectedCourse}
      >
        {({data, onChange}) => (
          <CourseForm data={data} onChange={onChange} />
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

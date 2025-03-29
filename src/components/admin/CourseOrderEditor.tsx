
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useEditMode } from '@/contexts/EditModeContext';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';
import { ArrowUp, ArrowDown, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CourseData {
  id: string;
  title: string;
  display_order: number;
  category: string;
}

const CourseOrderEditor: React.FC = () => {
  const { isEditMode } = useEditMode();
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('courses')
      .select('id, title, display_order, category')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching courses:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los cursos',
        variant: 'destructive',
      });
    } else {
      const coursesWithOrder = data.map((course, index) => ({
        ...course,
        display_order: course.display_order || index,
      }));
      setCourses(coursesWithOrder);
      
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(coursesWithOrder.map(course => course.category)));
      setCategories(uniqueCategories);
      if (uniqueCategories.length > 0 && !selectedCategory) {
        setSelectedCategory(uniqueCategories[0]);
      }
    }
    setIsLoading(false);
  };

  const updateCourseOrder = async (updatedCourses: CourseData[]) => {
    for (const course of updatedCourses) {
      const { error } = await supabase
        .from('courses')
        .update({ display_order: course.display_order })
        .eq('id', course.id);

      if (error) {
        console.error('Error updating course order:', error);
        toast({
          title: 'Error',
          description: 'No se pudo actualizar el orden de los cursos',
          variant: 'destructive',
        });
        return false;
      }
    }
    
    toast({
      title: 'Éxito',
      description: 'Orden de cursos actualizado',
    });
    return true;
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const filteredCourses = courses.filter(
      course => course.category === selectedCategory
    );
    
    const items = Array.from(filteredCourses);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update display_order for the reordered items
    const updatedItems = items.map((item, index) => ({
      ...item,
      display_order: index,
    }));

    // Merge back with other categories
    const otherCourses = courses.filter(
      course => course.category !== selectedCategory
    );
    
    const newCourses = [...otherCourses, ...updatedItems];
    setCourses(newCourses);
    
    updateCourseOrder(updatedItems);
  };

  const moveCourse = async (courseId: string, direction: 'up' | 'down') => {
    const filteredCourses = courses
      .filter(course => course.category === selectedCategory)
      .sort((a, b) => a.display_order - b.display_order);
    
    const courseIndex = filteredCourses.findIndex(course => course.id === courseId);
    if (courseIndex === -1) return;
    
    const newIndex = direction === 'up' 
      ? Math.max(0, courseIndex - 1)
      : Math.min(filteredCourses.length - 1, courseIndex + 1);
    
    if (newIndex === courseIndex) return;
    
    const newCourses = [...filteredCourses];
    const temp = newCourses[courseIndex].display_order;
    newCourses[courseIndex].display_order = newCourses[newIndex].display_order;
    newCourses[newIndex].display_order = temp;
    
    // Swap positions
    [newCourses[courseIndex], newCourses[newIndex]] = [newCourses[newIndex], newCourses[courseIndex]];
    
    // Merge with other categories
    const otherCourses = courses.filter(course => course.category !== selectedCategory);
    setCourses([...otherCourses, ...newCourses]);
    
    await updateCourseOrder(newCourses);
  };

  if (!isEditMode) return null;

  if (isLoading) {
    return <div className="text-center p-4">Cargando cursos...</div>;
  }

  const filteredCourses = courses
    .filter(course => course.category === selectedCategory)
    .sort((a, b) => a.display_order - b.display_order);

  return (
    <div className="bg-card border rounded-lg p-4 mb-8">
      <h2 className="text-xl font-bold mb-4">Ordenar Cursos</h2>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="courses">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {filteredCourses.map((course, index) => (
                <Draggable key={course.id} draggableId={course.id} index={index}>
                  {(provided) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="border border-border"
                    >
                      <CardContent className="p-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <div {...provided.dragHandleProps} className="mr-2 cursor-grab">
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <span className="font-medium">{course.title}</span>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveCourse(course.id, 'up')}
                            disabled={index === 0}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveCourse(course.id, 'down')}
                            disabled={index === filteredCourses.length - 1}
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default CourseOrderEditor;

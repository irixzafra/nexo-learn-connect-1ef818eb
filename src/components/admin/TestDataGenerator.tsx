
import React, { useState } from 'react';
import { useTestData, TestDataType } from '@/contexts/TestDataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trash2, Database, PlusCircle, Download } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const dataTypeLabels: Record<TestDataType, string> = {
  course: 'Cursos',
  user: 'Usuarios',
  lesson: 'Lecciones',
  message: 'Mensajes'
};

const TestDataGenerator: React.FC = () => {
  const { testData, generateTestData, clearTestData, isGenerating } = useTestData();
  const [selectedType, setSelectedType] = useState<TestDataType>('course');
  const [count, setCount] = useState<number>(5);
  const { user } = useAuth();
  const [isImporting, setIsImporting] = useState(false);

  const handleGenerate = () => {
    if (count > 0 && count <= 100) {
      generateTestData(selectedType, count);
    }
  };

  // Function to import test data to Supabase
  const importToSupabase = async (type: TestDataType) => {
    if (!user) {
      toast.error('Debes iniciar sesión para importar datos');
      return;
    }

    setIsImporting(true);
    try {
      const items = testData[type];
      if (items.length === 0) {
        toast.error(`No hay datos de ${dataTypeLabels[type].toLowerCase()} para importar`);
        return;
      }

      // Process based on data type
      switch (type) {
        case 'user':
          await importUsers(items);
          break;
        case 'course':
          await importCourses(items, user.id);
          break;
        case 'lesson':
          await importLessons(items, user.id);
          break;
        case 'message':
          toast.info('Importación de mensajes no implementada aún');
          break;
      }

      toast.success(`${items.length} ${dataTypeLabels[type].toLowerCase()} importados correctamente`);
    } catch (error) {
      console.error('Error importing data:', error);
      toast.error(`Error al importar ${dataTypeLabels[type].toLowerCase()}: ${error.message}`);
    } finally {
      setIsImporting(false);
    }
  };

  // Import users to Supabase
  const importUsers = async (items) => {
    for (const item of items) {
      const userData = item.data;
      
      // Create auth user (This would typically be done through auth API or admin functions)
      // For demo, we'll just create profiles
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: item.id,
          full_name: userData.fullName,
          role: userData.role,
          created_at: new Date(item.createdAt).toISOString()
        });
      
      if (error) throw error;
    }
  };

  // Import courses to Supabase
  const importCourses = async (items, instructorId) => {
    for (const item of items) {
      const courseData = item.data;
      
      const { data: course, error } = await supabase
        .from('courses')
        .insert({
          id: item.id,
          title: courseData.title,
          description: courseData.description,
          price: courseData.price,
          instructor_id: instructorId,
          currency: 'eur',
          is_published: courseData.published,
          cover_image_url: courseData.coverImage,
          level: courseData.level,
          duration_text: `${courseData.duration} horas`,
          created_at: new Date(item.createdAt).toISOString()
        })
        .select()
        .single();
      
      if (error) throw error;
    }
  };

  // Import lessons to Supabase
  const importLessons = async (items, instructorId) => {
    // First, get available courses or create a default one if none exists
    let courseId;
    const { data: courses } = await supabase
      .from('courses')
      .select('id')
      .limit(1);

    if (!courses || courses.length === 0) {
      // Create a default course
      const { data: newCourse, error } = await supabase
        .from('courses')
        .insert({
          title: 'Curso por defecto',
          description: 'Curso creado automáticamente para las lecciones de prueba',
          price: 0,
          instructor_id: instructorId,
          currency: 'eur',
          is_published: true
        })
        .select()
        .single();
      
      if (error) throw error;
      courseId = newCourse.id;
    } else {
      courseId = courses[0].id;
    }

    // Create a module
    const { data: module, error: moduleError } = await supabase
      .from('modules')
      .insert({
        course_id: courseId,
        title: 'Módulo de prueba',
        module_order: 1
      })
      .select()
      .single();
    
    if (moduleError) throw moduleError;

    // Create lessons
    for (const item of items) {
      const lessonData = item.data;
      
      const { error } = await supabase
        .from('lessons')
        .insert({
          id: item.id,
          module_id: module.id,
          course_id: courseId,
          title: lessonData.title,
          content_type: lessonData.videoUrl ? 'video' : 'text',
          content_text: lessonData.content ? JSON.stringify({ content: lessonData.content }) : null,
          content_video_url: lessonData.videoUrl || null,
          lesson_order: lessonData.order,
          is_previewable: lessonData.completed
        });
      
      if (error) throw error;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Generador de Datos de Prueba
        </CardTitle>
        <CardDescription>
          Genera datos de prueba para la aplicación o elimina los existentes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="dataType">Tipo de datos</Label>
              <Select 
                value={selectedType} 
                onValueChange={(value) => setSelectedType(value as TestDataType)}
              >
                <SelectTrigger id="dataType">
                  <SelectValue placeholder="Selecciona un tipo de datos" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(dataTypeLabels).map(([type, label]) => (
                    <SelectItem key={type} value={type}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="count">Cantidad</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="count"
                  type="number"
                  min={1}
                  max={100}
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value) || 0)}
                />
                <Button 
                  onClick={handleGenerate} 
                  disabled={isGenerating || count <= 0 || count > 100}
                  className="flex items-center gap-1"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Generar</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Tabs defaultValue="course">
              <TabsList className="grid grid-cols-4">
                {Object.entries(dataTypeLabels).map(([type, label]) => (
                  <TabsTrigger key={type} value={type}>
                    {label} ({testData[type as TestDataType].length})
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(dataTypeLabels).map(([type, label]) => (
                <TabsContent key={type} value={type}>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Fecha creación</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {testData[type as TestDataType].length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center py-4">
                              No hay datos de prueba para {label.toLowerCase()}
                            </TableCell>
                          </TableRow>
                        ) : (
                          testData[type as TestDataType].map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">{item.name}</TableCell>
                              <TableCell>
                                {new Date(item.createdAt).toLocaleString()}
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    // Aquí se implementaría la eliminación individual
                                    // pero usamos clearTestData para simplificar
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {testData[type as TestDataType].length > 0 && (
                    <div className="mt-4 flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => importToSupabase(type as TestDataType)}
                        disabled={isImporting}
                        className="flex items-center gap-1"
                      >
                        <Download className="h-4 w-4" />
                        <span>Importar a Supabase</span>
                      </Button>
                      
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => clearTestData(type as TestDataType)}
                        className="flex items-center gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Eliminar todos</span>
                      </Button>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button 
          variant="outline" 
          onClick={() => clearTestData()}
          disabled={
            Object.values(testData).every(items => items.length === 0)
          }
        >
          Eliminar todos los datos
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TestDataGenerator;

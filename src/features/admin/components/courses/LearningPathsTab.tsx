import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, Pencil, Trash2, ImagePlus, Upload, Download } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from '@/contexts/AuthContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { useCourses } from '@/hooks/useCourses';
import { Course } from '@/types/course';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  cover_image_url: string;
  is_published: boolean;
  created_at: string;
  created_by: string;
  estimatedHours: number | null;
}

export const LearningPathsTab: React.FC = () => {
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [isCreatingPath, setIsCreatingPath] = useState(false);
  const [isEditingPath, setIsEditingPath] = useState(false);
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const { toast } = useToast();
  const { courses } = useCourses();
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchPaths();
  }, []);

  const fetchPaths = async () => {
    try {
      const { data, error } = await supabase
        .from('learning_paths')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching learning paths:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudieron cargar las rutas de aprendizaje.",
        });
        return;
      }

      setPaths(data as LearningPath[]);
    } catch (error) {
      console.error('Error in fetchPaths:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al obtener las rutas de aprendizaje.",
      });
    }
  };

  const createPath = async (data: Omit<LearningPath, "id" | "created_at">) => {
    try {
      setIsCreatingPath(true);
      
      const newPath = {
        title: data.title,
        description: data.description,
        cover_image_url: data.cover_image_url,
        is_published: false,
        created_by: user?.id,
        estimatedHours: data.estimatedHours || null  // Change to match schema - should be estimated_hours
      };

      const { data: createdPath, error } = await supabase
        .from('learning_paths')
        .insert([newPath])
        .select('*')
        .single();

      if (error) {
        console.error('Error creating learning path:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo crear la ruta de aprendizaje.",
        });
        return;
      }

      setPaths(prevPaths => [...prevPaths, createdPath as LearningPath]);
      toast({
        title: "Ruta creada",
        description: "La ruta de aprendizaje ha sido creada exitosamente.",
      });
    } catch (error) {
      console.error('Error in createPath:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al crear la ruta de aprendizaje.",
      });
    } finally {
      setIsCreatingPath(false);
    }
  };

  const updatePath = async (pathId: string, data: Partial<LearningPath>) => {
    try {
      setIsEditingPath(true);

      const { data: updatedPath, error } = await supabase
        .from('learning_paths')
        .update(data)
        .eq('id', pathId)
        .select('*')
        .single();

      if (error) {
        console.error('Error updating learning path:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo actualizar la ruta de aprendizaje.",
        });
        return;
      }

      setPaths(prevPaths =>
        prevPaths.map(path => (path.id === pathId ? updatedPath as LearningPath : path))
      );
      toast({
        title: "Ruta actualizada",
        description: "La ruta de aprendizaje ha sido actualizada exitosamente.",
      });
    } catch (error) {
      console.error('Error in updatePath:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al actualizar la ruta de aprendizaje.",
      });
    } finally {
      setIsEditingPath(false);
    }
  };

  const deletePath = async (pathId: string) => {
    try {
      const { error } = await supabase
        .from('learning_paths')
        .delete()
        .eq('id', pathId);

      if (error) {
        console.error('Error deleting learning path:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo eliminar la ruta de aprendizaje.",
        });
        return;
      }

      setPaths(prevPaths => prevPaths.filter(path => path.id !== pathId));
      toast({
        title: "Ruta eliminada",
        description: "La ruta de aprendizaje ha sido eliminada exitosamente.",
      });
    } catch (error) {
      console.error('Error in deletePath:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al eliminar la ruta de aprendizaje.",
      });
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      setCoverImageUrl(URL.createObjectURL(file));
    }
  };

  const uploadCoverImage = async () => {
    if (!coverImage) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor, selecciona una imagen de portada.",
      });
      return null;
    }

    try {
      const timestamp = new Date().getTime();
      const filePath = `learning_paths/${user?.id}/${timestamp}-${coverImage.name}`;

      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, coverImage, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error("Error uploading image: ", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo subir la imagen de portada.",
        });
        return null;
      }

      const publicUrl = `https://yydtceuhpvfsenlwuvmn.supabase.co/storage/v1/object/public/${data.key}`;
      return publicUrl;
    } catch (error) {
      console.error("Error uploading image: ", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al subir la imagen de portada.",
      });
      return null;
    }
  };

  const handleCreatePath = async (values: any) => {
    const imageUrl = await uploadCoverImage();
    if (imageUrl) {
      await createPath({
        ...values,
        cover_image_url: imageUrl
      });
    }
  };

  const handleUpdatePath = async (pathId: string, values: any) => {
    let imageUrl = selectedPath?.cover_image_url;
    if (coverImage) {
      imageUrl = await uploadCoverImage() || selectedPath?.cover_image_url;
    }
    if (imageUrl) {
      await updatePath(pathId, {
        ...values,
        cover_image_url: imageUrl
      });
    }
  };

  const filteredPaths = paths.filter(path =>
    path.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Rutas de Aprendizaje</CardTitle>
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Nueva Ruta
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Crear Ruta de Aprendizaje</DialogTitle>
                  <DialogDescription>
                    Crea una nueva ruta de aprendizaje para guiar a los estudiantes.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Título
                    </Label>
                    <Input
                      type="text"
                      id="title"
                      defaultValue=""
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Descripción
                    </Label>
                    <Textarea
                      id="description"
                      defaultValue=""
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="estimatedHours" className="text-right">
                      Duración estimada (horas)
                    </Label>
                    <Input
                      type="number"
                      id="estimatedHours"
                      defaultValue={0}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="coverImage" className="text-right">
                      Imagen de Portada
                    </Label>
                    <div className="col-span-3">
                      <Input
                        type="file"
                        id="coverImage"
                        className="hidden"
                        onChange={handleCoverImageChange}
                      />
                      <Label htmlFor="coverImage" className="cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md px-3 py-1.5 text-sm font-medium">
                        <Upload className="h-4 w-4 mr-2" />
                        Subir Imagen
                      </Label>
                      {coverImageUrl && (
                        <img
                          src={coverImageUrl}
                          alt="Vista previa de la portada"
                          className="mt-2 rounded-md max-h-32 object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={async () => {
                    const title = (document.getElementById('title') as HTMLInputElement).value;
                    const description = (document.getElementById('description') as HTMLTextAreaElement).value;
                    const estimatedHours = parseFloat((document.getElementById('estimatedHours') as HTMLInputElement).value);

                    await handleCreatePath({ title, description, estimatedHours });
                  }}>
                    Crear
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Buscar ruta..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <Separator className="my-4" />
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Duración</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPaths.map(path => (
                  <TableRow key={path.id}>
                    <TableCell className="font-medium">{path.title}</TableCell>
                    <TableCell>{path.description}</TableCell>
                    <TableCell>{path.estimatedHours}</TableCell>
                    <TableCell>{path.is_published ? 'Publicado' : 'Borrador'}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Pencil className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditingPath} onOpenChange={setIsEditingPath}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Editar Ruta de Aprendizaje</DialogTitle>
            <DialogDescription>
              Modifica los detalles de la ruta de aprendizaje seleccionada.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Título
              </Label>
              <Input
                type="text"
                id="title"
                defaultValue={selectedPath?.title}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descripción
              </Label>
              <Textarea
                id="description"
                defaultValue={selectedPath?.description}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="estimatedHours" className="text-right">
                Duración estimada (horas)
              </Label>
              <Input
                type="number"
                id="estimatedHours"
                defaultValue={selectedPath?.estimatedHours}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="coverImage" className="text-right">
                Imagen de Portada
              </Label>
              <div className="col-span-3">
                <Input
                  type="file"
                  id="coverImage"
                  className="hidden"
                  onChange={handleCoverImageChange}
                />
                <Label htmlFor="coverImage" className="cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md px-3 py-1.5 text-sm font-medium">
                  <Upload className="h-4 w-4 mr-2" />
                  Subir Imagen
                </Label>
                {coverImageUrl ? (
                  <img
                    src={coverImageUrl}
                    alt="Vista previa de la portada"
                    className="mt-2 rounded-md max-h-32 object-cover"
                  />
                ) : selectedPath?.cover_image_url ? (
                  <img
                    src={selectedPath.cover_image_url}
                    alt="Portada actual"
                    className="mt-2 rounded-md max-h-32 object-cover"
                  />
                ) : null}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={async () => {
              if (selectedPath) {
                const title = (document.getElementById('title') as HTMLInputElement).value;
                const description = (document.getElementById('description') as HTMLTextAreaElement).value;
                const estimatedHours = parseFloat((document.getElementById('estimatedHours') as HTMLInputElement).value);

                await handleUpdatePath(selectedPath.id, { title, description, estimatedHours });
              }
            }}>
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};


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
import { Trash2, Database, PlusCircle } from 'lucide-react';

const dataTypeLabels: Record<TestDataType, string> = {
  course: 'Cursos',
  user: 'Usuarios',
  lesson: 'Lecciones',
  message: 'Mensajes'
};

const TestDataGenerator: React.FC = () => {
  const { testData, generateTestData, clearTestData, deleteTestDataItem, isGenerating } = useTestData();
  const [selectedType, setSelectedType] = useState<TestDataType>('course');
  const [count, setCount] = useState<number>(5);

  const handleGenerate = () => {
    if (count > 0 && count <= 100) {
      generateTestData(selectedType, count);
    }
  };

  const handleDeleteAll = (type?: TestDataType) => {
    clearTestData(type);
  };

  const handleDeleteItem = (type: TestDataType, id: string) => {
    deleteTestDataItem(type, id);
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
                                  onClick={() => handleDeleteItem(type as TestDataType, item.id)}
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
                    <div className="mt-4 flex justify-end">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Eliminar todos</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción eliminará todos los datos de prueba de tipo "{label.toLowerCase()}". 
                              Esta acción no se puede deshacer.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteAll(type as TestDataType)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Eliminar todos
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="outline" 
              disabled={
                Object.values(testData).every(items => items.length === 0)
              }
            >
              Eliminar todos los datos
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Eliminar todos los datos de prueba?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción eliminará TODOS los datos de prueba de todos los tipos.
                Esta acción no se puede deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteAll()}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Eliminar todos
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default TestDataGenerator;

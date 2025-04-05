
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { TableColumn } from './types';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';

export interface TableDrawerProps<TData = any> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: TData | null;
  columns: TableColumn<TData>[];
  onSubmit: (data: TData) => Promise<void>;
  isLoading?: boolean;
}

export function TableDrawer<TData extends Record<string, any>>({
  isOpen,
  onClose,
  title,
  data,
  columns,
  onSubmit,
  isLoading = false,
}: TableDrawerProps<TData>) {
  // Build schema based on columns
  const buildSchema = () => {
    const schema: Record<string, any> = {};
    
    columns.forEach((col) => {
      if (col.hidden || col.type === 'actions') return;
      
      let fieldSchema: any = z.any();
      
      // Set the appropriate schema based on the column type
      switch (col.type) {
        case 'text':
          fieldSchema = col.required ? z.string().min(1, { message: "Este campo es requerido" }) : z.string().optional();
          break;
        case 'number':
          fieldSchema = col.required ? z.number() : z.number().optional();
          break;
        case 'boolean':
          fieldSchema = z.boolean().optional();
          break;
        case 'date':
          fieldSchema = col.required ? z.string().min(1) : z.string().optional();
          break;
        case 'select':
          fieldSchema = col.required ? z.any() : z.any().optional();
          break;
        default:
          fieldSchema = col.required ? z.any() : z.any().optional();
      }
      
      const accessorKey = col.accessorKey || col.id;
      schema[accessorKey] = fieldSchema;
    });
    
    return z.object(schema);
  };
  
  // Create the form schema
  const formSchema = buildSchema();

  // Initialize form
  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: data || {},
  });
  
  // Update form values when data changes
  useEffect(() => {
    if (data) {
      Object.keys(data).forEach(key => {
        form.setValue(key, (data as any)[key]);
      });
    } else {
      form.reset({});
    }
  }, [data, form]);
  
  // Handle form submission
  const handleSubmit = async (values: any) => {
    try {
      await onSubmit(values);
      toast.success(`${data ? 'Actualizado' : 'Creado'} correctamente`);
      onClose();
    } catch (error) {
      console.error('Error en el formulario:', error);
      toast.error(`Error al ${data ? 'actualizar' : 'crear'}`);
    }
  };
  
  // Render form fields based on columns
  const renderFormField = (column: TableColumn) => {
    if (column.hidden || column.type === 'actions' || !column.editable && data) {
      return null;
    }
    
    const accessorKey = column.accessorKey || column.id;
    
    return (
      <FormField
        key={column.id}
        control={form.control}
        name={accessorKey}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{column.header}</FormLabel>
            <FormControl>
              {renderFormControl(column, field)}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };
  
  // Render the appropriate form control based on column type
  const renderFormControl = (column: TableColumn, field: any) => {
    switch (column.type) {
      case 'boolean':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox 
              checked={field.value} 
              onCheckedChange={field.onChange} 
              id={column.id}
            />
            <label 
              htmlFor={column.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Activar
            </label>
          </div>
        );
      
      case 'text':
        if (column.meta?.multiline) {
          return (
            <Textarea
              {...field}
              value={field.value || ''}
              className="min-h-[100px]"
            />
          );
        }
        return <Input {...field} value={field.value || ''} />;
      
      case 'number':
        return (
          <Input 
            {...field} 
            type="number" 
            value={field.value ?? ''} 
            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)} 
          />
        );
      
      case 'date':
        return (
          <Input 
            {...field} 
            type="datetime-local" 
            value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ''} 
          />
        );
      
      case 'select':
        return (
          <Select 
            value={String(field.value || '')} 
            onValueChange={field.onChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar..." />
            </SelectTrigger>
            <SelectContent>
              {column.options?.map((option) => (
                <SelectItem key={String(option.value)} value={String(option.value)}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      default:
        return <Input {...field} value={field.value || ''} />;
    }
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[70%] sm:max-w-[70%] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-60">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Cargando...</span>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {columns.map(renderFormField)}
                </div>
                
                <SheetFooter className="pt-6">
                  <div className="flex justify-between w-full gap-2">
                    <Button variant="outline" onClick={onClose} type="button">
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {data ? 'Guardar cambios' : 'Crear'}
                    </Button>
                  </div>
                </SheetFooter>
              </form>
            </Form>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

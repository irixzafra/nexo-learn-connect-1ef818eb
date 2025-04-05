
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
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
          fieldSchema = col.required ? z.string().min(1, { message: "This field is required" }) : z.string().optional();
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
      toast.success(`${data ? 'Updated' : 'Created'} successfully`);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(`Failed to ${data ? 'update' : 'create'}`);
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
          <Checkbox 
            checked={field.value} 
            onCheckedChange={field.onChange} 
          />
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
            value={field.value || ''} 
            onChange={(e) => field.onChange(e.target.valueAsNumber || null)} 
          />
        );
      
      case 'date':
        return (
          <Input 
            {...field} 
            type="datetime-local" 
            value={field.value || ''} 
          />
        );
      
      case 'select':
        return (
          <Select 
            value={String(field.value || '')} 
            onValueChange={field.onChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
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
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh] sm:max-w-[600px] md:max-w-[800px]">
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        
        <div className="px-4 py-2 overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {columns.map(renderFormField)}
              </div>
              
              <DrawerFooter className="pt-2 border-t flex justify-between">
                <Button variant="outline" onClick={onClose} type="button">
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {data ? 'Save changes' : 'Create'}
                </Button>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

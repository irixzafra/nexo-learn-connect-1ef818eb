
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

interface PageContentEditorProps {
  form: UseFormReturn<any>;
}

const PageContentEditor: React.FC<PageContentEditorProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título de la página</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Introduce el título de la página" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contenido</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field}
                    value={typeof field.value === 'object' ? JSON.stringify(field.value, null, 2) : field.value}
                    onChange={(e) => {
                      try {
                        // Try to parse as JSON if it looks like JSON
                        if (e.target.value.trim().startsWith('{')) {
                          field.onChange(JSON.parse(e.target.value));
                        } else {
                          field.onChange(e.target.value);
                        }
                      } catch {
                        // If not valid JSON, just store as string
                        field.onChange(e.target.value);
                      }
                    }}
                    placeholder="Contenido en formato JSON o texto plano"
                    className="min-h-[200px] font-mono"
                    rows={10}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PageContentEditor;


import React from 'react';
import { ArrowLeft } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import AIPageCreator from '@/components/admin/pages/AIPageCreator';
import { useCreatePageForm } from '@/features/admin/hooks/useCreatePageForm';
import BasicPageInfo from '@/features/admin/components/pages/BasicPageInfo';
import PageTypeSelector from '@/features/admin/components/pages/PageTypeSelector';
import PageContentContext from '@/features/admin/components/pages/PageContentContext';
import PageFormActions from '@/features/admin/components/pages/PageFormActions';

const CreatePage: React.FC = () => {
  const {
    form,
    isSubmitting,
    handleTitleChange,
    handleRegenerateContent,
    handleContentGenerated,
    onSubmit,
    navigate
  } = useCreatePageForm();

  return (
    <div>
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => navigate('/admin/settings/pages')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver a páginas
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Crear Nueva Página con IA</CardTitle>
          <CardDescription>
            Nuestro asistente de IA te ayudará a crear una página atractiva según tus necesidades
          </CardDescription>
        </CardHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <BasicPageInfo form={form} handleTitleChange={handleTitleChange} />
              <PageTypeSelector form={form} />
              <PageContentContext form={form} />
              
              {/* Vista previa del contenido generado */}
              <AIPageCreator 
                formData={form.getValues()} 
                onContentGenerated={handleContentGenerated}
              />
            </CardContent>
            
            <CardFooter>
              <PageFormActions 
                isSubmitting={isSubmitting}
                onCancel={() => navigate('/admin/settings/pages')}
                onRegenerate={handleRegenerateContent}
              />
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default CreatePage;


import React from "react";
import AppLayout from "@/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap, Award, BookOpen, Calendar } from "lucide-react";
import InlineEdit from "@/components/admin/InlineEdit";
import DraggableContent from "@/components/admin/DraggableContent";

const Scholarships: React.FC = () => {
  // Example scholarship items that can be reordered in edit mode
  const scholarshipItems = [
    { 
      id: "scholarship-item-1", 
      order: 1, 
      content: (
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <InlineEdit 
                table="content" 
                id="scholarship-1-title" 
                field="text" 
                value="Beca de Excelencia Académica" 
              />
            </CardTitle>
            <CardDescription>
              <InlineEdit 
                table="content" 
                id="scholarship-1-category" 
                field="text" 
                value="Programa de Becas 2023" 
              />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Fecha límite:</p>
                  <InlineEdit 
                    table="content" 
                    id="scholarship-1-deadline" 
                    field="text" 
                    value="30 de Junio, 2023" 
                    className="text-sm text-muted-foreground"
                  />
                </div>
              </div>
              <div className="flex items-start gap-2">
                <BookOpen className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Descripción:</p>
                  <InlineEdit 
                    table="content" 
                    id="scholarship-1-description" 
                    field="text" 
                    value="Beca completa para estudiantes con excelente rendimiento académico en programas de desarrollo web y programación." 
                    className="text-sm text-muted-foreground"
                    multiline
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    },
    { 
      id: "scholarship-item-2", 
      order: 2, 
      content: (
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <InlineEdit 
                table="content" 
                id="scholarship-2-title" 
                field="text" 
                value="Beca para Nuevos Talentos" 
              />
            </CardTitle>
            <CardDescription>
              <InlineEdit 
                table="content" 
                id="scholarship-2-category" 
                field="text" 
                value="Programa de Becas 2023" 
              />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Fecha límite:</p>
                  <InlineEdit 
                    table="content" 
                    id="scholarship-2-deadline" 
                    field="text" 
                    value="15 de Julio, 2023" 
                    className="text-sm text-muted-foreground"
                  />
                </div>
              </div>
              <div className="flex items-start gap-2">
                <BookOpen className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Descripción:</p>
                  <InlineEdit 
                    table="content" 
                    id="scholarship-2-description" 
                    field="text" 
                    value="Programa dirigido a jóvenes talentos que buscan formarse en el ámbito de la tecnología y desarrollo de software." 
                    className="text-sm text-muted-foreground"
                    multiline
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    },
    { 
      id: "scholarship-item-3", 
      order: 3, 
      content: (
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <InlineEdit 
                table="content" 
                id="scholarship-3-title" 
                field="text" 
                value="Beca de Diversidad en Tech" 
              />
            </CardTitle>
            <CardDescription>
              <InlineEdit 
                table="content" 
                id="scholarship-3-category" 
                field="text" 
                value="Programa de Becas 2023" 
              />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Fecha límite:</p>
                  <InlineEdit 
                    table="content" 
                    id="scholarship-3-deadline" 
                    field="text" 
                    value="30 de Julio, 2023" 
                    className="text-sm text-muted-foreground"
                  />
                </div>
              </div>
              <div className="flex items-start gap-2">
                <BookOpen className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Descripción:</p>
                  <InlineEdit 
                    table="content" 
                    id="scholarship-3-description" 
                    field="text" 
                    value="Programa dirigido a promover la diversidad en el mundo tecnológico, ofreciendo oportunidades de formación en desarrollo de software." 
                    className="text-sm text-muted-foreground"
                    multiline
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }
  ];

  return (
    <AppLayout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-3">
            <InlineEdit 
              table="content" 
              id="scholarships-title" 
              field="text" 
              value="Becas Disponibles" 
              className="text-3xl font-bold" 
            />
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <InlineEdit 
              table="content" 
              id="scholarships-subtitle" 
              field="text" 
              value="Descubre nuestras oportunidades de becas para impulsar tu carrera en tecnología" 
              className="text-lg text-muted-foreground"
              multiline
            />
          </p>
        </div>

        <DraggableContent 
          items={scholarshipItems}
          table="scholarship_items"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          itemClassName="flex"
        />

        <div className="text-center mt-12">
          <GraduationCap className="h-12 w-12 mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-bold mb-3">
            <InlineEdit 
              table="content" 
              id="scholarships-cta-title" 
              field="text" 
              value="¿Quieres solicitar una beca?" 
              className="text-2xl font-bold"
            />
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            <InlineEdit 
              table="content" 
              id="scholarships-cta-description" 
              field="text" 
              value="Completa el formulario de solicitud y nuestro equipo se pondrá en contacto contigo para ofrecerte más información." 
              className="text-muted-foreground"
              multiline
            />
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Scholarships;

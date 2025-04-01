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
                value="Beca de Excelencia Académica" 
                onChange={() => {}}
              />
            </CardTitle>
            <CardDescription>
              <InlineEdit 
                value="Programa de Becas 2023" 
                onChange={() => {}}
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
                    value="30 de Junio, 2023" 
                    onChange={() => {}}
                    className="text-sm text-muted-foreground"
                  />
                </div>
              </div>
              <div className="flex items-start gap-2">
                <BookOpen className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Descripción:</p>
                  <InlineEdit 
                    value="Beca completa para estudiantes con excelente rendimiento académico en programas de desarrollo web y programación." 
                    onChange={() => {}}
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
                value="Beca para Nuevos Talentos" 
                onChange={() => {}}
              />
            </CardTitle>
            <CardDescription>
              <InlineEdit 
                value="Programa de Becas 2023" 
                onChange={() => {}}
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
                    value="15 de Julio, 2023" 
                    onChange={() => {}}
                    className="text-sm text-muted-foreground"
                  />
                </div>
              </div>
              <div className="flex items-start gap-2">
                <BookOpen className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Descripción:</p>
                  <InlineEdit 
                    value="Programa dirigido a jóvenes talentos que buscan formarse en el ámbito de la tecnología y desarrollo de software." 
                    onChange={() => {}}
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
                value="Beca de Diversidad en Tech" 
                onChange={() => {}}
              />
            </CardTitle>
            <CardDescription>
              <InlineEdit 
                value="Programa de Becas 2023" 
                onChange={() => {}}
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
                    value="30 de Julio, 2023" 
                    onChange={() => {}}
                    className="text-sm text-muted-foreground"
                  />
                </div>
              </div>
              <div className="flex items-start gap-2">
                <BookOpen className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Descripción:</p>
                  <InlineEdit 
                    value="Programa dirigido a promover la diversidad en el mundo tecnológico, ofreciendo oportunidades de formación en desarrollo de software." 
                    onChange={() => {}}
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
              value="Becas Disponibles" 
              onChange={() => {}}
              className="text-3xl font-bold" 
            />
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <InlineEdit 
              value="Descubre nuestras oportunidades de becas para impulsar tu carrera en tecnología" 
              onChange={() => {}}
              className="text-lg text-muted-foreground"
              multiline
            />
          </p>
        </div>

        <DraggableContent 
          items={scholarshipItems}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          itemClassName="flex"
        />

        <div className="text-center mt-12">
          <GraduationCap className="h-12 w-12 mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-bold mb-3">
            <InlineEdit 
              value="¿Quieres solicitar una beca?" 
              onChange={() => {}}
              className="text-2xl font-bold"
            />
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            <InlineEdit 
              value="Completa el formulario de solicitud y nuestro equipo se pondrá en contacto contigo para ofrecerte más información." 
              onChange={() => {}}
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

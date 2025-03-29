
import React from "react";
import AppLayout from "@/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import InlineEdit from "@/components/admin/InlineEdit";
import DraggableContent from "@/components/admin/DraggableContent";

const Messages: React.FC = () => {
  // Example message items that can be reordered in edit mode
  const messageItems = [
    { 
      id: "message-item-1", 
      order: 1, 
      content: (
        <div className="border-b border-border pb-4 mb-4">
          <h3 className="font-medium text-base mb-1">
            <InlineEdit 
              table="content" 
              id="message-item-1-title" 
              field="text" 
              value="Bienvenido a la plataforma" 
              as="span"
            />
          </h3>
          <p className="text-muted-foreground text-sm">
            <InlineEdit 
              table="content" 
              id="message-item-1-content" 
              field="text" 
              value="Gracias por unirte a nuestra comunidad de aprendizaje." 
              as="span"
              multiline
            />
          </p>
        </div>
      )
    },
    { 
      id: "message-item-2", 
      order: 2, 
      content: (
        <div className="border-b border-border pb-4 mb-4">
          <h3 className="font-medium text-base mb-1">
            <InlineEdit 
              table="content" 
              id="message-item-2-title" 
              field="text" 
              value="Próximamente nuevos cursos" 
              as="span"
            />
          </h3>
          <p className="text-muted-foreground text-sm">
            <InlineEdit 
              table="content" 
              id="message-item-2-content" 
              field="text" 
              value="Estamos preparando nuevos contenidos para mejorar tu experiencia." 
              as="span"
              multiline
            />
          </p>
        </div>
      )
    },
    { 
      id: "message-item-3", 
      order: 3, 
      content: (
        <div>
          <h3 className="font-medium text-base mb-1">
            <InlineEdit 
              table="content" 
              id="message-item-3-title" 
              field="text" 
              value="¿Necesitas ayuda?" 
              as="span"
            />
          </h3>
          <p className="text-muted-foreground text-sm">
            <InlineEdit 
              table="content" 
              id="message-item-3-content" 
              field="text" 
              value="Contacta con nuestro equipo de soporte para cualquier consulta." 
              as="span"
              multiline
            />
          </p>
        </div>
      )
    }
  ];

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <InlineEdit 
          table="content" 
          id="messages-title" 
          field="text" 
          value="Mensajes" 
          as="h1"
          className="text-3xl font-bold mb-6"
        />
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <InlineEdit 
                table="content" 
                id="message-center-title" 
                field="text" 
                value="Centro de Mensajes" 
                as="span"
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Draggable content example */}
            <DraggableContent 
              items={messageItems}
              table="content_items"
              className="space-y-4 mt-4"
            />
            
            {/* Empty state message */}
            <div className="py-8 text-center text-muted-foreground mt-6 border-t border-border">
              <InlineEdit 
                table="content" 
                id="no-messages" 
                field="text" 
                value="No tienes más mensajes nuevos" 
                as="p"
              />
              <InlineEdit 
                table="content" 
                id="messages-coming-soon" 
                field="text" 
                value="Esta funcionalidad estará disponible próximamente" 
                as="p"
                className="text-sm mt-2"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Messages;


import React from "react";
import AppLayout from "@/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import InlineEdit from "@/components/admin/InlineEdit";

const Messages: React.FC = () => (
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
          <div className="py-8 text-center text-muted-foreground">
            <InlineEdit 
              table="content" 
              id="no-messages" 
              field="text" 
              value="No tienes mensajes nuevos" 
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

export default Messages;


import React from "react";
import AppLayout from "@/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

const Messages: React.FC = () => (
  <AppLayout>
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mensajes</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Centro de Mensajes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-muted-foreground">
            <p>No tienes mensajes nuevos</p>
            <p className="text-sm mt-2">Esta funcionalidad estará disponible próximamente</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </AppLayout>
);

export default Messages;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const InvoiceEmptyState: React.FC = () => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <FileX className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No hay facturas disponibles</h3>
        <p className="text-muted-foreground text-center mb-6">
          No tienes ninguna factura o historial de pagos todavía.
          Cuando realices una compra o suscripción, podrás ver tus facturas aquí.
        </p>
        <Button asChild>
          <Link to="/courses">Explorar cursos</Link>
        </Button>
      </CardContent>
    </Card>
  );
};


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText, Folder, Navigation, Shuffle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { SystemPagesNavigation } from '@/features/admin/components/settings/SystemPagesNavigation';

const PagesManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Navigation className="h-5 w-5 text-primary" />
              <CardTitle>Explorador de Navegación</CardTitle>
            </div>
            <Button variant="outline" size="sm">
              <Shuffle className="mr-2 h-4 w-4" />
              Modo Mapa
            </Button>
          </div>
          <CardDescription>
            Explora todas las páginas disponibles en el sistema, sus estados y categorías
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SystemPagesNavigation />
        </CardContent>
      </Card>
    </div>
  );
};

export default PagesManagement;

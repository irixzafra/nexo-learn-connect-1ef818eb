
import React from "react";
import { FolderTree } from "lucide-react";
import { Card } from "@/components/ui/card";

const CategoriesTab: React.FC = () => (
  <Card className="p-6">
    <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/40 rounded-md">
      <FolderTree className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">Módulo en Desarrollo</h3>
      <p className="text-muted-foreground">
        La gestión de categorías estará disponible próximamente.
      </p>
    </div>
  </Card>
);

export default CategoriesTab;

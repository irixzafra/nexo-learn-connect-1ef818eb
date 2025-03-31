
import React from "react";
import { BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";

const AnalyticsTab: React.FC = () => (
  <Card className="p-6">
    <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/40 rounded-md">
      <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">Módulo en Desarrollo</h3>
      <p className="text-muted-foreground">
        Las analíticas de cursos estarán disponibles próximamente.
      </p>
    </div>
  </Card>
);

export default AnalyticsTab;

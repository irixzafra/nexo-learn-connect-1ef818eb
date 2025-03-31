
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { FileText, FileType, Download, Copy } from 'lucide-react';
import { toast } from 'sonner';

const AUDIT_FORMATS = [
  { id: 'markdown', name: 'Markdown (.md)', icon: <FileText className="h-5 w-5 text-blue-500" />, description: 'Formato ligero con soporte para marcado de texto' },
  { id: 'pdf', name: 'PDF (.pdf)', icon: <FileType className="h-5 w-5 text-red-500" />, description: 'Documento portátil ideal para compartir' },
  { id: 'word', name: 'Word (.docx)', icon: <FileText className="h-5 w-5 text-blue-600" />, description: 'Editable y compatible con Microsoft Office' },
  { id: 'html', name: 'HTML (.html)', icon: <FileType className="h-5 w-5 text-orange-500" />, description: 'Visualización en navegadores web' },
];

interface AuditFormatSelectorProps {
  onFormatSelected?: (format: string) => void;
}

const AuditFormatSelector: React.FC<AuditFormatSelectorProps> = ({ onFormatSelected }) => {
  const [selectedFormat, setSelectedFormat] = useState('markdown');
  const auditPath = 'src/docs/AuditoriaTecnicaCompleta.md';

  const handleFormatChange = (value: string) => {
    setSelectedFormat(value);
    if (onFormatSelected) {
      onFormatSelected(value);
    }
  };

  const handleDownload = () => {
    toast.success(`Iniciando descarga del informe de auditoría en formato ${selectedFormat}`);
    // En una aplicación real, aquí se generaría y descargaría el archivo
  };

  const handleCopyPath = () => {
    navigator.clipboard.writeText(auditPath);
    toast.success('Ruta del documento copiada al portapapeles');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Informe de Auditoría Técnica
        </CardTitle>
        <CardDescription>
          El informe completo está disponible en formato Markdown en:
          <div className="mt-1 flex items-center gap-2">
            <code className="bg-muted px-2 py-1 rounded text-sm">{auditPath}</code>
            <Button variant="outline" size="icon" onClick={handleCopyPath} title="Copiar ruta">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Seleccione el formato para exportar:</h3>
            <RadioGroup 
              value={selectedFormat} 
              onValueChange={handleFormatChange}
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              {AUDIT_FORMATS.map((format) => (
                <div key={format.id} className="flex items-start space-x-2">
                  <RadioGroupItem value={format.id} id={format.id} />
                  <Label htmlFor={format.id} className="flex flex-col cursor-pointer">
                    <div className="flex items-center">
                      {format.icon}
                      <span className="ml-2 font-medium">{format.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{format.description}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleDownload} className="gap-2">
          <Download className="h-4 w-4" />
          Descargar Informe
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuditFormatSelector;

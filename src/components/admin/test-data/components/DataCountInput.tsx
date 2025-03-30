
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { TestDataType } from '@/contexts/test-data';
import { dataTypeLabels } from '../utils/dataTypeUtils';

interface DataCountInputProps {
  count: number;
  onCountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  selectedTypes: TestDataType[];
}

export const DataCountInput: React.FC<DataCountInputProps> = ({
  count,
  onCountChange,
  onGenerate,
  isGenerating,
  selectedTypes
}) => {
  return (
    <div className="mt-4">
      <Label htmlFor="count" className="text-sm font-medium mb-1.5 block">Cantidad por tipo</Label>
      <div className="flex items-center gap-2">
        <Input
          id="count"
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={onCountChange}
          className="w-24"
        />
        <Button
          onClick={onGenerate}
          disabled={isGenerating}
          className="transition-all duration-200 bg-blue-500 hover:bg-blue-600 text-white flex-grow sm:flex-grow-0"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generando...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Generar
            </>
          )}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        {count === 1 
          ? `Generar 1 elemento de tipo "${selectedTypes.length === 1 ? dataTypeLabels[selectedTypes[0]] : 'seleccionado'}"` 
          : `Generar ${count} elementos de ${selectedTypes.length === 1 
              ? `tipo "${dataTypeLabels[selectedTypes[0]]}"` 
              : `cada tipo seleccionado (${selectedTypes.length} tipos)`}`}
      </p>
    </div>
  );
};

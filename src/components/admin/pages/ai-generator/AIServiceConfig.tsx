
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Key } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AIService } from './AIServiceSelector';

interface AIServiceConfigProps {
  service: AIService;
  onKeySubmit: (key: string) => void;
  isSaved: boolean;
  isLoading?: boolean;
  error?: string;
}

const AIServiceConfig: React.FC<AIServiceConfigProps> = ({
  service,
  onKeySubmit,
  isSaved,
  isLoading = false,
  error
}) => {
  const [apiKey, setApiKey] = useState('');

  const serviceLinks: Record<AIService, { name: string, url: string }> = {
    openai: { name: 'OpenAI', url: 'https://platform.openai.com/api-keys' },
    anthropic: { name: 'Anthropic', url: 'https://console.anthropic.com/settings/keys' },
    gemini: { name: 'Google AI Studio', url: 'https://aistudio.google.com/app/apikey' },
    perplexity: { name: 'Perplexity', url: 'https://www.perplexity.ai/settings/api' },
    hf: { name: 'Hugging Face', url: 'https://huggingface.co/settings/tokens' },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey) {
      onKeySubmit(apiKey);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-md bg-card">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Configuración de {serviceLinks[service].name}</h3>
        {isSaved && <span className="text-xs text-green-500">Configurado</span>}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`${service}-api-key`}>API Key</Label>
          <div className="flex gap-2">
            <Input
              id={`${service}-api-key`}
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={isSaved ? '••••••••••••••••••••••' : `Introduce tu ${serviceLinks[service].name} API Key`}
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={!apiKey || isLoading}>
              {isLoading ? 'Guardando...' : isSaved ? 'Actualizar' : 'Guardar'}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Puedes obtener tu API key en{' '}
            <a 
              href={serviceLinks[service].url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {serviceLinks[service].name}
            </a>
          </p>
        </div>
        
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </form>
    </div>
  );
};

export default AIServiceConfig;

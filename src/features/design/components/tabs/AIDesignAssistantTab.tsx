
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateDesignSuggestion } from '../../utils/aiDesignAssistant';

const AIDesignAssistantTab = () => {
  const [prompt, setPrompt] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateSuggestions = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    try {
      const result = await generateDesignSuggestion(prompt);
      setSuggestions(result.suggestions);
    } catch (error) {
      console.error('Error generating design suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">AI Design Assistant</h2>
        <p className="text-muted-foreground">
          Describe what you're looking for and the AI will suggest design options.
        </p>
        
        <Textarea
          placeholder="e.g., 'Suggest a color palette for a learning platform with a modern look'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="w-full"
        />
        
        <Button 
          onClick={handleGenerateSuggestions}
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? 'Generating...' : 'Generate Suggestions'}
        </Button>
      </div>
      
      {suggestions.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {suggestions.map((suggestion, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{suggestion.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{suggestion.description}</p>
                <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto">
                  <code>{suggestion.code}</code>
                </pre>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIDesignAssistantTab;

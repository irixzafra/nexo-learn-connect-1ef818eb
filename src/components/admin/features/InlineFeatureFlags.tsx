
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Flag, Settings } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

interface FeatureFlag {
  id: string;
  feature_name: string;
  description: string;
  is_enabled: boolean;
  scope: string;
  config?: any;
}

export const InlineFeatureFlags: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchFeatureFlags();
    }
  }, [isOpen]);

  const fetchFeatureFlags = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('feature_flags')
        .select('*')
        .order('feature_name', { ascending: true });

      if (error) {
        throw error;
      }

      setFeatureFlags(data || []);
    } catch (error) {
      console.error('Error fetching feature flags:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las banderas de características",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleFeatureFlag = async (id: string, enabled: boolean) => {
    try {
      const { error } = await supabase
        .from('feature_flags')
        .update({ is_enabled: enabled })
        .eq('id', id);

      if (error) {
        throw error;
      }

      setFeatureFlags(prev => 
        prev.map(flag => 
          flag.id === id ? { ...flag, is_enabled: enabled } : flag
        )
      );

      toast({
        title: "Estado actualizado",
        description: `Feature flag ${enabled ? 'activado' : 'desactivado'} correctamente`,
        variant: "success",
      });
    } catch (error) {
      console.error('Error updating feature flag:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado",
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="fixed bottom-4 left-4 z-50 shadow-lg gap-2"
        >
          <Flag className="h-4 w-4" />
          Feature Flags
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Feature Flags</SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="mt-6 h-[80vh]">
          {loading ? (
            <div className="py-4 text-center">Cargando...</div>
          ) : featureFlags.length === 0 ? (
            <div className="py-4 text-center text-muted-foreground">
              No hay feature flags disponibles
            </div>
          ) : (
            <div className="space-y-6">
              {featureFlags.map(flag => (
                <div key={flag.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{flag.feature_name}</h4>
                      <p className="text-sm text-muted-foreground">{flag.description}</p>
                      {flag.scope && (
                        <div className="mt-1 text-xs text-muted-foreground">
                          Scope: {flag.scope}
                        </div>
                      )}
                    </div>
                    <Switch 
                      checked={flag.is_enabled}
                      onCheckedChange={(checked) => toggleFeatureFlag(flag.id, checked)}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>
                  <Separator />
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default InlineFeatureFlags;

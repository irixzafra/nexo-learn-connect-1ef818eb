
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export interface UserPreferences {
  id: string;
  user_id: string;
  theme_preference: 'light' | 'dark' | 'system';
  language_preference: 'es' | 'en' | 'pt';
  email_notifications: boolean;
  browser_notifications: boolean;
  mobile_notifications: boolean;
  course_update_notifications: boolean;
  achievement_notifications: boolean;
  comment_notifications: boolean;
  forum_notifications: boolean;
  event_notifications: boolean;
  promotional_notifications: boolean;
  learning_reminder_days: string[];
  reminder_time: string;
  daily_goal_minutes: number;
  accessibility_options: Record<string, any>;
  created_at: string;
  updated_at: string;
}

const defaultPreferences: Partial<UserPreferences> = {
  theme_preference: 'system',
  language_preference: 'es',
  email_notifications: true,
  browser_notifications: true,
  mobile_notifications: false,
  course_update_notifications: true,
  achievement_notifications: true,
  comment_notifications: true,
  forum_notifications: true,
  event_notifications: true,
  promotional_notifications: false,
  learning_reminder_days: ['monday', 'wednesday', 'friday'],
  reminder_time: '09:00',
  daily_goal_minutes: 30,
  accessibility_options: {},
};

export const useUserPreferences = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load user preferences
  useEffect(() => {
    const fetchPreferences = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching preferences:', error);
          // If no preferences found, create default ones
          if (error.code === 'PGRST116') {
            const newPrefs = {
              ...defaultPreferences,
              user_id: user.id,
            };
            await savePreferences(newPrefs as UserPreferences);
          } else {
            toast.error('Error al cargar preferencias');
          }
        } else if (data) {
          setPreferences(data as UserPreferences);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        toast.error('Error al cargar preferencias');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreferences();
  }, [user]);

  // Save preferences to database
  const savePreferences = async (updatedPreferences: UserPreferences) => {
    if (!user) return;
    
    try {
      setIsSaving(true);
      
      const { data, error } = await supabase
        .from('user_preferences')
        .upsert({
          ...updatedPreferences,
          user_id: user.id,
          updated_at: new Date().toISOString(),
        })
        .select('*')
        .single();
      
      if (error) {
        console.error('Error saving preferences:', error);
        toast.error('Error al guardar preferencias');
        return false;
      }
      
      setPreferences(data as UserPreferences);
      toast.success('Preferencias guardadas');
      return true;
    } catch (err) {
      console.error('Unexpected error saving preferences:', err);
      toast.error('Error al guardar preferencias');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Update a single preference
  const updatePreference = async <K extends keyof UserPreferences>(
    key: K, 
    value: UserPreferences[K]
  ) => {
    if (!preferences) return false;
    
    const updatedPreferences = {
      ...preferences,
      [key]: value,
    };
    
    return savePreferences(updatedPreferences);
  };

  return {
    preferences,
    isLoading,
    isSaving,
    savePreferences,
    updatePreference,
  };
};


import { supabase } from '@/lib/supabase';
import { UserProfile } from '@/types/auth';

export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data as UserProfile;
  } catch (error) {
    console.error('Error in fetchUserProfile:', error);
    return null;
  }
};

export const ensureUserProfile = async (userId: string, email: string): Promise<UserProfile | null> => {
  try {
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (!existingProfile) {
      console.log('No profile found, creating one for user:', userId);
      const { error: createError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          full_name: email.split('@')[0],
          role: 'student',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        
      if (createError) {
        console.error('Error creating user profile:', createError);
        return null;
      }
      
      return await fetchUserProfile(userId);
    }
    
    return existingProfile as UserProfile;
  } catch (error) {
    console.error('Error in ensureUserProfile:', error);
    return null;
  }
};

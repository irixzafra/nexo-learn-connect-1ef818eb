
import { supabase } from '@/lib/supabase';
import { UserProfile } from '@/types/auth';

export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    
    return data as UserProfile;
  } catch (error) {
    console.error('Exception fetching user profile:', error);
    return null;
  }
};

export const ensureUserProfile = async (userId: string, email: string): Promise<UserProfile | null> => {
  try {
    // First, try to get existing profile
    const existingProfile = await fetchUserProfile(userId);
    
    if (existingProfile) {
      return existingProfile;
    }
    
    // If no profile exists, create one with default values
    const newProfile: Partial<UserProfile> = {
      user_id: userId,
      email: email,
      role: 'student', // Default role
      created_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('profiles')
      .insert([newProfile])
      .select('*')
      .single();
      
    if (error) {
      console.error('Error creating user profile:', error);
      return null;
    }
    
    return data as UserProfile;
  } catch (error) {
    console.error('Exception ensuring user profile:', error);
    return null;
  }
};

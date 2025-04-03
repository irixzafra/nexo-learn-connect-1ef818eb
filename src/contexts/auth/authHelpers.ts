
import { supabase } from '@/lib/supabase';
import { UserProfile, UserRoleType } from '@/types/auth';
import { toast } from 'sonner';

export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    console.log('Fetching user profile for:', userId);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    if (data) {
      console.log('Profile data received:', data);
      return data as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error in fetchUserProfile:', error);
    return null;
  }
};

export const forceUpdateUserRole = async (email: string, roleToSet: UserRoleType): Promise<{ success: boolean; error?: any }> => {
  try {
    console.log(`Attempting to force update role for ${email} to ${roleToSet}`);
    
    // First try to find the user by email in profiles table
    const { data: userData, error: userError } = await supabase
      .from('profiles')
      .select('id, email, role')
      .eq('email', email)
      .single();
    
    if (userError) {
      console.error('Error finding user by email:', userError);
      return { success: false, error: userError.message };
    }
    
    if (userData) {
      console.log('Found user:', userData);
      
      // Update the role in profiles
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ role: roleToSet })
        .eq('id', userData.id);
        
      if (updateError) {
        console.error('Error updating role:', updateError);
        return { success: false, error: updateError.message };
      }
      
      console.log(`Successfully updated role for ${email} to ${roleToSet}`);
      return { success: true };
    } else {
      console.error('User not found');
      return { success: false, error: 'User not found' };
    }
  } catch (error: any) {
    console.error('Error in forceUpdateRole:', error);
    return { success: false, error: error.message };
  }
};

export const saveSimulatedRole = (role: UserRoleType | null, currentRole: UserRoleType | null) => {
  if (role) {
    localStorage.setItem('viewAsRole', role);
    toast({
      title: "Vista cambiada",
      description: `Ahora estás viendo como: ${role}`,
    });
  } else {
    localStorage.removeItem('viewAsRole'); // Clean up when returning to original
    if (currentRole) {
      toast({
        title: "Vista restablecida",
        description: `Volviendo a tu rol original: ${currentRole}`,
      });
    }
  }
};

export const getStoredSimulatedRole = (): UserRoleType | null => {
  try {
    const storedRole = localStorage.getItem('viewAsRole');
    if (storedRole && storedRole !== 'current') {
      if (['admin', 'student', 'instructor', 'sistemas', 'moderator', 
           'content_creator', 'guest', 'beta_tester', 'anonimo'].includes(storedRole)) {
        return storedRole as UserRoleType;
      }
    }
  } catch (error) {
    console.error("Error reading simulated role from localStorage", error);
    localStorage.removeItem('viewAsRole');
  }
  return null;
};

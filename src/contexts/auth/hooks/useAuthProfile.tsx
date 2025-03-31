
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { UserProfile, UserRoleType, toUserRoleType } from '@/types/auth';

interface UseAuthProfileProps {
  user: any | null;
  setIsLoading: (value: boolean) => void;
}

export function useAuthProfile({ user, setIsLoading }: UseAuthProfileProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [role, setRole] = useState<UserRoleType | null>(null);

  // Fetch user profile when user changes
  useEffect(() => {
    const getProfile = async () => {
      setIsLoading(true);
      try {
        if (user) {
          const { data: profileData, error, status } = await supabase
            .from('profiles')
            .select(`full_name, avatar_url, username, role, bio, created_at, updated_at`)
            .eq('id', user.id)
            .single();

          if (error && status !== 406) {
            throw error;
          }
          
          if (profileData) {
            const userProfile: UserProfile = {
              id: user.id,
              email: user.email || undefined,
              full_name: profileData.full_name || undefined,
              avatar_url: profileData.avatar_url || undefined,
              username: profileData.username || undefined,
              role: toUserRoleType(profileData.role) || 'student',
              bio: profileData.bio || undefined,
              created_at: profileData.created_at || undefined,
              updated_at: profileData.updated_at || undefined,
            };
            
            setProfile(userProfile);
            setRole(toUserRoleType(userProfile.role));
          }
        }
      } catch (error: any) {
        console.error("Error fetching profile:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      getProfile();
    } else {
      setIsLoading(false);
    }
  }, [user, setIsLoading]);

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    setIsLoading(true);
    try {
      const { error, data } = await supabase.from('profiles').upsert(
        {
          id: user?.id,
          updated_at: new Date().toISOString(),
          ...updates,
        },
        { onConflict: 'id' }
      );
      
      if (error) {
        throw error;
      }
      
      setProfile((prevProfile: UserProfile | null) => {
        if (!prevProfile) return null;
        return {
          ...prevProfile,
          ...updates,
        };
      });

      return { error: null, data };
    } catch (error: any) {
      console.error('Error updating profile:', error.message);
      return { error, data: null };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profile,
    role,
    setProfile,
    setRole,
    updateUserProfile
  };
}

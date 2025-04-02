
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export type AccessibilityIssueType = 'bug' | 'feature' | 'improvement' | 'documentation';
export type AccessibilityIssueStatus = 'open' | 'in_progress' | 'resolved' | 'closed' | 'wont_fix';
export type AccessibilityIssuePriority = 'low' | 'medium' | 'high' | 'critical';

export interface AccessibilityIssueReporter {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
}

export interface AccessibilityIssueComment {
  id: string;
  issue_id: string;
  user_id: string;
  user?: AccessibilityIssueReporter;
  content: string;
  created_at: string;
}

export interface AccessibilityIssue {
  id: string;
  title: string;
  description: string;
  type: AccessibilityIssueType;
  status: AccessibilityIssueStatus;
  priority: AccessibilityIssuePriority;
  reporter_id: string;
  reporter?: AccessibilityIssueReporter;
  assignee_id?: string;
  assignee?: AccessibilityIssueReporter;
  created_at: string;
  updated_at: string;
  comments?: AccessibilityIssueComment[];
  votes: number;
  has_voted?: boolean;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  full_name?: string; // Add this property
  email?: string; // Add this property
  theme: 'light' | 'dark' | 'system';
  font_size: 'small' | 'medium' | 'large';
  reduced_motion: boolean;
  high_contrast: boolean;
  screen_reader_compatible: boolean;
  color_blind_mode?: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  created_at: string;
  updated_at: string;
}

export function useAccessibilityIssueTracker() {
  const [issues, setIssues] = useState<AccessibilityIssue[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Fetch all accessibility issues
  const fetchIssues = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('accessibility_issues')
        .select(`
          *,
          reporter:reporter_id(id, email, full_name, avatar_url),
          assignee:assignee_id(id, email, full_name, avatar_url),
          comments:accessibility_issue_comments(
            *,
            user:user_id(id, email, full_name, avatar_url)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get user votes
      const { data: votesData, error: votesError } = await supabase
        .from('accessibility_issue_votes')
        .select('issue_id')
        .eq('user_id', user.id);

      if (votesError) throw votesError;

      // Map user votes to issues
      const votedIssueIds = votesData.map(vote => vote.issue_id);
      const issuesWithVotes = data.map(issue => ({
        ...issue,
        has_voted: votedIssueIds.includes(issue.id)
      }));

      setIssues(issuesWithVotes);
    } catch (error) {
      console.error('Error fetching accessibility issues:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los problemas de accesibilidad',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);

  // Fetch user preferences
  const fetchUserPreferences = useCallback(async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      // If user doesn't have preferences yet, create default preferences
      if (!data) {
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('full_name, email')
          .eq('id', user.id)
          .single();

        if (userError) throw userError;

        const newPreferences = {
          user_id: user.id,
          full_name: userData?.full_name,
          email: userData?.email,
          theme: 'system',
          font_size: 'medium',
          reduced_motion: false,
          high_contrast: false,
          screen_reader_compatible: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const { data: insertedData, error: insertError } = await supabase
          .from('user_preferences')
          .insert(newPreferences)
          .select();

        if (insertError) throw insertError;
        setUserPreferences(insertedData[0]);
      } else {
        setUserPreferences(data);
      }
    } catch (error) {
      console.error('Error fetching user preferences:', error);
    }
  }, [user]);

  // Report new issue
  const reportIssue = async (issueData: Omit<AccessibilityIssue, 'id' | 'created_at' | 'updated_at' | 'reporter_id' | 'votes' | 'comments'>) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'Debes iniciar sesión para reportar problemas',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('accessibility_issues')
        .insert({
          ...issueData,
          reporter_id: user.id,
        })
        .select();

      if (error) throw error;

      toast({
        title: 'Problema reportado',
        description: 'Gracias por ayudarnos a mejorar la accesibilidad',
      });

      return data[0];
    } catch (error) {
      console.error('Error reporting accessibility issue:', error);
      toast({
        title: 'Error',
        description: 'No se pudo reportar el problema',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Vote for an issue
  const voteForIssue = async (issueId: string) => {
    if (!user) return;

    try {
      // Check if user already voted
      const { data, error } = await supabase
        .from('accessibility_issue_votes')
        .select('*')
        .eq('issue_id', issueId)
        .eq('user_id', user.id);

      if (error) throw error;

      if (data.length > 0) {
        // User already voted, remove vote
        const { error: deleteError } = await supabase
          .from('accessibility_issue_votes')
          .delete()
          .eq('issue_id', issueId)
          .eq('user_id', user.id);

        if (deleteError) throw deleteError;

        // Update local state
        setIssues(issues.map(issue => 
          issue.id === issueId 
            ? { ...issue, votes: issue.votes - 1, has_voted: false } 
            : issue
        ));
      } else {
        // User hasn't voted, add vote
        const { error: insertError } = await supabase
          .from('accessibility_issue_votes')
          .insert({
            issue_id: issueId,
            user_id: user.id,
          });

        if (insertError) throw insertError;

        // Update local state
        setIssues(issues.map(issue => 
          issue.id === issueId 
            ? { ...issue, votes: issue.votes + 1, has_voted: true } 
            : issue
        ));
      }
    } catch (error) {
      console.error('Error handling vote:', error);
      toast({
        title: 'Error',
        description: 'No se pudo procesar tu voto',
        variant: 'destructive',
      });
    }
  };

  // Add comment to an issue
  const addComment = async (issueId: string, content: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('accessibility_issue_comments')
        .insert({
          issue_id: issueId,
          user_id: user.id,
          content,
        })
        .select(`
          *,
          user:user_id(id, email, full_name, avatar_url)
        `);

      if (error) throw error;

      // Update local state
      setIssues(issues.map(issue => 
        issue.id === issueId 
          ? { 
              ...issue, 
              comments: [...(issue.comments || []), data[0]]
            } 
          : issue
      ));

      return data[0];
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: 'Error',
        description: 'No se pudo añadir el comentario',
        variant: 'destructive',
      });
      return null;
    }
  };

  // Load data on component mount
  useEffect(() => {
    if (user) {
      fetchIssues();
      fetchUserPreferences();
    }
  }, [user, fetchIssues, fetchUserPreferences]);

  return {
    issues,
    isLoading,
    isSubmitting,
    userPreferences,
    reportIssue,
    voteForIssue,
    addComment,
    fetchIssues,
  };
}

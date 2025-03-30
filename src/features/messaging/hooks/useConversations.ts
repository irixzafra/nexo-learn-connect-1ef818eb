
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Conversation, ChatMessage } from '@/types/community';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useConversations = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const userId = user?.id;

  return useQuery({
    queryKey: ['conversations', userId],
    queryFn: async (): Promise<Conversation[]> => {
      if (!userId) return [];

      // Fetch conversations where the current user is a participant
      const { data: participantData, error: participantError } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', userId);

      if (participantError) {
        throw participantError;
      }

      if (!participantData.length) {
        return [];
      }

      const conversationIds = participantData.map(p => p.conversation_id);

      // Fetch conversations with their participants
      const { data: conversations, error: conversationsError } = await supabase
        .from('conversations')
        .select(`
          *,
          conversation_participants(
            *,
            profiles(
              id, full_name, avatar_url, role
            )
          )
        `)
        .in('id', conversationIds)
        .order('updated_at', { ascending: false });

      if (conversationsError) {
        throw conversationsError;
      }

      // Get last message for each conversation
      const conversationsWithDetails = await Promise.all(
        conversations.map(async (conversation) => {
          // Fetch last message
          const { data: messages, error: messagesError } = await supabase
            .from('chat_messages')
            .select('*')
            .eq('conversation_id', conversation.id)
            .order('created_at', { ascending: false })
            .limit(1);

          if (messagesError) {
            console.error('Error fetching last message:', messagesError);
          }

          // Count unread messages
          const { count, error: countError } = await supabase
            .from('chat_messages')
            .select('*', { count: 'exact', head: true })
            .eq('conversation_id', conversation.id)
            .eq('is_read', false)
            .neq('sender_id', userId);

          if (countError) {
            console.error('Error counting unread messages:', countError);
          }

          // Format participants
          const participants = conversation.conversation_participants.map(p => ({
            id: p.id,
            conversation_id: p.conversation_id,
            user_id: p.user_id,
            created_at: p.created_at,
            profiles: p.profiles,
            is_online: Math.random() > 0.5 // Simulate online status for now
          }));

          return {
            ...conversation,
            participants,
            last_message: messages?.[0]?.content || '',
            last_message_time: messages?.[0]?.created_at || conversation.created_at,
            unread_count: count || 0,
            is_group: participants.length > 2
          };
        })
      );

      return conversationsWithDetails;
    },
    enabled: !!userId,
  });
};

export const useMessages = (conversationId: string | null) => {
  const { user } = useAuth();
  const userId = user?.id;

  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: async (): Promise<ChatMessage[]> => {
      if (!conversationId || !userId) return [];

      const { data, error } = await supabase
        .from('chat_messages')
        .select(`
          *,
          profiles:sender_id(
            full_name,
            avatar_url,
            role
          )
        `)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) {
        throw error;
      }

      // Mark messages as read
      await supabase
        .from('chat_messages')
        .update({ is_read: true })
        .eq('conversation_id', conversationId)
        .neq('sender_id', userId)
        .eq('is_read', false);

      return data.map(message => ({
        ...message,
        sender: {
          full_name: message.profiles?.full_name || 'Unknown User',
          avatar_url: message.profiles?.avatar_url,
          role: message.profiles?.role || 'student'
        }
      }));
    },
    enabled: !!conversationId && !!userId,
  });
};

export const useSendMessage = (conversationId: string | null) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (content: string) => {
      if (!conversationId || !user?.id || !content.trim()) {
        throw new Error('Missing required data');
      }
      
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          content: content.trim(),
          is_read: false
        })
        .select()
        .single();
        
      if (error) {
        throw error;
      }
      
      // Update the conversation's updated_at timestamp
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversationId);
      
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch conversations and messages
      queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
    onError: (error) => {
      console.error('Error sending message:', error);
      toast({
        title: 'Error al enviar mensaje',
        description: 'No se pudo enviar tu mensaje. Inténtalo de nuevo.',
        variant: 'destructive',
      });
    },
  });
};

export const useCreateConversation = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async ({ 
      participantIds, 
      isGroup = false, 
      groupName = '', 
      initialMessage = '' 
    }: { 
      participantIds: string[]; 
      isGroup?: boolean; 
      groupName?: string; 
      initialMessage?: string; 
    }) => {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }
      
      // Make sure current user is included in participants
      const allParticipantIds = [...new Set([...participantIds, user.id])];
      
      // Create conversation
      const { data: conversation, error: conversationError } = await supabase
        .from('conversations')
        .insert({
          is_group: isGroup,
          group_name: isGroup ? groupName : null,
        })
        .select()
        .single();
        
      if (conversationError) {
        throw conversationError;
      }
      
      // Add participants
      const participantsToInsert = allParticipantIds.map(userId => ({
        conversation_id: conversation.id,
        user_id: userId
      }));
      
      const { error: participantsError } = await supabase
        .from('conversation_participants')
        .insert(participantsToInsert);
        
      if (participantsError) {
        throw participantsError;
      }
      
      // Send initial message if provided
      if (initialMessage.trim()) {
        const { error: messageError } = await supabase
          .from('chat_messages')
          .insert({
            conversation_id: conversation.id,
            sender_id: user.id,
            content: initialMessage.trim(),
            is_read: false
          });
          
        if (messageError) {
          throw messageError;
        }
      }
      
      return conversation.id;
    },
    onSuccess: (conversationId) => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      toast({
        title: 'Conversación creada',
        description: 'La conversación se ha creado correctamente.',
      });
      return conversationId;
    },
    onError: (error) => {
      console.error('Error creating conversation:', error);
      toast({
        title: 'Error al crear conversación',
        description: 'No se pudo crear la conversación. Inténtalo de nuevo.',
        variant: 'destructive',
      });
    },
  });
};

export function useRealtimeMessages(conversationId: string | null) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);

  React.useEffect(() => {
    if (!conversationId || !user?.id || isSubscribed) return;

    // Subscribe to new messages
    const channel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          const newMessage = payload.new as ChatMessage;
          
          // Only update if the sender is not the current user
          if (newMessage.sender_id !== user.id) {
            // Mark message as read
            supabase
              .from('chat_messages')
              .update({ is_read: true })
              .eq('id', newMessage.id)
              .then();

            // Update messages in cache
            queryClient.setQueryData(
              ['messages', conversationId],
              (old: ChatMessage[] | undefined) => {
                if (!old) return [newMessage];
                return [...old, newMessage];
              }
            );
            
            // Update conversations list
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
          }
        }
      )
      .subscribe();

    setIsSubscribed(true);

    return () => {
      supabase.removeChannel(channel);
      setIsSubscribed(false);
    };
  }, [conversationId, user?.id, queryClient, isSubscribed]);
}

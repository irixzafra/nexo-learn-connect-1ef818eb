
import React, { useState, useRef, useEffect } from "react";
import AppLayout from "@/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  MessageSquare, 
  Search, 
  User, 
  MoreHorizontal, 
  Send, 
  Image, 
  Paperclip, 
  SmilePlus,
  Plus,
  Users,
  UserPlus,
  Phone,
  Video,
  InfoIcon,
  Archive,
  Filter,
  Check,
  BellOff,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from "@/lib/utils";
import { useConversations, useMessages, useSendMessage, useRealtimeMessages } from "@/features/messaging/hooks/useConversations";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { Conversation, ChatMessage } from "@/types/community";
import { Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Messages: React.FC = () => {
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [showNewMessageDialog, setShowNewMessageDialog] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  // Get conversations
  const { 
    data: conversations = [], 
    isLoading: isLoadingConversations 
  } = useConversations();

  // When conversations load, select the first one
  useEffect(() => {
    if (conversations.length > 0 && !activeConversationId) {
      setActiveConversationId(conversations[0].id);
    }
  }, [conversations, activeConversationId]);

  // Get messages for active conversation
  const { 
    data: messages = [], 
    isLoading: isLoadingMessages 
  } = useMessages(activeConversationId);

  // Subscribe to realtime messages
  useRealtimeMessages(activeConversationId);

  // Send message mutation
  const { mutate: sendMessage, isPending: isSending } = useSendMessage(activeConversationId);

  // Scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when conversation changes
  useEffect(() => {
    if (activeConversationId) {
      inputRef.current?.focus();
    }
  }, [activeConversationId]);

  // Find the active conversation object
  const activeConversation = conversations.find(conv => conv.id === activeConversationId);

  // Prepare conversation data for display
  const getConversationDisplayData = (conversation: Conversation) => {
    if (conversation.is_group) {
      return {
        name: conversation.group_name || 'Group Chat',
        avatar: conversation.group_avatar,
        isOnline: false, // Groups don't have online status
        isGroup: true
      };
    } else {
      // Find the other participant (not current user)
      const otherParticipant = conversation.participants.find(
        p => p.user_id !== user?.id
      );
      
      return {
        name: otherParticipant?.profiles?.full_name || 'Unknown User',
        avatar: otherParticipant?.profiles?.avatar_url,
        isOnline: otherParticipant?.is_online || false,
        isGroup: false,
        role: otherParticipant?.profiles?.role
      };
    }
  };

  // Format timestamp for messages
  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === now.toDateString()) {
      return format(date, 'HH:mm'); // Today, show only time
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ayer ' + format(date, 'HH:mm'); // Yesterday
    } else {
      return format(date, 'dd MMM, HH:mm', { locale: es }); // Other dates
    }
  };

  // Format timestamp for conversation list
  const formatConversationTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    
    if (date.toDateString() === now.toDateString()) {
      return format(date, 'HH:mm'); // Today, show only time
    } else {
      // For older messages, show relative time
      return formatDistanceToNow(date, { addSuffix: true, locale: es });
    }
  };

  // Filter conversations by search term
  const filteredConversations = searchTerm.trim() === ""
    ? conversations
    : conversations.filter(conv => {
        const displayData = getConversationDisplayData(conv);
        return displayData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              (conv.last_message && conv.last_message.toLowerCase().includes(searchTerm.toLowerCase()));
      });

  // Handle sending a message
  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !activeConversationId) return;
    
    sendMessage(newMessage);
    setNewMessage("");
  };

  // Get role badge color
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'instructor':
        return "bg-blue-50 text-blue-700 border-blue-200";
      case 'admin':
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-green-50 text-green-700 border-green-200";
    }
  };

  // Get role label
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'instructor':
        return "Instructor";
      case 'admin':
        return "Administrador";
      default:
        return "Estudiante";
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-4 lg:p-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Left panel - Conversations */}
          <Card className="md:w-1/3 lg:w-1/4 flex flex-col h-[calc(100vh-130px)]">
            <CardHeader className="px-4 py-3 flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-xl">Centro de Mensajes</CardTitle>
                <CardDescription>Tus conversaciones</CardDescription>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setShowNewMessageDialog(true)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Nuevo mensaje</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardHeader>

            <div className="px-4 pb-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar conversaciones..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <Tabs defaultValue="all" className="px-4 pt-1">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="unread">
                  No leídos
                  {conversations.reduce((count, conv) => count + conv.unread_count, 0) > 0 && (
                    <Badge className="ml-1.5" variant="secondary">
                      {conversations.reduce((count, conv) => count + conv.unread_count, 0)}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="archived">Archivados</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <CardContent className="flex-1 p-0 overflow-hidden">
              <ScrollArea className="h-full">
                {isLoadingConversations ? (
                  <div className="p-8 flex flex-col items-center justify-center text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin mb-2" />
                    <p>Cargando conversaciones...</p>
                  </div>
                ) : filteredConversations.length > 0 ? (
                  <div className="px-2 py-1">
                    {filteredConversations.map((conversation) => {
                      const displayData = getConversationDisplayData(conversation);
                      
                      return (
                        <div 
                          key={conversation.id}
                          className={cn(
                            "p-3 rounded-lg mb-1 cursor-pointer transition-colors hover:bg-accent",
                            activeConversationId === conversation.id && "bg-primary/10"
                          )}
                          onClick={() => setActiveConversationId(conversation.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar>
                                {displayData.avatar ? (
                                  <AvatarImage src={displayData.avatar} alt={displayData.name} />
                                ) : (
                                  <AvatarFallback>
                                    {displayData.isGroup ? (
                                      <Users className="h-4 w-4" />
                                    ) : (
                                      displayData.name.charAt(0)
                                    )}
                                  </AvatarFallback>
                                )}
                              </Avatar>
                              {displayData.isOnline && !displayData.isGroup && (
                                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h3 className={cn(
                                  "font-medium truncate",
                                  conversation.unread_count > 0 && "font-semibold"
                                )}>
                                  {displayData.name}
                                </h3>
                                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                  {formatConversationTime(conversation.last_message_time || conversation.updated_at)}
                                </span>
                              </div>
                              
                              {!displayData.isGroup && displayData.role && (
                                <div className="flex items-center gap-1 my-0.5">
                                  <Badge variant="outline" className={cn(
                                    "text-xs py-0 px-1 h-4",
                                    getRoleBadgeColor(displayData.role)
                                  )}>
                                    {getRoleLabel(displayData.role)}
                                  </Badge>
                                </div>
                              )}
                              
                              <p className={cn(
                                "text-sm truncate", 
                                conversation.unread_count > 0 
                                  ? "text-foreground font-medium" 
                                  : "text-muted-foreground"
                              )}>
                                {conversation.last_message || 'Nueva conversación'}
                              </p>
                            </div>
                            
                            {conversation.unread_count > 0 && (
                              <Badge>{conversation.unread_count}</Badge>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 flex flex-col items-center justify-center text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mb-3 opacity-20" />
                    {searchTerm ? (
                      <p>No se encontraron conversaciones con "{searchTerm}"</p>
                    ) : (
                      <>
                        <p className="text-center mb-2">No tienes conversaciones aún</p>
                        <Button 
                          variant="outline" 
                          onClick={() => setShowNewMessageDialog(true)}
                          className="mt-2"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Iniciar una conversación
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
          
          {/* Right panel - Active conversation */}
          <Card className="flex-1 flex flex-col h-[calc(100vh-130px)]">
            {activeConversation ? (
              <>
                <CardHeader className="px-4 py-3 flex flex-row items-center justify-between space-y-0">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      {(() => {
                        const displayData = getConversationDisplayData(activeConversation);
                        if (displayData.avatar) {
                          return <AvatarImage src={displayData.avatar} alt={displayData.name} />;
                        } else {
                          return (
                            <AvatarFallback>
                              {displayData.isGroup ? (
                                <Users className="h-4 w-4" />
                              ) : (
                                displayData.name.charAt(0)
                              )}
                            </AvatarFallback>
                          );
                        }
                      })()}
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base font-medium">
                          {getConversationDisplayData(activeConversation).name}
                        </CardTitle>
                        
                        {getConversationDisplayData(activeConversation).isOnline && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs font-normal">
                            En línea
                          </Badge>
                        )}
                      </div>
                      
                      {!getConversationDisplayData(activeConversation).isGroup && 
                        getConversationDisplayData(activeConversation).role && (
                        <Badge variant="outline" className={cn(
                          "text-xs",
                          getRoleBadgeColor(getConversationDisplayData(activeConversation).role || '')
                        )}>
                          {getRoleLabel(getConversationDisplayData(activeConversation).role || '')}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="hidden md:flex">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Llamada de voz</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="hidden md:flex">
                            <Video className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Videollamada</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <InfoIcon className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Información</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          <span>Ver perfil</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center">
                          <Archive className="h-4 w-4 mr-2" />
                          <span>Archivar conversación</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center">
                          <BellOff className="h-4 w-4 mr-2" />
                          <span>Silenciar conversación</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex items-center text-red-500">
                          <Trash2 className="h-4 w-4 mr-2" />
                          <span>Eliminar conversación</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                
                <Separator />
                
                <CardContent className="flex-1 p-0 flex flex-col">
                  <ScrollArea className="flex-1 p-4">
                    {isLoadingMessages ? (
                      <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin mb-2" />
                        <p>Cargando mensajes...</p>
                      </div>
                    ) : messages.length > 0 ? (
                      <div className="space-y-4">
                        {messages.map((message, index) => {
                          const isCurrentUser = message.sender_id === user?.id;
                          const showAvatar = !isCurrentUser && 
                            (index === 0 || messages[index - 1].sender_id !== message.sender_id);
                            
                          return (
                            <div 
                              key={message.id}
                              className={cn(
                                "flex items-end gap-2",
                                isCurrentUser ? "justify-end" : "justify-start"
                              )}
                            >
                              {!isCurrentUser && showAvatar ? (
                                <Avatar className="h-8 w-8">
                                  {message.sender?.avatar_url ? (
                                    <AvatarImage src={message.sender.avatar_url} alt={message.sender.full_name} />
                                  ) : (
                                    <AvatarFallback>{message.sender?.full_name.charAt(0) || '?'}</AvatarFallback>
                                  )}
                                </Avatar>
                              ) : !isCurrentUser ? (
                                <div className="w-8" />
                              ) : null}
                              
                              <div 
                                className={cn(
                                  "max-w-[75%] rounded-lg px-3 py-2",
                                  isCurrentUser 
                                    ? "bg-primary text-primary-foreground" 
                                    : "bg-muted"
                                )}
                              >
                                {!isCurrentUser && showAvatar && (
                                  <p className="text-xs font-medium mb-1">
                                    {message.sender?.full_name}
                                  </p>
                                )}
                                <p className="whitespace-pre-wrap break-words">{message.content}</p>
                                <div className={cn(
                                  "text-xs mt-1",
                                  isCurrentUser 
                                    ? "text-primary-foreground/80" 
                                    : "text-muted-foreground"
                                )}>
                                  {formatMessageTime(message.created_at)}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <div ref={messageEndRef} />
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                        <MessageSquare className="h-12 w-12 mb-3 opacity-20" />
                        <p className="text-center">No hay mensajes aún.</p>
                        <p className="text-center text-sm">¡Envía el primer mensaje!</p>
                      </div>
                    )}
                  </ScrollArea>
                  
                  <div className="p-4 border-t bg-card">
                    <div className="relative">
                      <Input
                        ref={inputRef}
                        placeholder="Escribe un mensaje..."
                        className="pr-32"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <div className="absolute right-1 top-1 flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Image className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <SmilePlus className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={handleSendMessage} 
                          className="h-8"
                          disabled={newMessage.trim() === '' || isSending}
                        >
                          {isSending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
                <MessageSquare className="h-16 w-16 mb-4 opacity-20" />
                <h3 className="text-xl font-medium mb-2">Centro de Mensajes</h3>
                <p className="max-w-sm mb-6">
                  Selecciona una conversación existente o inicia una nueva para comenzar a chatear.
                </p>
                <Button 
                  onClick={() => setShowNewMessageDialog(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Iniciar nueva conversación
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* New Message Dialog */}
      <Dialog open={showNewMessageDialog} onOpenChange={setShowNewMessageDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nueva conversación</DialogTitle>
            <DialogDescription>
              Inicia una conversación con otros usuarios o crea un grupo.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center space-x-2 my-2">
            <div className="grid flex-1 gap-2">
              <Input
                placeholder="Buscar usuarios por nombre o correo..."
                className="w-full"
              />
            </div>
            <Button variant="outline" className="flex gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Grupo</span>
            </Button>
          </div>
          
          <div className="max-h-[200px] overflow-y-auto my-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent cursor-pointer">
                <Avatar>
                  <AvatarImage src="/lovable-uploads/69a3f68a-63d6-4fa4-a8aa-9cd3023f201a.png" />
                  <AvatarFallback>ML</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">María López</p>
                  <p className="text-sm text-muted-foreground">Estudiante</p>
                </div>
                <Button size="sm" variant="ghost">
                  <Check className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent cursor-pointer">
                <Avatar>
                  <AvatarFallback>CH</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">Carlos Hernández</p>
                  <p className="text-sm text-muted-foreground">Instructor</p>
                </div>
                <Button size="sm" variant="ghost">
                  <Check className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent cursor-pointer">
                <Avatar>
                  <AvatarFallback>ST</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">Soporte Técnico</p>
                  <p className="text-sm text-muted-foreground">Admin</p>
                </div>
                <Button size="sm" variant="ghost">
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Input 
              placeholder="Mensaje inicial (opcional)" 
              className="w-full"
            />
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setShowNewMessageDialog(false)}>
              Cancelar
            </Button>
            <Button>
              Iniciar conversación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Messages;

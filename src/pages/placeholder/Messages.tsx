
import React, { useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageSquare, Search, Filter, Check, User, MoreHorizontal, Send, Image, Paperclip, SmilePlus } from "lucide-react";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Datos simulados para la aplicación de mensajes
const conversations = [
  {
    id: "conv1",
    user: {
      name: "María López",
      avatar: "/lovable-uploads/69a3f68a-63d6-4fa4-a8aa-9cd3023f201a.png",
      online: true
    },
    lastMessage: "¿Cuándo estará disponible el nuevo curso de diseño?",
    time: "Hace 5 min",
    unread: 2,
  },
  {
    id: "conv2",
    user: {
      name: "Juan Perez",
      avatar: null,
      online: true
    },
    lastMessage: "Acabo de revisar el material, está muy completo.",
    time: "Hace 30 min",
    unread: 0,
  },
  {
    id: "conv3",
    user: {
      name: "Soporte Técnico",
      avatar: null,
      online: true
    },
    lastMessage: "Hemos solucionado el problema de acceso a tu cuenta.",
    time: "Ayer",
    unread: 1,
  },
  {
    id: "conv4",
    user: {
      name: "Departamento Académico",
      avatar: null,
      online: false
    },
    lastMessage: "Tu certificado del curso está listo para descargar.",
    time: "Hace 2 días",
    unread: 0,
  },
  {
    id: "conv5",
    user: {
      name: "Carlos Rodríguez",
      avatar: null,
      online: false
    },
    lastMessage: "Gracias por la información sobre las becas.",
    time: "Hace 5 días",
    unread: 0,
  },
];

// Mensajes para la conversación activa
const activeConversationMessages = [
  {
    id: "msg1",
    sender: "user",
    text: "Hola María, ¿en qué puedo ayudarte?",
    time: "10:30"
  },
  {
    id: "msg2",
    sender: "other",
    text: "Hola, estoy interesada en el curso de diseño UX/UI que mencionaste en el anuncio.",
    time: "10:32"
  },
  {
    id: "msg3",
    sender: "user",
    text: "Claro, el curso de Diseño UX/UI Avanzado estará disponible a partir del próximo mes.",
    time: "10:35"
  },
  {
    id: "msg4",
    sender: "other",
    text: "¿Cuándo estará disponible el nuevo curso de diseño? Me gustaría matricularme lo antes posible.",
    time: "10:38"
  },
  {
    id: "msg5",
    sender: "user",
    text: "Estamos ultimando los detalles. Te puedo inscribir en la lista de espera y recibirás un 15% de descuento cuando se lance.",
    time: "10:40"
  },
];

const Messages: React.FC = () => {
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");

  // Filtrar conversaciones por término de búsqueda
  const filteredConversations = searchTerm.trim() === ""
    ? conversations
    : conversations.filter(conv => 
        conv.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
      );

  // Manejar envío de mensajes
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    // Aquí se implementaría la lógica para enviar el mensaje
    console.log("Enviando mensaje:", newMessage);
    
    // Limpiar campo de texto
    setNewMessage("");
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Centro de Mensajes</h1>
          <Button variant="outline" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Nuevo mensaje
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel de conversaciones */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Conversaciones</CardTitle>
                <Badge variant="outline">{conversations.filter(c => c.unread > 0).length}</Badge>
              </div>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar conversaciones..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="px-0 py-0">
              <Tabs defaultValue="all" className="px-4 pt-2">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">Todos</TabsTrigger>
                  <TabsTrigger value="unread" className="flex-1">No leídos</TabsTrigger>
                  <TabsTrigger value="archived" className="flex-1">Archivados</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <ScrollArea className="h-[calc(100vh-340px)]">
                {filteredConversations.length > 0 ? (
                  <div className="px-4 pt-2">
                    {filteredConversations.map((conv) => (
                      <div 
                        key={conv.id}
                        className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                          activeConversation.id === conv.id 
                            ? "bg-primary/10" 
                            : "hover:bg-accent"
                        }`}
                        onClick={() => setActiveConversation(conv)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar>
                              {conv.user.avatar ? (
                                <AvatarImage src={conv.user.avatar} alt={conv.user.name} />
                              ) : (
                                <AvatarFallback>{conv.user.name.charAt(0)}</AvatarFallback>
                              )}
                            </Avatar>
                            {conv.user.online && (
                              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium truncate">{conv.user.name}</h3>
                              <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{conv.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                          </div>
                          {conv.unread > 0 && (
                            <Badge className="ml-2">{conv.unread}</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center text-muted-foreground">
                    No se encontraron conversaciones.
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
          
          {/* Panel de mensajes */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  {activeConversation.user.avatar ? (
                    <AvatarImage src={activeConversation.user.avatar} alt={activeConversation.user.name} />
                  ) : (
                    <AvatarFallback>{activeConversation.user.name.charAt(0)}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {activeConversation.user.name}
                    {activeConversation.user.online && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs font-normal">
                        En línea
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>Última actividad: {activeConversation.time}</CardDescription>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <User className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Marcar como leído</DropdownMenuItem>
                    <DropdownMenuItem>Archivar conversación</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">Eliminar conversación</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="px-0 pt-0">
              <ScrollArea className="h-[calc(100vh-350px)] px-4 py-4">
                <div className="space-y-4">
                  {activeConversationMessages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] px-4 py-2 rounded-lg ${
                          message.sender === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}
                      >
                        <p>{message.text}</p>
                        <div className={`text-xs mt-1 ${
                          message.sender === 'user' 
                            ? 'text-primary-foreground/80' 
                            : 'text-muted-foreground'
                        }`}>
                          {message.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t">
                <div className="relative">
                  <Input
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
                    <Button size="sm" onClick={handleSendMessage} className="h-8">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Messages;


import React, { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  Image,
  File,
  Smile,
  MicIcon,
  PlusCircle
} from 'lucide-react';

interface MessageUser {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
}

interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

// Mock data for contacts
const contacts: MessageUser[] = [
  {
    id: 'u1',
    name: 'María García',
    avatar: 'https://i.pravatar.cc/150?img=1',
    status: 'online',
    lastMessage: 'Hola, ¿viste mi último mensaje?',
    lastMessageTime: '10:45',
    unread: 2
  },
  {
    id: 'u2',
    name: 'José Rodríguez',
    avatar: 'https://i.pravatar.cc/150?img=3',
    status: 'offline',
    lastMessage: 'Gracias por la información',
    lastMessageTime: 'Ayer',
    unread: 0
  },
  {
    id: 'u3',
    name: 'Ana Martínez',
    avatar: 'https://i.pravatar.cc/150?img=5',
    status: 'online',
    lastMessage: 'Te envío el enlace del recurso',
    lastMessageTime: '08:32',
    unread: 1
  },
  {
    id: 'u4',
    name: 'Carlos López',
    avatar: 'https://i.pravatar.cc/150?img=8',
    status: 'away',
    lastMessage: 'Mañana continuamos con la revisión',
    lastMessageTime: 'Mar',
    unread: 0
  },
  {
    id: 'u5',
    name: 'Laura Fernández',
    avatar: 'https://i.pravatar.cc/150?img=9',
    status: 'online',
    lastMessage: '¿Qué te pareció el curso?',
    lastMessageTime: 'Lun',
    unread: 0
  },
  {
    id: 'u6',
    name: 'Miguel Sánchez',
    avatar: 'https://i.pravatar.cc/150?img=12',
    status: 'offline',
    lastMessage: 'Necesito ayuda con el ejercicio 3',
    lastMessageTime: '30 Mar',
    unread: 0
  },
  {
    id: 'u7',
    name: 'Sofía Gómez',
    avatar: 'https://i.pravatar.cc/150?img=20',
    status: 'away',
    lastMessage: 'Ya revisé tu proyecto. Buen trabajo',
    lastMessageTime: '28 Mar',
    unread: 0
  }
];

// Mock data for conversation
const conversation: Message[] = [
  {
    id: 'm1',
    userId: 'u1',
    content: 'Hola, ¿cómo estás?',
    timestamp: '10:30',
    isOwn: false
  },
  {
    id: 'm2',
    userId: 'current',
    content: 'Todo bien, gracias. ¿Y tú?',
    timestamp: '10:32',
    isOwn: true,
    status: 'read'
  },
  {
    id: 'm3',
    userId: 'u1',
    content: 'Muy bien. Oye, quería preguntarte sobre el curso de React. ¿Lo recomendarías? Estoy pensando en inscribirme.',
    timestamp: '10:35',
    isOwn: false
  },
  {
    id: 'm4',
    userId: 'current',
    content: 'Definitivamente lo recomendaría. El instructor explica muy bien y los proyectos prácticos son muy útiles.',
    timestamp: '10:38',
    isOwn: true,
    status: 'read'
  },
  {
    id: 'm5',
    userId: 'u1',
    content: '¡Genial! Gracias por la recomendación.',
    timestamp: '10:40',
    isOwn: false
  },
  {
    id: 'm6',
    userId: 'u1',
    content: 'Una cosa más, ¿cuánto tiempo te tomó completarlo?',
    timestamp: '10:42',
    isOwn: false
  },
  {
    id: 'm7',
    userId: 'current',
    content: 'Me tomó unas 3 semanas, dedicando 1-2 horas diarias. Vale la pena la inversión de tiempo.',
    timestamp: '10:43',
    isOwn: true,
    status: 'read'
  },
  {
    id: 'm8',
    userId: 'u1',
    content: 'Perfecto, creo que me inscribiré hoy mismo. ¿Viste mi último mensaje con el enlace al repositorio?',
    timestamp: '10:45',
    isOwn: false
  }
];

const Messages: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<MessageUser | null>(contacts[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  
  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    alert('Funcionalidad en desarrollo: Enviar "' + newMessage + '"');
    setNewMessage('');
  };
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row h-[calc(100vh-200px)] rounded-lg border overflow-hidden">
        {/* Left sidebar - Contacts */}
        <div className="w-full md:w-80 flex-shrink-0 border-r">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Buscar contactos..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {filteredContacts.map(contact => (
                <div 
                  key={contact.id}
                  className={`p-3 flex gap-3 items-center cursor-pointer hover:bg-muted transition-colors ${selectedContact?.id === contact.id ? 'bg-muted' : ''}`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${
                      contact.status === 'online' ? 'bg-green-500' : 
                      contact.status === 'away' ? 'bg-amber-500' : 'bg-gray-300'
                    } border-2 border-background`}></span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium truncate">{contact.name}</h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{contact.lastMessageTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                      {contact.unread > 0 && (
                        <Badge variant="default" className="ml-2">{contact.unread}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredContacts.length === 0 && (
                <div className="p-4 text-center text-muted-foreground">
                  No se encontraron contactos
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Right side - Conversation */}
        {selectedContact ? (
          <div className="flex-1 flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <Avatar>
                  <AvatarImage src={selectedContact.avatar} />
                  <AvatarFallback>{selectedContact.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-medium">{selectedContact.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {selectedContact.status === 'online' ? 'En línea' : 
                     selectedContact.status === 'away' ? 'Ausente' : 'Desconectado'}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              <div className="text-center">
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  Hoy
                </Badge>
              </div>
              
              {conversation.map(message => (
                <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] ${message.isOwn ? 'bg-primary text-primary-foreground' : 'bg-muted'} p-3 rounded-lg`}>
                    <p className="text-sm">{message.content}</p>
                    <div className="flex justify-end items-center gap-1 mt-1">
                      <span className="text-xs opacity-70">{message.timestamp}</span>
                      {message.isOwn && message.status === 'read' && (
                        <span className="text-xs text-blue-400">✓✓</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message Input */}
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
                <Button type="button" variant="ghost" size="icon">
                  <PlusCircle className="h-5 w-5" />
                </Button>
                <Button type="button" variant="ghost" size="icon">
                  <Image className="h-5 w-5" />
                </Button>
                <Button type="button" variant="ghost" size="icon">
                  <File className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Escribe un mensaje..."
                  className="flex-1"
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                />
                <Button type="button" variant="ghost" size="icon">
                  <Smile className="h-5 w-5" />
                </Button>
                <Button type="button" variant="ghost" size="icon">
                  <MicIcon className="h-5 w-5" />
                </Button>
                <Button type="submit" disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-6">
              <h2 className="text-xl font-bold mb-2">Selecciona un contacto</h2>
              <p className="text-muted-foreground">Elige un contacto para iniciar una conversación</p>
            </div>
          </div>
        )}
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Mensajería en Nexo Learning</CardTitle>
          <CardDescription>
            Sistema de mensajería para comunicación entre estudiantes e instructores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              Este sistema de mensajería te permite comunicarte con tus instructores y compañeros de curso.
              Puedes enviar mensajes de texto, imágenes y archivos.
            </p>
            
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2">Funcionalidades disponibles:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Mensajes en tiempo real</li>
                <li>Indicadores de estado (en línea, ausente, desconectado)</li>
                <li>Confirmación de lectura</li>
                <li>Búsqueda de contactos</li>
              </ul>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2">Próximamente:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Videollamadas</li>
                <li>Llamadas de voz</li>
                <li>Grupos de conversación</li>
                <li>Compartir pantalla</li>
              </ul>
            </div>
            
            <div className="text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 p-4 rounded-lg flex items-start gap-2">
              <span className="font-medium">Nota:</span>
              <span>Esta es una versión de demostración. La funcionalidad completa estará disponible próximamente.</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Messages;


import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenuItem, 
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu';
import { Phone, MessageCircle, Headphones } from 'lucide-react';

const ContactButtons: React.FC = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>
        <Phone className="h-4 w-4 mr-2" />
        Contacto
      </NavigationMenuTrigger>
      <NavigationMenuContent className="min-w-[220px]">
        <div className="p-2 grid gap-1">
          <Button 
            variant="ghost"
            className="flex justify-start hover:bg-accent"
            onClick={() => window.open('https://wa.me/123456789', '_blank')}
          >
            <div className="flex items-center gap-2 p-2">
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </div>
          </Button>
          <Button 
            variant="ghost"
            className="flex justify-start hover:bg-accent"
            onClick={() => {
              alert('Voice bot activado');
            }}
          >
            <div className="flex items-center gap-2 p-2">
              <Headphones className="h-4 w-4" />
              <span>Voice Bot</span>
            </div>
          </Button>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default ContactButtons;

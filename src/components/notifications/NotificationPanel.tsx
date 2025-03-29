
import React from 'react';
import { 
  BellRing, 
  Check, 
  ChevronRight, 
  Sparkles, 
  MessageSquare, 
  Trophy,
  Bell,
  Info,
  RefreshCw
} from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { Notification } from '@/types/notifications';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { format, isToday, isYesterday } from 'date-fns';
import { es } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

interface NotificationPanelProps {
  onClose?: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
  const { 
    notifications, 
    isLoading, 
    markAsRead, 
    markAllAsRead,
    refreshNotifications
  } = useNotifications();
  const navigate = useNavigate();

  const getIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'course_completed':
        return <Trophy className="h-4 w-4 text-amber-500" />;
      case 'announcement':
        return <BellRing className="h-4 w-4 text-purple-500" />;
      case 'achievement':
        return <Sparkles className="h-4 w-4 text-emerald-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const formatDate = (date: string) => {
    const notificationDate = new Date(date);
    
    if (isToday(notificationDate)) {
      return `Hoy, ${format(notificationDate, 'HH:mm')}`;
    } else if (isYesterday(notificationDate)) {
      return `Ayer, ${format(notificationDate, 'HH:mm')}`;
    } else {
      return format(notificationDate, 'dd MMM, HH:mm', { locale: es });
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    
    if (notification.action_url) {
      navigate(notification.action_url);
      if (onClose) onClose();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h3 className="font-medium">Notificaciones</h3>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={refreshNotifications}
            disabled={isLoading}
          >
            <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
            <span className="sr-only">Actualizar</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={markAllAsRead}
            className="text-xs"
          >
            Marcar todo como leído
          </Button>
        </div>
      </div>
      
      <ScrollArea className="max-h-[400px] overflow-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
            <Bell className="h-10 w-10 mb-2 opacity-20" />
            <p>No tienes notificaciones</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex flex-col">
                <button
                  onClick={() => handleNotificationClick(notification)}
                  className={cn(
                    "flex items-center gap-3 p-3 hover:bg-accent/50 transition-colors",
                    !notification.is_read && "bg-accent/30"
                  )}
                >
                  <div className="flex-shrink-0">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex flex-col items-start flex-1 min-w-0">
                    <p className={cn(
                      "text-sm",
                      !notification.is_read && "font-medium"
                    )}>
                      {notification.title}
                    </p>
                    {notification.content && (
                      <p className="text-xs text-muted-foreground truncate w-full text-left">
                        {notification.content}
                      </p>
                    )}
                    <span className="text-xs text-muted-foreground mt-1">
                      {formatDate(notification.created_at)}
                    </span>
                  </div>
                  {notification.action_url && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                  {!notification.is_read && (
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </button>
                <Separator />
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
      <div className="p-2 border-t text-center">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs w-full"
          onClick={() => {
            navigate('/notifications');
            if (onClose) onClose();
          }}
        >
          Ver todas las notificaciones
        </Button>
      </div>
    </div>
  );
};

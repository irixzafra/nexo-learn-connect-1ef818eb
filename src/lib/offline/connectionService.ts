
// Servicio para detectar cambios en la conexión a internet
import { toast } from 'sonner';

type ConnectionListener = (online: boolean) => void;

class ConnectionService {
  private listeners: ConnectionListener[] = [];
  private isOnline: boolean;

  constructor() {
    this.isOnline = navigator.onLine;
    this.setupEventListeners();
  }

  private setupEventListeners() {
    window.addEventListener('online', () => this.handleConnectionChange(true));
    window.addEventListener('offline', () => this.handleConnectionChange(false));
  }

  private handleConnectionChange(online: boolean) {
    if (this.isOnline === online) return;
    
    this.isOnline = online;
    
    // Notificar al usuario
    if (online) {
      toast.success('Conexión restablecida', {
        description: 'Los datos se sincronizarán automáticamente'
      });
    } else {
      toast.warning('Sin conexión', {
        description: 'Modo offline activado. Algunas funciones pueden estar limitadas.'
      });
    }
    
    // Notificar a todos los listeners
    this.listeners.forEach(listener => listener(online));
  }

  public addListener(listener: ConnectionListener) {
    this.listeners.push(listener);
    return () => this.removeListener(listener);
  }

  public removeListener(listener: ConnectionListener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  public isCurrentlyOnline(): boolean {
    return this.isOnline;
  }
}

// Singleton para asegurar una única instancia del servicio
export const connectionService = new ConnectionService();

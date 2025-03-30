
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const SHORTCUTS = [
  { key: 'h', route: '/home', description: 'Ir a Inicio' },
  { key: 'c', route: '/courses', description: 'Ir a Cursos' },
  { key: 'p', route: '/profile', description: 'Ir a Perfil' },
  { key: 'm', route: '/messages', description: 'Ir a Mensajes' },
  { key: 's', route: '/settings', description: 'Ir a Configuración' },
  { key: 'a', route: '/about-us', description: 'Ir a Acerca de Nosotros' },
  { key: 'e', route: '/help', description: 'Ir a Ayuda' },
];

export const KeyboardShortcuts: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignorar atajos cuando se está escribiendo en un campo
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement ||
        (event.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      // Activar solo si Alt (Option) está presionado
      if (event.altKey) {
        const shortcut = SHORTCUTS.find(s => s.key === event.key.toLowerCase());
        
        if (shortcut) {
          event.preventDefault();
          navigate(shortcut.route);
          toast.info(`Navegación: ${shortcut.description}`);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  return null; // Componente sin renderizado visual
};

export const KeyboardShortcutsHelp: React.FC = () => {
  return (
    <div className="p-4 bg-card border rounded-lg shadow-sm" role="region" aria-label="Atajos de teclado">
      <h3 className="text-lg font-medium mb-4">Atajos de teclado (Alt + Tecla)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {SHORTCUTS.map((shortcut) => (
          <div key={shortcut.key} className="flex items-center gap-2">
            <kbd className="px-2 py-1 text-xs font-semibold bg-muted border rounded">
              Alt + {shortcut.key.toUpperCase()}
            </kbd>
            <span>{shortcut.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

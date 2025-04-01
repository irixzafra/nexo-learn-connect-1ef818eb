
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useLocalization } from '@/hooks/useLocalization';
import { useFeature } from '@/hooks/useFeatures';
import { useAccessibility } from '@/hooks/useAccessibility';

interface ShortcutDefinition {
  key: string;
  route: string;
  descriptionKey: string;
  defaultDescription: string;
}

export const KeyboardShortcuts: React.FC = () => {
  const navigate = useNavigate();
  const { t, localizeUrl } = useLocalization();
  const isAccessibilityEnabled = useFeature('enableContextualHelp');
  const { isScreenReaderOptimized } = useAccessibility();

  useEffect(() => {
    if (!isAccessibilityEnabled) return;

    const SHORTCUTS: ShortcutDefinition[] = [
      { key: 'h', route: '/home', descriptionKey: 'shortcuts.home', defaultDescription: 'Go to Home' },
      { key: 'c', route: '/courses', descriptionKey: 'shortcuts.courses', defaultDescription: 'Go to Courses' },
      { key: 'p', route: '/profile', descriptionKey: 'shortcuts.profile', defaultDescription: 'Go to Profile' },
      { key: 'm', route: '/messages', descriptionKey: 'shortcuts.messages', defaultDescription: 'Go to Messages' },
      { key: 's', route: '/settings', descriptionKey: 'shortcuts.settings', defaultDescription: 'Go to Settings' },
      { key: 'a', route: '/about-us', descriptionKey: 'shortcuts.about', defaultDescription: 'Go to About Us' },
      { key: 'e', route: '/help', descriptionKey: 'shortcuts.help', defaultDescription: 'Go to Help' },
      { key: 'k', route: '/keyboard-shortcuts', descriptionKey: 'shortcuts.keyboard', defaultDescription: 'View Keyboard Shortcuts' },
    ];

    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore when typing in a form field
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement ||
        (event.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      // Activate only if Alt (Option) is pressed
      if (event.altKey) {
        const shortcut = SHORTCUTS.find(s => s.key === event.key.toLowerCase());
        
        if (shortcut) {
          event.preventDefault();
          // Use localized URL with current language prefix
          navigate(localizeUrl(shortcut.route));
          toast.info(t(shortcut.descriptionKey, { default: shortcut.defaultDescription }));
          
          // Announce to screen readers if that optimization is enabled
          if (isScreenReaderOptimized) {
            const announcement = document.createElement('div');
            announcement.setAttribute('role', 'status');
            announcement.setAttribute('aria-live', 'assertive');
            announcement.classList.add('sr-only');
            announcement.textContent = t(shortcut.descriptionKey, { default: shortcut.defaultDescription });
            document.body.appendChild(announcement);
            
            // Remove after announcement
            setTimeout(() => {
              document.body.removeChild(announcement);
            }, 1000);
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, t, localizeUrl, isAccessibilityEnabled, isScreenReaderOptimized]);

  return null; // Component has no visual representation
};

export const KeyboardShortcutsHelp: React.FC = () => {
  const { t } = useLocalization();
  
  const SHORTCUTS = [
    { key: 'h', descriptionKey: 'shortcuts.home', defaultDescription: 'Go to Home' },
    { key: 'c', descriptionKey: 'shortcuts.courses', defaultDescription: 'Go to Courses' },
    { key: 'p', descriptionKey: 'shortcuts.profile', defaultDescription: 'Go to Profile' },
    { key: 'm', descriptionKey: 'shortcuts.messages', defaultDescription: 'Go to Messages' },
    { key: 's', descriptionKey: 'shortcuts.settings', defaultDescription: 'Go to Settings' },
    { key: 'a', descriptionKey: 'shortcuts.about', defaultDescription: 'Go to About Us' },
    { key: 'e', descriptionKey: 'shortcuts.help', defaultDescription: 'Go to Help' },
    { key: 'k', descriptionKey: 'shortcuts.keyboard', defaultDescription: 'View Keyboard Shortcuts' },
  ];

  return (
    <div className="p-4 bg-card border rounded-lg shadow-sm" role="region" aria-label={t('accessibility.keyboardShortcuts', { default: 'Keyboard Shortcuts' })}>
      <h3 className="text-lg font-medium mb-4">
        {t('accessibility.keyboardShortcutsAlt', { default: 'Keyboard Shortcuts (Alt + Key)' })}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {SHORTCUTS.map((shortcut) => (
          <div key={shortcut.key} className="flex items-center gap-2">
            <kbd className="px-2 py-1 text-xs font-semibold bg-muted border rounded">
              Alt + {shortcut.key.toUpperCase()}
            </kbd>
            <span>{t(shortcut.descriptionKey, { default: shortcut.defaultDescription })}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

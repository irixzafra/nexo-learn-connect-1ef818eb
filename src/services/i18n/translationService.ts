
import { SupportedLanguage, FALLBACK_LANGUAGE } from '@/contexts/LanguageContext';

// Type for translation messages
export type TranslationMessages = Record<string, string>;

// Type for all translations
export type Translations = Record<SupportedLanguage, TranslationMessages>;

// Initial translations
const translations: Translations = {
  es: {
    // General
    'app.name': 'Nexo Learning',
    'app.tagline': 'Plataforma de aprendizaje en línea',
    
    // Navigation
    'nav.home': 'Inicio',
    'nav.courses': 'Cursos',
    'nav.my_courses': 'Mis Cursos',
    'nav.profile': 'Perfil',
    'nav.settings': 'Configuración',
    'nav.admin': 'Administración',
    'nav.community': 'Comunidad',
    'nav.logout': 'Cerrar Sesión',
    'nav.messages': 'Mensajes',
    'nav.notifications': 'Notificaciones',
    
    // SEO
    'seo.homepage.title': 'Nexo Learning - Plataforma de aprendizaje en línea',
    'seo.homepage.description': 'Nexo Learning es una plataforma de aprendizaje en línea que te permite aprender habilidades valiosas a tu propio ritmo.',
    
    // Auth
    'auth.login': 'Iniciar Sesión',
    'auth.register': 'Registrarse',
    'auth.forgot_password': 'Olvidé mi contraseña',
    'auth.email': 'Correo electrónico',
    'auth.password': 'Contraseña',
    'auth.confirm_password': 'Confirmar contraseña',
    'auth.name': 'Nombre',
    
    // UI Components
    'ui.save': 'Guardar',
    'ui.cancel': 'Cancelar',
    'ui.delete': 'Eliminar',
    'ui.edit': 'Editar',
    'ui.loading': 'Cargando...',
    'ui.search': 'Buscar',
    'ui.more': 'Ver más',
    'ui.close': 'Cerrar',
    
    // Settings
    'settings.language': 'Idioma',
    'settings.theme': 'Tema',
    'settings.notifications': 'Notificaciones',
    'settings.privacy': 'Privacidad',
    'settings.account': 'Cuenta',
    
    // Languages
    'language.es': 'Español',
    'language.en': 'Inglés',
    'language.pt': 'Portugués',
    'language.fr': 'Francés',
    'language.de': 'Alemán',
    'language.change': 'Cambiar idioma',
    
    // Tooltips
    'tooltip.change_language': 'Cambiar idioma',
    'tooltip.toggle_theme': 'Cambiar tema',
    'tooltip.notifications': 'Notificaciones',
    'tooltip.messages': 'Mensajes',
    
    // Admin
    'admin.dashboard': 'Panel de control',
    'admin.users': 'Usuarios',
    'admin.courses': 'Cursos',
    'admin.settings': 'Configuración del sistema',
    'admin.analytics': 'Analíticas',
    
    // Errors
    'error.generic': 'Ha ocurrido un error',
    'error.not_found': 'Página no encontrada',
    'error.unauthorized': 'No tienes permiso para acceder a esta página',
    
    // Success messages
    'success.saved': 'Guardado correctamente',
    'success.updated': 'Actualizado correctamente',
    'success.deleted': 'Eliminado correctamente'
  },
  
  en: {
    // General
    'app.name': 'Nexo Learning',
    'app.tagline': 'Online Learning Platform',
    
    // Navigation
    'nav.home': 'Home',
    'nav.courses': 'Courses',
    'nav.my_courses': 'My Courses',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.admin': 'Administration',
    'nav.community': 'Community',
    'nav.logout': 'Log Out',
    'nav.messages': 'Messages',
    'nav.notifications': 'Notifications',
    
    // SEO
    'seo.homepage.title': 'Nexo Learning - Online Learning Platform',
    'seo.homepage.description': 'Nexo Learning is an online learning platform that enables you to learn valuable skills at your own pace.',
    
    // Auth
    'auth.login': 'Log In',
    'auth.register': 'Sign Up',
    'auth.forgot_password': 'Forgot Password',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirm_password': 'Confirm Password',
    'auth.name': 'Name',
    
    // UI Components
    'ui.save': 'Save',
    'ui.cancel': 'Cancel',
    'ui.delete': 'Delete',
    'ui.edit': 'Edit',
    'ui.loading': 'Loading...',
    'ui.search': 'Search',
    'ui.more': 'See more',
    'ui.close': 'Close',
    
    // Settings
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    'settings.notifications': 'Notifications',
    'settings.privacy': 'Privacy',
    'settings.account': 'Account',
    
    // Languages
    'language.es': 'Spanish',
    'language.en': 'English',
    'language.pt': 'Portuguese',
    'language.fr': 'French',
    'language.de': 'German',
    'language.change': 'Change language',
    
    // Tooltips
    'tooltip.change_language': 'Change language',
    'tooltip.toggle_theme': 'Toggle theme',
    'tooltip.notifications': 'Notifications',
    'tooltip.messages': 'Messages',
    
    // Admin
    'admin.dashboard': 'Dashboard',
    'admin.users': 'Users',
    'admin.courses': 'Courses',
    'admin.settings': 'System Settings',
    'admin.analytics': 'Analytics',
    
    // Errors
    'error.generic': 'An error has occurred',
    'error.not_found': 'Page not found',
    'error.unauthorized': 'You do not have permission to access this page',
    
    // Success messages
    'success.saved': 'Successfully saved',
    'success.updated': 'Successfully updated',
    'success.deleted': 'Successfully deleted'
  },
  
  pt: {
    // General
    'app.name': 'Nexo Learning',
    'app.tagline': 'Plataforma de Aprendizagem Online',
    
    // Navigation
    'nav.home': 'Início',
    'nav.courses': 'Cursos',
    'nav.my_courses': 'Meus Cursos',
    'nav.profile': 'Perfil',
    'nav.settings': 'Configurações',
    'nav.admin': 'Administração',
    'nav.community': 'Comunidade',
    'nav.logout': 'Sair',
    'nav.messages': 'Mensagens',
    'nav.notifications': 'Notificações',
    
    // SEO
    'seo.homepage.title': 'Nexo Learning - Plataforma de Aprendizagem Online',
    'seo.homepage.description': 'Nexo Learning é uma plataforma de aprendizagem online que permite aprender habilidades valiosas no seu próprio ritmo.',
    
    // Auth
    'auth.login': 'Entrar',
    'auth.register': 'Cadastrar',
    'auth.forgot_password': 'Esqueci minha senha',
    'auth.email': 'Email',
    'auth.password': 'Senha',
    'auth.confirm_password': 'Confirmar senha',
    'auth.name': 'Nome',
    
    // UI Components
    'ui.save': 'Salvar',
    'ui.cancel': 'Cancelar',
    'ui.delete': 'Excluir',
    'ui.edit': 'Editar',
    'ui.loading': 'Carregando...',
    'ui.search': 'Buscar',
    'ui.more': 'Ver mais',
    'ui.close': 'Fechar',
    
    // Settings
    'settings.language': 'Idioma',
    'settings.theme': 'Tema',
    'settings.notifications': 'Notificações',
    'settings.privacy': 'Privacidade',
    'settings.account': 'Conta',
    
    // Languages
    'language.es': 'Espanhol',
    'language.en': 'Inglês',
    'language.pt': 'Português',
    'language.fr': 'Francês',
    'language.de': 'Alemão',
    'language.change': 'Mudar idioma',
    
    // Tooltips
    'tooltip.change_language': 'Mudar idioma',
    'tooltip.toggle_theme': 'Alternar tema',
    'tooltip.notifications': 'Notificações',
    'tooltip.messages': 'Mensagens',
    
    // Admin
    'admin.dashboard': 'Painel de controle',
    'admin.users': 'Usuários',
    'admin.courses': 'Cursos',
    'admin.settings': 'Configurações do sistema',
    'admin.analytics': 'Análises',
    
    // Errors
    'error.generic': 'Ocorreu um erro',
    'error.not_found': 'Página não encontrada',
    'error.unauthorized': 'Você não tem permissão para acessar esta página',
    
    // Success messages
    'success.saved': 'Salvo com sucesso',
    'success.updated': 'Atualizado com sucesso',
    'success.deleted': 'Excluído com sucesso'
  },
  
  fr: {
    // General
    'app.name': 'Nexo Learning',
    'app.tagline': 'Plateforme d\'apprentissage en ligne',
    
    // Navigation
    'nav.home': 'Accueil',
    'nav.courses': 'Cours',
    'nav.my_courses': 'Mes Cours',
    'nav.profile': 'Profil',
    'nav.settings': 'Paramètres',
    'nav.admin': 'Administration',
    'nav.community': 'Communauté',
    'nav.logout': 'Déconnexion',
    'nav.messages': 'Messages',
    'nav.notifications': 'Notifications',
    
    // SEO
    'seo.homepage.title': 'Nexo Learning - Plateforme d\'apprentissage en ligne',
    'seo.homepage.description': 'Nexo Learning est une plateforme d\'apprentissage en ligne qui vous permet d\'acquérir des compétences précieuses à votre propre rythme.',
    
    // Basic set of translations for French
    'auth.login': 'Connexion',
    'auth.register': 'S\'inscrire',
    'language.change': 'Changer de langue',
    'tooltip.change_language': 'Changer de langue'
  },
  
  de: {
    // General
    'app.name': 'Nexo Learning',
    'app.tagline': 'Online-Lernplattform',
    
    // Navigation
    'nav.home': 'Startseite',
    'nav.courses': 'Kurse',
    'nav.my_courses': 'Meine Kurse',
    
    // Basic set of translations for German
    'auth.login': 'Anmelden',
    'auth.register': 'Registrieren',
    'language.change': 'Sprache ändern',
    'tooltip.change_language': 'Sprache ändern'
  }
};

/**
 * Get a translation for a key in the specified language
 * @param key The translation key
 * @param lang The language code
 * @param params Optional parameters to replace in the translation
 * @returns The translated string
 */
export const getTranslation = (
  key: string,
  lang: SupportedLanguage,
  params?: Record<string, string>
): string => {
  // Get the translation from the specified language
  let translation = translations[lang]?.[key];
  
  // If translation doesn't exist in the specified language, fallback to English
  if (!translation && lang !== FALLBACK_LANGUAGE) {
    translation = translations[FALLBACK_LANGUAGE]?.[key];
  }
  
  // If still no translation, return the key itself
  if (!translation) {
    return key;
  }
  
  // Replace any parameters in the translation
  if (params) {
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      translation = translation!.replace(`{{${paramKey}}}`, paramValue);
    });
  }
  
  return translation;
};

/**
 * Add or update translations for a specific language
 * @param lang The language code
 * @param newTranslations The translations to add or update
 */
export const updateTranslations = (
  lang: SupportedLanguage,
  newTranslations: TranslationMessages
): void => {
  translations[lang] = {
    ...translations[lang],
    ...newTranslations
  };
};

/**
 * Get all available translations for a language
 * @param lang The language code
 * @returns The translations for the specified language
 */
export const getLanguageTranslations = (
  lang: SupportedLanguage
): TranslationMessages => {
  return translations[lang] || {};
};

/**
 * Check if a translation key exists in a language
 * @param key The translation key
 * @param lang The language code
 * @returns True if the translation exists
 */
export const hasTranslation = (
  key: string,
  lang: SupportedLanguage
): boolean => {
  return !!translations[lang]?.[key];
};

/**
 * Get all missing translations for a language compared to the fallback language
 * @param lang The language code
 * @returns An array of missing translation keys
 */
export const getMissingTranslations = (
  lang: SupportedLanguage
): string[] => {
  if (lang === FALLBACK_LANGUAGE) {
    return [];
  }
  
  const fallbackKeys = Object.keys(translations[FALLBACK_LANGUAGE] || {});
  const langKeys = Object.keys(translations[lang] || {});
  
  return fallbackKeys.filter(key => !langKeys.includes(key));
};

export default {
  getTranslation,
  updateTranslations,
  getLanguageTranslations,
  hasTranslation,
  getMissingTranslations
};

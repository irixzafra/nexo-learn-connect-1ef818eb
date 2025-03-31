
// Service Worker para caché y funcionalidad offline
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/serviceWorker.js', {
        scope: '/'
      });
      
      console.log('Service Worker registrado correctamente:', registration);
      
      // Detectar actualizaciones del service worker
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        console.log('Instalando nuevo Service Worker:', newWorker);
        
        newWorker?.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('Nueva versión disponible! Actualiza la página para aplicar los cambios.');
          }
        });
      });
      
      return registration;
    } catch (error) {
      console.error('Error al registrar el Service Worker:', error);
      return null;
    }
  } else {
    console.info('Service Worker no es soportado en este navegador');
    return null;
  }
};

// Comprobar actualizaciones del service worker
export const checkForUpdates = async () => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready;
    try {
      await registration.update();
      console.log('Service Worker actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el Service Worker:', error);
    }
  }
};

// Función para borrar caché vieja
export const clearOldCaches = async () => {
  if ('caches' in window) {
    try {
      const cacheNames = await caches.keys();
      const oldCacheNames = cacheNames.filter(name => 
        name.startsWith('nexo-cache-') && 
        !name.includes('v1') // Mantener sólo la versión actual
      );
      
      await Promise.all(oldCacheNames.map(name => caches.delete(name)));
      console.log('Caches antiguas eliminadas correctamente.');
    } catch (error) {
      console.error('Error al limpiar caches antiguas:', error);
    }
  }
};

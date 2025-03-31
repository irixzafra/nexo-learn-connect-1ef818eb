
// Nombre de la caché y versión
const CACHE_NAME = 'nexo-cache-v1';

// Recursos para cachear al inicio
const INITIAL_CACHED_RESOURCES = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/landing'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caché abierta');
        return cache.addAll(INITIAL_CACHED_RESOURCES);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Estrategia de caché: Network First con fallback a Cache
self.addEventListener('fetch', (event) => {
  // No interceptar peticiones a Supabase o analizador
  if (event.request.url.includes('supabase') || 
      event.request.url.includes('analytics') ||
      event.request.url.includes('/auth/')) {
    return;
  }
  
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clonar la respuesta para guardarlo en caché
        const responseClone = response.clone();
        
        // Abrir caché y guardar respuesta
        caches.open(CACHE_NAME)
          .then((cache) => {
            if (event.request.method === 'GET') {
              cache.put(event.request, responseClone);
            }
          });
        
        return response;
      })
      .catch(() => {
        // Si la red falla, intentar servir desde caché
        return caches.match(event.request)
          .then((response) => {
            if (response) {
              return response;
            }
            
            // Si no está en caché y es de tipo navegación, servir página de fallback
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
            
            return new Response('Network error', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Evento para soportar sincronización en segundo plano
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-pending-data') {
    event.waitUntil(syncPendingData());
  }
});

// Función para sincronizar datos pendientes
async function syncPendingData() {
  // Implementación en futuras versiones
  console.log('Sincronizando datos pendientes...');
}

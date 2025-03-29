
// Servicio de IndexedDB para almacenamiento offline
import { Course } from '@/types/course';

// Nombre de la base de datos y versión
const DB_NAME = 'nexoOfflineDB';
const DB_VERSION = 1;

// Nombres de los almacenes de datos
const STORES = {
  COURSES: 'courses',
  MESSAGES: 'messages',
  SYNC_QUEUE: 'syncQueue',
  VIEWED_COURSES: 'viewedCourses',
};

// Inicializar la base de datos
export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('Error al abrir IndexedDB:', event);
      reject('No se pudo abrir la base de datos offline');
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Crear almacenes de datos si no existen
      if (!db.objectStoreNames.contains(STORES.COURSES)) {
        db.createObjectStore(STORES.COURSES, { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains(STORES.MESSAGES)) {
        db.createObjectStore(STORES.MESSAGES, { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains(STORES.SYNC_QUEUE)) {
        db.createObjectStore(STORES.SYNC_QUEUE, { 
          keyPath: 'id', 
          autoIncrement: true 
        });
      }

      if (!db.objectStoreNames.contains(STORES.VIEWED_COURSES)) {
        db.createObjectStore(STORES.VIEWED_COURSES, { 
          keyPath: 'id',
        });
      }
    };
  });
};

// Agregar un curso al almacenamiento offline
export const addCourseToCache = async (course: Course): Promise<void> => {
  try {
    const db = await initDB();
    const tx = db.transaction(STORES.COURSES, 'readwrite');
    const store = tx.objectStore(STORES.COURSES);
    
    await new Promise<void>((resolve, reject) => {
      const request = store.put(course);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    // También añadir a cursos vistos con timestamp
    const viewedTx = db.transaction(STORES.VIEWED_COURSES, 'readwrite');
    const viewedStore = viewedTx.objectStore(STORES.VIEWED_COURSES);
    
    await new Promise<void>((resolve, reject) => {
      const request = viewedStore.put({
        id: course.id,
        timestamp: new Date().toISOString(),
        course_id: course.id
      });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
    
    db.close();
  } catch (error) {
    console.error('Error al guardar curso en caché:', error);
  }
};

// Recuperar cursos del almacenamiento offline
export const getCachedCourses = async (): Promise<Course[]> => {
  try {
    const db = await initDB();
    const tx = db.transaction(STORES.COURSES, 'readonly');
    const store = tx.objectStore(STORES.COURSES);
    
    const courses = await new Promise<Course[]>((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    
    db.close();
    return courses;
  } catch (error) {
    console.error('Error al recuperar cursos de caché:', error);
    return [];
  }
};

// Recuperar curso específico del almacenamiento offline
export const getCachedCourse = async (courseId: string): Promise<Course | null> => {
  try {
    const db = await initDB();
    const tx = db.transaction(STORES.COURSES, 'readonly');
    const store = tx.objectStore(STORES.COURSES);
    
    const course = await new Promise<Course | undefined>((resolve, reject) => {
      const request = store.get(courseId);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    
    db.close();
    return course || null;
  } catch (error) {
    console.error('Error al recuperar curso de caché:', error);
    return null;
  }
};

// Recuperar los últimos cursos vistos
export const getRecentlyViewedCourses = async (limit: number = 5): Promise<Course[]> => {
  try {
    const db = await initDB();
    const viewedTx = db.transaction(STORES.VIEWED_COURSES, 'readonly');
    const viewedStore = viewedTx.objectStore(STORES.VIEWED_COURSES);
    
    const viewedCourses = await new Promise<any[]>((resolve, reject) => {
      const request = viewedStore.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    
    // Ordenar por timestamp más reciente
    viewedCourses.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    // Limitar cantidad y obtener los cursos completos
    const recentIds = viewedCourses.slice(0, limit).map(v => v.id);
    
    const coursesTx = db.transaction(STORES.COURSES, 'readonly');
    const coursesStore = coursesTx.objectStore(STORES.COURSES);
    
    const courses: Course[] = [];
    
    for (const id of recentIds) {
      const course = await new Promise<Course | undefined>((resolve, reject) => {
        const request = coursesStore.get(id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
      
      if (course) {
        courses.push(course);
      }
    }
    
    db.close();
    return courses;
  } catch (error) {
    console.error('Error al recuperar cursos vistos recientemente:', error);
    return [];
  }
};

// Añadir mensaje a la caché
export const addMessageToCache = async (message: any): Promise<void> => {
  try {
    const db = await initDB();
    const tx = db.transaction(STORES.MESSAGES, 'readwrite');
    const store = tx.objectStore(STORES.MESSAGES);
    
    await new Promise<void>((resolve, reject) => {
      const request = store.put(message);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
    
    db.close();
  } catch (error) {
    console.error('Error al guardar mensaje en caché:', error);
  }
};

// Recuperar mensajes de la caché
export const getCachedMessages = async (conversationId: string): Promise<any[]> => {
  try {
    const db = await initDB();
    const tx = db.transaction(STORES.MESSAGES, 'readonly');
    const store = tx.objectStore(STORES.MESSAGES);
    
    const allMessages = await new Promise<any[]>((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    
    db.close();
    
    // Filtrar mensajes por conversationId
    return allMessages.filter(msg => msg.conversation_id === conversationId);
  } catch (error) {
    console.error('Error al recuperar mensajes de caché:', error);
    return [];
  }
};

// Añadir una operación a la cola de sincronización
export const addToSyncQueue = async (operation: {
  type: 'message' | 'course_progress' | 'comment',
  action: 'create' | 'update' | 'delete',
  data: any
}): Promise<void> => {
  try {
    const db = await initDB();
    const tx = db.transaction(STORES.SYNC_QUEUE, 'readwrite');
    const store = tx.objectStore(STORES.SYNC_QUEUE);
    
    const syncItem = {
      ...operation,
      timestamp: new Date().toISOString(),
      synced: false
    };
    
    await new Promise<void>((resolve, reject) => {
      const request = store.add(syncItem);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
    
    db.close();
  } catch (error) {
    console.error('Error al añadir a cola de sincronización:', error);
  }
};

// Obtener operaciones pendientes de sincronización
export const getPendingSyncOperations = async (): Promise<any[]> => {
  try {
    const db = await initDB();
    const tx = db.transaction(STORES.SYNC_QUEUE, 'readonly');
    const store = tx.objectStore(STORES.SYNC_QUEUE);
    
    const operations = await new Promise<any[]>((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    
    db.close();
    return operations.filter(op => !op.synced);
  } catch (error) {
    console.error('Error al recuperar operaciones pendientes:', error);
    return [];
  }
};

// Marcar operación como sincronizada
export const markAsSynced = async (id: number): Promise<void> => {
  try {
    const db = await initDB();
    const tx = db.transaction(STORES.SYNC_QUEUE, 'readwrite');
    const store = tx.objectStore(STORES.SYNC_QUEUE);
    
    const operation = await new Promise<any>((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    
    if (operation) {
      operation.synced = true;
      
      await new Promise<void>((resolve, reject) => {
        const updateRequest = store.put(operation);
        updateRequest.onsuccess = () => resolve();
        updateRequest.onerror = () => reject(updateRequest.error);
      });
    }
    
    db.close();
  } catch (error) {
    console.error('Error al marcar operación como sincronizada:', error);
  }
};

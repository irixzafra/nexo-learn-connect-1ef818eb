
/**
 * Optimiza una imagen manteniendo una buena calidad mientras reduce su tamaño
 */
export const optimizeImage = async (
  file: File,
  maxWidth = 1200,
  quality = 0.85
): Promise<File> => {
  return new Promise((resolve, reject) => {
    // Crear elemento de imagen para cargar el archivo
    const img = new Image();
    const reader = new FileReader();
    
    // Cargar archivo como URL de datos
    reader.onload = (e) => {
      img.src = e.target?.result as string;
      
      img.onload = () => {
        // Calcular nuevas dimensiones manteniendo la relación de aspecto
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        
        // Crear canvas para redimensionar
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        // Dibujar imagen redimensionada en el canvas
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Convertir canvas a blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Error al optimizar la imagen'));
              return;
            }
            
            // Crear nuevo archivo con el mismo nombre pero optimizado
            const optimizedFile = new File(
              [blob],
              file.name,
              {
                type: file.type,
                lastModified: Date.now(),
              }
            );
            
            resolve(optimizedFile);
          },
          file.type,
          quality
        );
      };
      
      img.onerror = () => {
        reject(new Error('Error al cargar la imagen'));
      };
    };
    
    reader.onerror = () => {
      reject(new Error('Error al leer el archivo'));
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Verifica si la URL proporcionada es un video de YouTube o Vimeo
 */
export const isVideoUrl = (url: string): boolean => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  const vimeoRegex = /^(https?:\/\/)?(www\.)?(vimeo\.com)\/.+$/;
  
  return youtubeRegex.test(url) || vimeoRegex.test(url);
};

/**
 * Extrae el ID de video de una URL de YouTube o Vimeo
 */
export const getVideoEmbedUrl = (url: string): string => {
  // YouTube
  const youtubeRegex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const youtubeMatch = url.match(youtubeRegex);
  
  if (youtubeMatch && youtubeMatch[7].length === 11) {
    return `https://www.youtube.com/embed/${youtubeMatch[7]}`;
  }
  
  // YouTube acortado
  const youtubeShortRegex = /^.*youtu.be\/([^#&?]*).*/;
  const youtubeShortMatch = url.match(youtubeShortRegex);
  
  if (youtubeShortMatch && youtubeShortMatch[1].length === 11) {
    return `https://www.youtube.com/embed/${youtubeShortMatch[1]}`;
  }
  
  // Vimeo
  const vimeoRegex = /vimeo\.com\/([0-9]+)/;
  const vimeoMatch = url.match(vimeoRegex);
  
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }
  
  // Si no coincide con ninguno, devolver la URL original
  return url;
};

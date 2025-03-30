
import { optimizeImage, getVideoEmbedUrl, isVideoUrl } from './imageOptimizer';

// Define el formato del video
const videoHandler = {
  id: 'blot-formatter-video',
  allowedTags: ['VIDEO', 'IFRAME'],
};

// Crea el módulo de videos para Quill
export const createVideoModule = (quill: any) => {
  // Añade el formato de video
  const VideoBlot = quill.import('formats/video');
  quill.register(VideoBlot, true);
  
  // Añade el botón de video en la toolbar
  const toolbar = quill.getModule('toolbar');
  toolbar.addHandler('video', () => {
    const range = quill.getSelection(true);
    
    // Solicitar la URL del video
    const url = prompt('Introduce la URL del video (YouTube o Vimeo):');
    if (!url || !isVideoUrl(url)) {
      alert('Por favor, introduce una URL válida de YouTube o Vimeo');
      return;
    }
    
    // Insertar el video en el editor con la URL embebida
    quill.insertEmbed(range.index, 'video', getVideoEmbedUrl(url), 'user');
    quill.setSelection(range.index + 1);
  });
};

// Maneja la subida de imágenes optimizadas
export const handleImageUpload = (quill: any) => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();
  
  input.onchange = async () => {
    if (!input.files || input.files.length === 0) return;
    
    const file = input.files[0];
    
    try {
      // Optimizar la imagen antes de insertarla
      const optimizedFile = await optimizeImage(file);
      
      // Convertir a base64 para mostrarla inmediatamente
      const reader = new FileReader();
      reader.onload = () => {
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, 'image', reader.result);
        quill.setSelection(range.index + 1);
      };
      reader.readAsDataURL(optimizedFile);
      
      // En una aplicación real, aquí subirías la imagen optimizada al servidor
      console.log('Imagen optimizada lista para subir:', optimizedFile);
    } catch (error) {
      console.error('Error al optimizar la imagen:', error);
      alert('Hubo un error al procesar la imagen. Inténtalo de nuevo.');
    }
  };
};

// Configuración para el editor Quill
export const quillModules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['blockquote', 'code-block'],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ],
    handlers: {
      image: function() {
        // Esta función será reemplazada dinámicamente
      },
      video: function() {
        // Esta función será reemplazada dinámicamente
      },
    },
  },
  clipboard: {
    matchVisual: false,
  },
};

// Formatos permitidos en Quill
export const quillFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'link', 'image', 'video',
  'blockquote', 'code-block',
  'color', 'background',
];

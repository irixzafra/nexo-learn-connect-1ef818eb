
import React from 'react';
import { getVideoEmbedUrl, isVideoUrl } from '../utils/imageOptimizer';

interface VideoEmbedProps {
  url: string;
  className?: string;
}

export const VideoEmbed: React.FC<VideoEmbedProps> = ({ 
  url, 
  className = "w-full aspect-video rounded-lg overflow-hidden" 
}) => {
  // Verificar si es una URL de video válida
  if (!isVideoUrl(url)) {
    return null;
  }
  
  // Obtener la URL embebida
  const embedUrl = getVideoEmbedUrl(url);
  
  return (
    <div className={className}>
      <iframe
        src={embedUrl}
        title="Video Embebido"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
};

export default VideoEmbed;

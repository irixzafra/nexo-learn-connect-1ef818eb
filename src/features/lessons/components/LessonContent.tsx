
import React from "react";
import { Lesson } from "@/types/course";
import { Card, CardContent } from "@/components/ui/card";

interface LessonContentProps {
  lesson: Lesson;
}

export const LessonContent: React.FC<LessonContentProps> = ({ lesson }) => {
  if (lesson.content_type === "video" && lesson.content_video_url) {
    // Extract video ID from YouTube URL
    const getYouTubeVideoId = (url: string) => {
      if (!url) return null;
      
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      
      return (match && match[2].length === 11) ? match[2] : null;
    };

    // Generate embed URL
    const getEmbedUrl = (url: string) => {
      const videoId = getYouTubeVideoId(url);
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
      
      // Check if it's already an embed URL
      if (url.includes("youtube.com/embed/")) {
        return url;
      }
      
      // Handle Vimeo URLs (basic support)
      if (url.includes("vimeo.com")) {
        const vimeoId = url.split("/").pop();
        if (vimeoId) {
          return `https://player.vimeo.com/video/${vimeoId}`;
        }
      }
      
      return url; // Return original URL if we can't parse it
    };

    return (
      <div className="space-y-4">
        <div className="aspect-video rounded-lg overflow-hidden">
          <iframe
            src={getEmbedUrl(lesson.content_video_url)}
            className="w-full h-full"
            title={lesson.title}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      </div>
    );
  }

  if (lesson.content_type === "text" && lesson.content_text) {
    return (
      <Card>
        <CardContent className="prose prose-sm sm:prose-base max-w-none p-6">
          <div className="whitespace-pre-wrap">
            {lesson.content_text.content}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="text-center p-6 bg-muted rounded-lg">
      <p className="text-muted-foreground">Esta lección no tiene contenido.</p>
    </div>
  );
};

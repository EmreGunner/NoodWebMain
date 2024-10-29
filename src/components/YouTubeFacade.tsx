import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface YouTubeFacadeProps {
  videoId: string;
  thumbnailQuality?: 'default' | 'hq' | 'mq' | 'sd' | 'maxresdefault';
  className?: string;
}

const YouTubeFacade: React.FC<YouTubeFacadeProps> = ({ 
  videoId, 
  thumbnailQuality = 'hq',
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${thumbnailQuality}default.jpg`;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  if (isPlaying) {
    return (
      <iframe
        className={className}
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <div 
      className={`relative cursor-pointer group ${className}`}
      onClick={handlePlay}
    >
      {/* Thumbnail */}
      <img
        src={thumbnailUrl}
        alt="Video thumbnail"
        className="w-full h-full object-cover rounded-xl"
        loading="lazy"
        onError={(e) => {
          // Fallback to default quality if high quality thumbnail fails to load
          const target = e.target as HTMLImageElement;
          if (target.src.includes('maxresdefault')) {
            target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          }
        }}
      />
      
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black/50 p-5 rounded-full transform transition-transform group-hover:scale-110">
          <Play className="w-12 h-12 text-white" />
        </div>
      </div>
    </div>
  );
};

export default YouTubeFacade;

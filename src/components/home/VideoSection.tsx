import React from 'react';
import { Play } from 'lucide-react';

const VideoSection: React.FC = () => {
  return (
    <div className="bg-[#2d0a31] py-20">
      <div className="container mx-auto px-4">
        <div className="relative w-full max-w-3xl mx-auto aspect-video rounded-3xl overflow-hidden border-4 border-[#4e9350]">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
            alt="Video thumbnail" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-[#4e9350] text-white rounded-full p-4 hover:bg-opacity-90 transition duration-300">
              <Play size={32} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;

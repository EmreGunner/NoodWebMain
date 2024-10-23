import React from 'react';

const VideoSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-b from-purple-900 to-rose-300 py-32">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-20"></div>
      <div className="container mx-auto px-4">
        <div className="bg-primary/10 backdrop-blur-sm rounded-3xl p-8 relative max-w-4xl mx-auto">
          <div className="aspect-video rounded-2xl overflow-hidden bg-black/50">
            <div className="w-full h-full flex items-center justify-center">
              <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-primary border-b-[12px] border-b-transparent ml-2"></div>
              </button>
            </div>
          </div>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            <button className="w-3 h-3 rounded-full bg-white shadow-md"></button>
            <button className="w-3 h-3 rounded-full bg-white/30"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
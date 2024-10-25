import React from 'react';
import HeroCard from '../HeroCard';
import { motion } from 'framer-motion';

const VideoSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-[#1a3d2f] to-[#0f2a1e] py-20 overflow-hidden">
      {/* Cinematic background elements */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute inset-0 bg-[url('/path/to/texture.png')] opacity-10 mix-blend-overlay"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black to-transparent opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent opacity-40"></div>
      
      {/* Animated light beams */}
      <motion.div 
        className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-[#84bb75] to-transparent opacity-20"
        animate={{ 
          x: ['-50%', '50%', '-50%'],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 30,
          ease: "linear"
        }}
      />
      <motion.div 
        className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-[#4e9350] to-transparent opacity-20"
        animate={{ 
          x: ['50%', '-50%', '50%'],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 30,
          ease: "linear"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-white text-4xl font-bold mb-12 text-center"
        >
          Welcome to Nood: Your Journey Begins Here
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full max-w-4xl mx-auto relative"
        >
          {/* White light effect behind HeroCard */}
          <div className="absolute inset-0 bg-white opacity-10 blur-3xl rounded-full transform scale-110"></div>
          
          {/* Glowing border effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#84bb75] to-[#4e9350] rounded-3xl opacity-75 blur-lg"></div>
          
          <div className="bg-gradient-to-br from-[#84bb75] to-[#4e9350] rounded-3xl p-1 shadow-2xl relative">
            <div className="bg-[#0f2a1e] rounded-3xl p-4 sm:p-6">
              <div className="aspect-w-16 aspect-h-9 w-full overflow-visible relative z-10">
                <HeroCard />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VideoSection;

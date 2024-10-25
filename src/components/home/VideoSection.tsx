import React from 'react';
import HeroCard from '../HeroCard';
import { motion } from 'framer-motion';
import './VideoSection.css'; // Create this CSS file for the light beam animations

const VideoSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-[#1a3d2f] to-[#0f2a1e] py-20 overflow-hidden">
      {/* Cinematic background elements */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute inset-0 bg-[url('/path/to/texture.png')] opacity-10 mix-blend-overlay"></div>
      
      {/* Animated light beams */}
      <div className="light-beam light-beam-1"></div>
      <div className="light-beam light-beam-2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-4xl font-bold mb-12 text-center"
        >
          Welcome to Nood: Your Journey Begins Here
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full max-w-4xl mx-auto relative"
        >
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

import React from 'react';
import HeroCard from '../HeroCard';
import { motion } from 'framer-motion';

const VideoSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-[#2d0a31] to-[#4e1d4b] py-20 overflow-visible">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white text-4xl font-bold mb-12 text-center"
        >
          Discover Our Featured Course
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-4xl mx-auto relative"
        >
          <div className="bg-gradient-to-br from-[#84bb75] rounded-3xl p-4 sm:p-6 shadow-2xl">
            <div className="aspect-w-16 aspect-h-9 w-full overflow-visible">
              <HeroCard />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VideoSection;

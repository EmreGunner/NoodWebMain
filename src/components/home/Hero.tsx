import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-background to-primary/5 overflow-hidden min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            className="w-full lg:w-1/2 z-10 text-center lg:text-left mb-12 lg:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 sm:mb-8">
              Create <span className="text-primary">Your</span> Path
            </h1>
            <p className="text-gray-600 mb-8 sm:mb-10 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0">
              Empowering Moroccan youth to transform their skills into successful careers and businesses through expert-led courses and a supportive community.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/academy" 
                className="btn-primary text-lg py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 inline-flex items-center justify-center mx-auto lg:mx-0"
              >
                Explore Courses <ArrowRight className="ml-2" size={24} />
              </Link>
            </motion.div>
          </motion.div>
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[550px] lg:h-[550px]">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 blur-3xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
              ></motion.div>
              <div className="relative bg-gradient-to-br from-primary rounded-full overflow-hidden w-full h-full shadow-2xl flex items-center justify-center">
                <img
                  src="/ExampleTemplateNood/public/external/youngstudentwomanwearingdenimjacketeyeglassesholdi1105-9htb-700h.png"
                  alt="Professional woman"
                  className="w-full h-full object-cover object-top -translate-x-5"
                />
              </div>
              <motion.div
                className="absolute -top-8 right-4 bg-white rounded-full px-4 py-2 shadow-lg flex items-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <span className="text-primary font-bold text-lg sm:text-xl mr-2">5K+</span>
                <span className="text-xs sm:text-sm">Online Courses</span>
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -left-2 bg-white rounded-full px-4 py-2 shadow-lg flex items-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <span className="text-primary font-bold text-lg sm:text-xl mr-2">2K+</span>
                <span className="text-xs sm:text-sm">Video Courses</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

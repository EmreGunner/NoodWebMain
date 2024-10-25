import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Zap, Award } from 'lucide-react';
import { PopupButton } from '@typeform/embed-react';

const BecomeCoach: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-100 min-h-screen pt-16"
    >
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row items-start">
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12 lg:sticky lg:top-20">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800">Become A Coach</h1>
            <p className="text-gray-600 mb-6 text-lg">
              Guide and inspire others with your expertise. Join our coaching community and make a lasting impact on aspiring professionals.
            </p>
            <div className="space-y-4 mb-8">
              {[
                { icon: Target, text: 'Provide personalized guidance' },
                { icon: Zap, text: 'Empower others to achieve their goals' },
                { icon: Award, text: 'Build your reputation as an expert' }
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <item.icon className="text-secondary mr-4" size={24} />
                  <span className="text-base">{item.text}</span>
                </div>
              ))}
            </div>
            <PopupButton
              id="01HQB8RH0C3WV37JX65EZ97VX4"
              className="bg-secondary text-white text-lg px-8 py-3 rounded-full font-semibold hover:bg-primary transition duration-300 inline-flex items-center shadow-lg hover:shadow-xl"
            >
              Apply Now <ArrowRight className="ml-3" size={20} />
            </PopupButton>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <img 
              src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Coach mentoring a student" 
              className="rounded-2xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition duration-300 
                         max-h-96 sm:max-h-[28rem] lg:max-h-[24rem] xl:max-h-[28rem]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BecomeCoach;

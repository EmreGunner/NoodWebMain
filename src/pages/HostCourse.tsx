import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Users, DollarSign } from 'lucide-react';
import CourseApplicationForm from '../components/CourseApplicationForm';

const HostCourse: React.FC = () => {
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);

  const openApplicationForm = () => {
    setIsApplicationFormOpen(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gradient-to-br from-primary/10 to-secondary/10 min-h-screen pt-16 md:pt-20"
    >
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-800">Host Your Course</h1>
              <p className="text-gray-600 mb-8 text-lg md:text-xl">
                Share your expertise with our global community. Create engaging courses and help others succeed in their learning journey.
              </p>
              <div className="space-y-6 mb-10">
                {[
                  { icon: Video, text: 'Create and upload video lessons' },
                  { icon: Users, text: 'Reach thousands of eager learners' },
                  { icon: DollarSign, text: 'Earn money from your expertise' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <item.icon className="text-primary mr-4" size={32} />
                    <span className="text-base md:text-lg">{item.text}</span>
                  </div>
                ))}
              </div>
              
              <motion.button 
                className="bg-primary text-white font-bold text-lg py-3 rounded-full w-full md:w-auto px-8 transition-all duration-300 hover:bg-primary-dark shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={openApplicationForm}
              >
                Apply to Host a Course
              </motion.button>
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0">
              <img src="https://i.ibb.co/V0NZhhWQ/Host-ourses-3.webp" 
                alt="Host teaching online" 
                className="rounded-2xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition duration-300"
              />
            </div>
          </div>
        </div>
      </div>
      
      <CourseApplicationForm 
        isOpen={isApplicationFormOpen}
        onClose={() => setIsApplicationFormOpen(false)}
        courseName="Host a Course"
      />
    </motion.div>
  );
};

export default HostCourse;

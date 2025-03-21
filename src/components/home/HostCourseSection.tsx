import React, { useState } from 'react';
import { Video, Users, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import CourseApplicationForm from '../CourseApplicationForm';

const HostCourseSection: React.FC = () => {
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);

  const openApplicationForm = () => {
    setIsApplicationFormOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-12 sm:p-16 shadow-xl">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-800">Host Your Course</h2>
            <p className="text-gray-600 mb-8 text-xl">
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
                  <span className="text-lg">{item.text}</span>
                </div>
              ))}
            </div>
            
            {/* Replace TypeForm with consistent button */}
            <motion.button 
              className="bg-primary text-white font-bold text-lg py-3 rounded-full w-full md:w-auto px-8 transition-all duration-300 hover:bg-primary-dark shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openApplicationForm}
            >
              Apply to Host a Course
            </motion.button>
          </div>
          <div className="lg:w-1/2">
            <img 
              src="https://i.ibb.co/V0NZhhWQ/Host-ourses-3.webp" 
              alt="Host teaching online" 
              className="rounded-2xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition duration-300"
            />
          </div>
        </div>
      </div>
      
      {/* Application Form Modal */}
      <CourseApplicationForm 
        isOpen={isApplicationFormOpen}
        onClose={() => setIsApplicationFormOpen(false)}
        courseName="Host a Course"
      />
    </div>
  );
};

export default HostCourseSection;

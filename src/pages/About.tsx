import React from 'react';
import { motion } from 'framer-motion';
import { Users, Lightbulb, Target, Globe } from 'lucide-react';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const values = [
    { icon: Users, title: 'Community-Driven', description: 'We believe in the power of collaboration and shared knowledge.' },
    { icon: Lightbulb, title: 'Innovation', description: 'We constantly evolve to meet the changing needs of our learners.' },
    { icon: Target, title: 'Goal-Oriented', description: 'We focus on helping our students achieve tangible results.' },
    { icon: Globe, title: 'Global Perspective', description: 'We embrace diversity and cater to a worldwide audience.' },
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-gradient-to-b from-gray-50 to-white min-h-screen pt-20"
    >
      <div className="container mx-auto px-4 py-16 space-y-24">
        <motion.section className="text-center" variants={itemVariants}>
          <h1 className="text-6xl font-bold mb-6 text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            About NOOD
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            NOOD is Morocco's premier platform dedicated to empowering creators and entrepreneurs. We provide expert-led courses and personalized guidance to help you turn your passion into a thriving online business.
          </p>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-4xl font-bold mb-12 text-center">Our Mission</h2>
          <div className="bg-white rounded-lg shadow-xl p-8">
            <p className="text-xl text-gray-700 text-center">
              Our mission is to democratize access to high-quality education and mentorship, enabling individuals to succeed in the digital economy. We strive to bridge the gap between traditional education and the rapidly evolving job market, equipping our students with the skills and knowledge they need to thrive in the 21st century.
            </p>
          </div>
        </motion.section>

        <motion.section variants={containerVariants}>
          <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="bg-white rounded-lg shadow-xl p-6 h-full flex flex-col items-center text-center">
                  <value.icon className="text-primary mb-4" size={48} />
                  <h3 className="text-2xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section variants={itemVariants} className="text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Whether you're looking to start a side hustle, launch a full-fledged business, or simply expand your skill set, NOOD is here to support you every step of the way. Join our community of passionate learners and take the first step towards your digital success story.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-lg px-8 py-3 rounded-full"
          >
            Explore Our Courses
          </motion.button>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default About;

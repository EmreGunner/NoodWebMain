import React from 'react';
import { ArrowRight, Clock, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FinalCTASection: React.FC = () => {
  return (
    <section className="section section-gradient py-24 sm:py-32">
      <div className="section-container">
        <motion.div 
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row">
            {/* Left Content */}
            <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 xl:p-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                  Get started on your journey
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 mb-8">
                  Your next big breakthrough is just 20 minutes a day away. Experience Nood's micro-learning methodology with our annual or monthly plan.
                </p>
                <div className="space-y-6 mb-10">
                  {[
                    { icon: Clock, text: 'Just 20 minutes a day' },
                    { icon: Star, text: 'Expert-led courses' },
                    { icon: Users, text: 'Supportive community' }
                  ].map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <item.icon className="text-primary" size={24} />
                      </div>
                      <span className="text-lg text-gray-700">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/signup" 
                    className="inline-flex items-center bg-primary hover:bg-secondary text-white text-lg font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl"
                  >
                    Become a member <ArrowRight className="ml-3" size={24} />
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Content */}
            <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
                alt="Students collaborating" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 flex items-center justify-center">
                <motion.div 
                  className="text-center p-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <p className="text-white text-3xl sm:text-4xl font-bold mb-6">
                    Join 100,000+ learners
                  </p>
                  <div className="flex justify-center space-x-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className="text-yellow-400 drop-shadow-lg" 
                        fill="currentColor" 
                        size={32}
                      />
                    ))}
                  </div>
                  <p className="text-white text-xl font-medium">
                    4.9 out of 5 stars
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;

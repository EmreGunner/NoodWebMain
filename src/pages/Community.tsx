import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, MessageCircle, Zap, Award, Globe, Rocket } from 'lucide-react';
import Card from '../components/Card';
import WaitlistForm from '../components/WaitlistForm';

const Community: React.FC = () => {
  const benefits = [
    { icon: Users, title: 'Networking', description: 'Connect with potential collaborators, clients, and mentors.' },
    { icon: MessageCircle, title: 'Expert Q&A', description: 'Regular sessions with industry experts to answer your questions.' },
    { icon: Award, title: 'Exclusive Resources', description: 'Access to tools, guides, and discounts for community members.' },
    { icon: Globe, title: 'Global Community', description: 'Connect with entrepreneurs from around the world.' },
    { icon: Zap, title: 'Skill Development', description: 'Workshops and challenges to enhance your skills.' },
    { icon: Rocket, title: 'Launch Support', description: 'Get feedback and support for your project launches.' },
  ];

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

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-gradient-to-b from-gray-50 to-white min-h-screen pt-16"
    >
      <div className="container mx-auto px-4 md:px-6 py-6 md:py-10 space-y-8 md:space-y-12">
        <motion.section className="text-center" variants={itemVariants}>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-gray-900">
            NOOD <span className="text-primary">Community</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto">
            Connect, learn, and grow with like-minded entrepreneurs.
          </p>
        </motion.section>

        <motion.section 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch" 
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="h-full flex">
            <Card className="p-5 md:p-6 flex flex-col items-center text-center h-full min-h-[500px] transform hover:shadow-md w-full border border-gray-100">
              <Users className="text-primary mb-6" size={48} />
              <h2 className="text-2xl font-bold mb-4">Join the Conversation</h2>
              <p className="text-gray-600 mb-6 flex-grow">
                Engage with fellow entrepreneurs, share ideas, and get instant feedback on your projects.
              </p>
              <div className="flex justify-center mt-auto pt-4">
                <motion.a 
                  href="https://t.me/noodcommunity"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-medium border border-primary text-primary hover:bg-primary/5 transition-colors"
                >
                  Join Telegram Community <ArrowRight className="ml-2" size={20} />
                </motion.a>
              </div>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants} className="h-full flex">
            <Card className="w-full flex-1 transform transition-all duration-300 hover:shadow-xl overflow-visible p-0">
              <WaitlistForm />
            </Card>
          </motion.div>
        </motion.section>

        <motion.section variants={containerVariants} className="py-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Community Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-4 h-full transition-all border border-gray-100 hover:border-primary/20">
                  <div className="flex items-center mb-3">
                    <benefit.icon className="text-primary mr-2" size={20} />
                    <h3 className="text-lg font-medium">{benefit.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          variants={itemVariants}
          className="bg-primary rounded-lg text-white p-6 md:p-8 text-center hover:shadow-md"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Ready to Join Our Community?</h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
            Take the first step towards building your digital side hustle with the support of our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.a 
              href="https://t.me/noodcommunity"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-primary text-sm px-5 py-2.5 rounded-lg transition-colors inline-flex items-center justify-center font-medium"
            >
              Join Telegram <ArrowRight className="ml-1.5" size={16} />
            </motion.a>
            <motion.button 
              onClick={() => {
                document.querySelector('.waitlist-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="border border-white text-white text-sm px-5 py-2.5 rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center font-medium"
            >
              Apply Now <ArrowRight className="ml-1.5" size={16} />
            </motion.button>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Community;

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
      className="bg-gradient-to-b from-gray-50 to-white min-h-screen pt-20"
    >
      <div className="container mx-auto px-4 py-12 space-y-16">
        <motion.section className="text-center" variants={itemVariants}>
          <h1 className="text-6xl font-bold mb-6 text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            NOOD Community
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Join our thriving Telegram-based community. Connect, learn, and grow with like-minded individuals focused on side hustle development.
          </p>
        </motion.section>

        <motion.section className="grid grid-cols-1 md:grid-cols-2 gap-8" variants={containerVariants}>
          <motion.div variants={itemVariants} className="h-full">
            <Card className="p-8 flex flex-col items-center text-center h-full transform transition-all duration-300 hover:shadow-xl">
              <Users className="text-primary mb-4" size={48} />
              <h2 className="text-2xl font-bold mb-4">Join the Conversation</h2>
              <p className="text-gray-600 mb-6 flex-grow">
                Engage with fellow entrepreneurs, share ideas, and get instant feedback on your projects.
              </p>
              <motion.a 
                href="https://t.me/noodcommunity"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-flex items-center px-6 py-3 rounded-full text-lg"
              >
                Join Telegram Community <ArrowRight className="ml-2" size={20} />
              </motion.a>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants} className="h-full flex">
            <Card className="w-full flex-1 transform transition-all duration-300 hover:shadow-xl overflow-visible">
              <WaitlistForm />
            </Card>
          </motion.div>
        </motion.section>

        <motion.section variants={containerVariants}>
          <h2 className="text-4xl font-bold mb-12 text-center">Community Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-6 h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <benefit.icon className="text-primary mb-4" size={36} />
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          variants={itemVariants}
          className="bg-gradient-to-r from-primary to-secondary rounded-3xl text-white p-12 text-center transform transition-all duration-300 hover:shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Take the first step towards building your digital side hustle with the support of our community.
          </p>
          <motion.a 
            href="https://t.me/noodcommunity"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-primary text-lg px-8 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300 inline-flex items-center font-semibold"
          >
            Join NOOD Community <ArrowRight className="ml-2" size={20} />
          </motion.a>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Community;

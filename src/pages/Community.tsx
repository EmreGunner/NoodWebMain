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
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 space-y-12 md:space-y-16">
        <motion.section className="text-center" variants={itemVariants}>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            NOOD Community
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Join our thriving community of entrepreneurs. Connect, learn, and grow with like-minded individuals focused on building successful digital businesses.
          </p>
        </motion.section>

        <motion.section 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch" 
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="h-full flex">
            <Card className="p-6 md:p-8 flex flex-col items-center text-center h-full min-h-[600px] transform transition-all duration-300 hover:shadow-xl w-full">
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
                  whileHover={{ scale: 1.05, translateY: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary inline-flex items-center px-6 py-3 rounded-xl text-base md:text-lg border-2 border-primary text-primary hover:bg-primary/5 font-medium shadow-sm transition-all duration-200"
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

        <motion.section variants={containerVariants} className="py-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">Community Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-6 h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                  <benefit.icon className="text-primary mb-4" size={32} />
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          variants={itemVariants}
          className="bg-gradient-to-r from-primary to-secondary rounded-2xl text-white p-8 md:p-12 text-center transform transition-all duration-300 hover:shadow-xl"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Ready to Join Our Community?</h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
            Take the first step towards building your digital side hustle with the support of our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a 
              href="https://t.me/noodcommunity"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, translateY: -2 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white text-primary text-base md:text-lg px-6 py-3 rounded-xl hover:bg-gray-50 transition-all duration-200 inline-flex items-center justify-center font-semibold shadow-md"
            >
              Join Telegram <ArrowRight className="ml-2" size={20} />
            </motion.a>
            <motion.button 
              onClick={() => {
                document.querySelector('.waitlist-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              whileHover={{ scale: 1.03, translateY: -2 }}
              whileTap={{ scale: 0.97 }}
              className="border-2 border-white text-white text-base md:text-lg px-6 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 inline-flex items-center justify-center font-semibold"
            >
              Apply for Membership <ArrowRight className="ml-2" size={20} />
            </motion.button>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Community;

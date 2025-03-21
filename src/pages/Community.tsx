import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, MessageCircle, Zap, Award, Globe, Rocket } from 'lucide-react';
import Card from '../components/Card';
import WaitlistForm from '../components/WaitlistForm';
import qrImage from '/qrimage.png'; // Import the QR code image

const Community: React.FC = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  
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

  const openWaitlistForm = () => {
    setIsWaitlistOpen(true);
  };

  const closeWaitlistForm = () => {
    setIsWaitlistOpen(false);
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-gradient-to-b from-gray-50 to-white min-h-screen pt-16"
    >
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 space-y-12 md:space-y-16">
        {/* Header Section - Made bigger */}
        <motion.section className="text-center py-6" variants={itemVariants}>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-5 text-gray-900">
            NOOD <span className="text-primary">Community</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Connect, learn, and grow with like-minded entrepreneurs.
          </p>
        </motion.section>

        {/* Main Cards Section - Enlarged and enhanced */}
        <motion.section 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-stretch" 
          variants={containerVariants}
        >
          {/* WhatsApp Join Card */}
          <motion.div variants={itemVariants} className="h-full">
            <Card className="p-6 md:p-8 flex flex-col items-center text-center w-full border-2 border-gray-200 rounded-2xl hover:border-primary/30 transition-all shadow-md hover:shadow-lg">
              <Users className="text-primary mb-5" size={48} />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Join the Conversation</h2>
              <p className="text-gray-700 text-lg mb-6">
                Engage with fellow entrepreneurs, share ideas, and get instant feedback on your projects.
              </p>
              
              {/* QR Code Image */}
              <div className="mb-5 p-3 bg-white rounded-xl shadow-sm">
                <img 
                  src={qrImage} 
                  alt="WhatsApp Community QR Code" 
                  className="w-48 h-48 object-contain mx-auto"
                />
              </div>

              <div className="flex justify-center mt-4">
                <motion.a 
                  href="https://whatsapp.com/channel/example" 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg text-lg font-medium bg-green-500 text-white hover:bg-green-600 transition-colors shadow-md"
                >
                  Join WhatsApp Channel <ArrowRight className="ml-2" size={20} />
                </motion.a>
              </div>
            </Card>
          </motion.div>
          
          {/* Membership Application Card */}
          <motion.div variants={itemVariants} className="h-full">
            <Card className="p-6 md:p-8 flex flex-col items-center text-center w-full border-2 border-gray-200 rounded-2xl hover:border-primary/30 transition-all shadow-md hover:shadow-lg">
              <Rocket className="text-primary mb-5" size={48} />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Apply for Membership</h2>
              <p className="text-gray-700 text-lg mb-6">
                Our exclusive community is limited to 1000 members. Apply now to secure your spot and get access to all our resources.
              </p>
              <div className="flex justify-center mt-auto">
                <motion.button
                  onClick={openWaitlistForm}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg text-lg font-bold bg-primary text-white hover:bg-primary/90 transition-colors shadow-md"
                >
                  Apply To Join Community <ArrowRight className="ml-2" size={20} />
                </motion.button>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* Benefits Section - Enhanced */}
        <motion.section variants={containerVariants} className="py-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-10 text-center">Community Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-5 md:p-6 h-full transition-all border-2 border-gray-200 rounded-xl hover:border-primary/30 shadow-md hover:shadow-lg">
                  <div className="flex items-center mb-4">
                    <benefit.icon className="text-primary mr-3 flex-shrink-0" size={28} />
                    <h3 className="text-xl font-bold">{benefit.title}</h3>
                  </div>
                  <p className="text-gray-700 text-base">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Final CTA Section - Enhanced */}
        <motion.section 
          variants={itemVariants}
          className="bg-primary rounded-xl text-white p-8 md:p-10 text-center shadow-lg hover:shadow-xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-5">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8 md:mb-10 max-w-3xl mx-auto">
            Take the first step towards building your digital side hustle with the support of our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a 
              href="https://whatsapp.com/channel/example"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white text-primary text-lg px-8 py-4 rounded-lg transition-colors inline-flex items-center justify-center font-bold shadow-md"
            >
              Join WhatsApp Channel <ArrowRight className="ml-2" size={20} />
            </motion.a>
            <motion.button 
              onClick={openWaitlistForm}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-transparent border-2 border-white text-white text-lg px-8 py-4 rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center font-bold shadow-md"
            >
              Apply To Join Community <ArrowRight className="ml-2" size={20} />
            </motion.button>
          </div>
        </motion.section>
      </div>

      {/* Waitlist Form Popup */}
      <WaitlistForm isOpen={isWaitlistOpen} onClose={closeWaitlistForm} />
    </motion.div>
  );
};

export default Community;

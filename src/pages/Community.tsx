import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, MessageCircle, Zap, Award, Globe, Rocket } from 'lucide-react';
import Card from '../components/Card';
import WaitlistForm from '../components/WaitlistForm';
import qrImage from '../assets/images/qrimage.png';

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
      className="min-h-screen bg-white"
    >
      {/* Compact Header Section */}
      <div className="container mx-auto px-4 pt-6 pb-8">
        <motion.div 
          className="text-center mb-8"
          variants={itemVariants}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-3 text-gray-900">
            NOOD <span className="text-primary">Community</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-xl mx-auto">
            Connect, learn, and grow with like-minded entrepreneurs.
          </p>
        </motion.div>

        {/* Main Action Cards - Streamlined */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* WhatsApp Card */}
          <motion.div variants={itemVariants} className="h-full">
            <Card className="p-6 flex flex-col h-full border border-gray-200 rounded-xl hover:border-primary/50 transition-all shadow-sm hover:shadow-md">
              <div className="flex items-center mb-4">
                <Users className="text-primary mr-3" size={28} />
                <h2 className="text-2xl font-bold">Join the Conversation</h2>
              </div>
              
              <p className="text-gray-700 mb-5">
                Engage with fellow entrepreneurs, share ideas, and get instant feedback on your projects.
              </p>
              
              {/* QR Code */}
              <div className="flex-grow flex items-center justify-center my-4">
                <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                  <img 
                    src={qrImage} 
                    alt="WhatsApp Community QR Code" 
                    className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
                  />
                </div>
              </div>

              <motion.a 
                href="https://whatsapp.com/channel/example" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 w-full inline-flex items-center justify-center py-3 rounded-lg text-white font-medium bg-green-600 hover:bg-green-700 transition-colors"
              >
                Join WhatsApp Channel <ArrowRight className="ml-2" size={18} />
              </motion.a>
            </Card>
          </motion.div>
          
          {/* Membership Card */}
          <motion.div variants={itemVariants} className="h-full">
            <Card className="p-6 flex flex-col h-full border border-gray-200 rounded-xl hover:border-primary/50 transition-all shadow-sm hover:shadow-md">
              <div className="flex items-center mb-4">
                <Rocket className="text-primary mr-3" size={28} />
                <h2 className="text-2xl font-bold">Apply for Membership</h2>
              </div>
              
              <p className="text-gray-700 mb-5">
                Our exclusive community is limited to 1000 members. Apply now to secure your spot and get access to all our resources.
              </p>
              
              <div className="flex-grow flex flex-col justify-center">
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Access to exclusive resources and tools</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Private networking opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Mentorship from industry experts</span>
                  </li>
                </ul>
              </div>

              <motion.button
                onClick={openWaitlistForm}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 w-full inline-flex items-center justify-center py-3 rounded-lg text-white font-medium bg-primary hover:bg-primary/90 transition-colors"
              >
                Apply To Join Community <ArrowRight className="ml-2" size={18} />
              </motion.button>
            </Card>
          </motion.div>
        </div>

        {/* Benefits Section - Simplified */}
        <motion.section variants={containerVariants} className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Community Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-4 h-full border border-gray-200 rounded-lg hover:border-primary/30 transition-all shadow-sm hover:shadow-md">
                  <div className="flex items-center mb-2">
                    <benefit.icon className="text-primary mr-2 flex-shrink-0" size={20} />
                    <h3 className="font-bold">{benefit.title}</h3>
                  </div>
                  <p className="text-gray-700 text-sm">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Final CTA - Compact */}
        <motion.section 
          variants={itemVariants}
          className="bg-primary rounded-lg text-white p-6 text-center shadow-md"
        >
          <h2 className="text-2xl font-bold mb-3">Ready to Join Our Community?</h2>
          <p className="text-lg mb-5 max-w-2xl mx-auto">
            Take the first step towards building your digital side hustle with our supportive community.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.a 
              href="https://whatsapp.com/channel/example"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-primary px-6 py-2.5 rounded-lg transition-colors inline-flex items-center justify-center font-medium"
            >
              Join WhatsApp <ArrowRight className="ml-1.5" size={16} />
            </motion.a>
            <motion.button 
              onClick={openWaitlistForm}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="border border-white text-white px-6 py-2.5 rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center font-medium"
            >
              Apply To Join Community <ArrowRight className="ml-1.5" size={16} />
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

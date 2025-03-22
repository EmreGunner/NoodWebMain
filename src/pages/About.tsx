import React from 'react';
import { motion } from 'framer-motion';
import { Users, Lightbulb, Target, Globe, ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  const slideInLeftVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        delay: 0.2
      }
    }
  };

  const slideInRightVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        delay: 0.2
      }
    }
  };

  const pulseVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        yoyo: Infinity,
        duration: 3,
        ease: "easeInOut"
      }
    }
  };

  // Our journey milestones
  const journeyMilestones = [
    {
      year: '2019',
      title: 'The Spark',
      description: 'It all began with a simple question: "Why is it so hard for talented Moroccans to succeed online?" Our founder noticed a gap between local talent and digital opportunity.'
    },
    {
      year: '2020',
      title: 'First Steps',
      description: 'During the pandemic, we launched our first online workshop helping 20 entrepreneurs adapt to the digital landscape. The response was overwhelming.'
    },
    {
      year: '2021',
      title: 'Growing Community',
      description: 'As our community grew to 500+ members, we expanded our offerings with specialized courses and one-on-one mentorship programs.'
    },
    {
      year: '2022',
      title: 'NOOD Platform',
      description: 'We launched the NOOD platform as you see it today, creating a comprehensive ecosystem for Moroccan creators and entrepreneurs.'
    }
  ];

  // Our core values - maintained but enhanced
  const values = [
    { 
      icon: Users, 
      title: 'Community-Driven', 
      description: 'Every feature we build, every course we create starts with our community's needs. Your success stories fuel our mission.',
      color: 'from-blue-500 to-cyan-400'
    },
    { 
      icon: Lightbulb, 
      title: 'Innovation', 
      description: 'The digital landscape changes rapidly. We stay ahead of trends to ensure our community is equipped for tomorrow's challenges.',
      color: 'from-yellow-500 to-amber-400'
    },
    { 
      icon: Target, 
      title: 'Goal-Oriented', 
      description: 'We measure our success by your achievements. Our structured approach ensures you make tangible progress toward your dreams.',
      color: 'from-red-500 to-rose-400'
    },
    { 
      icon: Globe, 
      title: 'Moroccan Roots, Global Vision', 
      description: 'Proudly Moroccan, we build bridges to global markets and opportunities, helping local talent reach international audiences.',
      color: 'from-green-500 to-emerald-400'
    },
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-gradient-to-b from-gray-50 to-white min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed">
              Every revolution begins with a simple idea. Ours was to empower Morocco's creative minds with the skills, knowledge, and community they need to thrive in the digital age.
            </p>
            <motion.div
              className="w-20 h-20 mx-auto text-primary"
              variants={pulseVariants}
            >
              <ArrowRight className="w-10 h-10 mx-auto transform rotate-90" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Origin Story Section */}
      <motion.section 
        className="py-20 bg-white"
        variants={itemVariants}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="md:w-1/2" 
              variants={slideInLeftVariants}
            >
              <h2 className="text-4xl font-bold mb-8 text-gray-900">From Vision to Reality</h2>
              <p className="text-lg leading-relaxed mb-6 text-gray-700">
                NOOD was born from witnessing countless talented Moroccans struggling to turn their skills into sustainable online businesses. Despite the creativity and drive, there was a clear gap in practical guidance, specialized knowledge, and supportive community.
              </p>
              <p className="text-lg leading-relaxed mb-6 text-gray-700">
                What began as informal mentoring sessions in Casablanca coffee shops evolved into Morocco's premier platform for digital entrepreneurs. Today, we've helped over 2,000 creators build thriving businesses that reach global audiences while staying true to their Moroccan identity.
              </p>
              <div className="inline-flex items-center text-primary font-semibold">
                <Heart className="mr-2" size={20} />
                <span>Built with passion in Morocco</span>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2 bg-gradient-to-r from-primary/5 to-secondary/5 p-8 rounded-2xl shadow-lg"
              variants={slideInRightVariants}
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Our Journey</h3>
              <div className="space-y-8">
                {journeyMilestones.map((milestone, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        {milestone.year.substring(2)}
                      </div>
                      {index < journeyMilestones.length - 1 && (
                        <div className="w-0.5 h-20 bg-primary/20 mx-auto mt-2"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">{milestone.title}</h4>
                      <p className="mt-2 text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Mission Section - Enhanced with storytelling */}
      <motion.section 
        className="py-20 bg-gray-50"
        variants={itemVariants}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6 text-center">Our Mission</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl p-10 border-t-4 border-primary">
              <p className="text-xl leading-relaxed text-gray-700">
                We believe that <span className="text-primary font-semibold">everyone deserves access to the digital economy</span>, regardless of background or formal education. Our mission is to democratize knowledge, break down technical barriers, and create a supportive community where Moroccan creators can learn, grow, and succeed together.
              </p>
              <p className="text-xl leading-relaxed text-gray-700 mt-4">
                With every course we create, every consultation we provide, and every community event we host, we're building a future where Morocco stands at the forefront of digital innovation and entrepreneurship.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Values Section - Maintained but enhanced */}
      <motion.section 
        className="py-20 bg-white"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center">The Values That Guide Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {values.map((value, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="bg-white rounded-xl shadow-xl p-8 h-full border-t-4 border-primary">
                  <div className={`w-16 h-16 rounded-full mb-6 flex items-center justify-center bg-gradient-to-r ${value.color} text-white`}>
                    <value.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-600 text-lg">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action - Enhanced with storytelling */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-primary to-secondary text-white"
        variants={itemVariants}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Write Your Chapter in Our Story</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Every successful entrepreneur's journey begins with a single step. Whether you're starting your first side hustle or scaling an existing business, NOOD is your companion on this journey. Join thousands of Moroccan creators who are turning their passion into prosperity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/courses" 
                className="bg-white text-primary text-lg px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 inline-flex items-center font-semibold shadow-lg"
              >
                Explore Our Courses <ArrowRight className="ml-2" size={20} />
              </Link>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/consultation" 
                className="bg-transparent text-white border-2 border-white text-lg px-8 py-3 rounded-full hover:bg-white/10 transition-all duration-300 inline-flex items-center font-semibold"
              >
                Book a Consultation <ArrowRight className="ml-2" size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default About;

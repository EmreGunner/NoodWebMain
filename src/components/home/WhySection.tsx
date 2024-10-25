import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Users, Zap, DollarSign, Globe } from 'lucide-react';

const WhySection: React.FC = () => {
  const reasons = [
    {
      id: '01',
      icon: TrendingUp,
      title: 'Accelerate Your Career Growth',
      description: 'Our courses are designed to fast-track your professional development, giving you the skills to stand out in a competitive job market.',
    },
    {
      id: '02',
      icon: DollarSign,
      title: 'Increase Your Earning Potential',
      description: 'Learn high-demand skills that can significantly boost your income. Our students report an average 30% increase in salary after completing our courses.',
    },
    {
      id: '03',
      icon: Award,
      title: 'Industry-Recognized Certifications',
      description: 'Gain credentials that matter. Our certifications are recognized by top companies, opening doors to new opportunities.',
    },
    {
      id: '04',
      icon: Users,
      title: 'Network with Industry Leaders',
      description: 'Connect with successful professionals and peers. Build relationships that can lead to collaborations, job offers, and business opportunities.',
    },
    {
      id: '05',
      icon: Zap,
      title: 'Practical, Hands-On Learning',
      description: 'Apply what you learn immediately. Our courses focus on real-world projects and skills that you can use to start earning right away.',
    },
    {
      id: '06',
      icon: Globe,
      title: 'Access a Global Marketplace',
      description: 'Learn how to leverage online platforms to offer your skills worldwide. Tap into the booming digital economy and work from anywhere.',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose NOOD?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason) => (
            <motion.div
              key={reason.id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <div className="bg-primary text-white rounded-full p-3 mr-4">
                  <reason.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold">{reason.title}</h3>
              </div>
              <p className="text-gray-600">{reason.description}</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-2xl font-bold mb-6">Ready to transform your career and increase your income?</p>
          <a
            href="/courses"
            className="bg-primary text-white text-lg px-8 py-3 rounded-full hover:bg-primary-dark transition-colors duration-300 inline-flex items-center"
          >
            Explore Our Courses
            <TrendingUp className="ml-2" size={20} />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default WhySection;

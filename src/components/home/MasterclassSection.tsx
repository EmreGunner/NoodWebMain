import React from 'react';
import { ArrowRight, Star, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const featuredMasterclasses = [
  {
    id: 1,
    title: "Mindfulness Mastery",
    instructor: "Dr. Sarah Johnson",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    rating: 4.9,
    students: 1500,
    duration: "6 weeks"
  },
  {
    id: 2,
    title: "Entrepreneurial Leadership",
    instructor: "Michael Chen",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    rating: 4.8,
    students: 2000,
    duration: "8 weeks"
  },
  {
    id: 3,
    title: "Creative Writing Workshop",
    instructor: "Emma Thompson",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    rating: 4.7,
    students: 1200,
    duration: "4 weeks"
  }
];

const MasterclassSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-center text-gray-800">Nood Masterclasses</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-16">
            Embark on a profound exploration of self with our advanced programs and empowering experiences led by world-class experts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {featuredMasterclasses.map((masterclass, index) => (
            <motion.div
              key={masterclass.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2"
            >
              <img src={masterclass.image} alt={masterclass.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-gray-800">{masterclass.title}</h3>
                <p className="text-gray-600 mb-4">with {masterclass.instructor}</p>
                <div className="flex items-center mb-4">
                  <Star className="text-yellow-400 mr-1" size={18} />
                  <span className="font-semibold mr-2">{masterclass.rating}</span>
                  <Users className="text-gray-400 mr-1" size={18} />
                  <span className="text-gray-600">{masterclass.students} students</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="mr-1" size={18} />
                  <span>{masterclass.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link 
            to="/masterclasses" 
            className="bg-primary text-white text-lg px-8 py-3 rounded-full font-semibold hover:bg-secondary transition duration-300 inline-flex items-center shadow-lg hover:shadow-xl"
          >
            Explore All Masterclasses <ArrowRight className="ml-2" size={20} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default MasterclassSection;

import React, { useState } from 'react';
import { ArrowRight, Star, Users, Clock, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const masterclasses = [
  {
    id: 1,
    title: "Mindfulness Mastery",
    instructor: "Dr. Sarah Johnson",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    rating: 4.9,
    students: 1500,
    duration: "6 weeks",
    category: "Personal Development"
  },
  {
    id: 2,
    title: "Entrepreneurial Leadership",
    instructor: "Michael Chen",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    rating: 4.8,
    students: 2000,
    duration: "8 weeks",
    category: "Business"
  },
  {
    id: 3,
    title: "Creative Writing Workshop",
    instructor: "Emma Thompson",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    rating: 4.7,
    students: 1200,
    duration: "4 weeks",
    category: "Arts"
  },
  // Add more masterclasses here...
];

const categories = ["All", "Personal Development", "Business", "Arts", "Technology", "Health & Wellness"];

const MasterClasses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredMasterclasses = masterclasses.filter(
    (masterclass) =>
      masterclass.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || masterclass.category === selectedCategory)
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gradient-to-br from-gray-50 to-white min-h-screen py-20"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-5xl sm:text-6xl font-bold mb-8 text-center text-gray-800">Nood Masterclasses</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-16">
          Elevate your skills and transform your life with our expert-led masterclasses. Choose from a variety of topics and embark on a journey of growth and discovery.
        </p>

        <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search masterclasses..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="text-gray-400" size={20} />
            <select
              className="bg-white border-2 border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredMasterclasses.map((masterclass, index) => (
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Clock className="mr-1" size={18} />
                    <span>{masterclass.duration}</span>
                  </div>
                  <span className="text-sm text-primary font-semibold">{masterclass.category}</span>
                </div>
              </div>
              <div className="px-6 pb-6">
                <Link
                  to={`/masterclasses/${masterclass.id}`}
                  className="block w-full bg-primary text-white text-center py-2 rounded-full font-semibold hover:bg-secondary transition duration-300"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredMasterclasses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No masterclasses found. Please try a different search or category.</p>
          </div>
        )}

        <div className="mt-16 text-center">
          <Link 
            to="/contact" 
            className="bg-primary text-white text-lg px-8 py-3 rounded-full font-semibold hover:bg-secondary transition duration-300 inline-flex items-center shadow-lg hover:shadow-xl"
          >
            Request a Masterclass <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default MasterClasses;

import React from 'react';
import { Star, Clock, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const masterclasses = [
  // Add more masterclasses here
  {
    id: 1,
    title: 'Social Media Mastery',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113',
    instructor: 'Sarah Johnson',
    rating: 4.9,
    students: 1500,
    duration: '6 weeks',
    description: 'Master the art of social media marketing and grow your online presence.',
  },
  {
    id: 2,
    title: 'AI Mastery',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    instructor: 'Dr. Alex Chen',
    rating: 4.8,
    students: 2000,
    duration: '8 weeks',
    description: 'Dive deep into artificial intelligence and machine learning concepts.',
  },
  // ... Add more masterclasses
];

const MasterClasses: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center text-gray-800">Nood Masterclasses</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-16">
          Elevate your skills with our expert-led masterclasses. Choose from a variety of topics and transform your career.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {masterclasses.map((masterclass) => (
            <div key={masterclass.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <img
                src={masterclass.image}
                alt={masterclass.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="font-bold text-2xl mb-2">{masterclass.title}</h2>
                <p className="text-gray-600 mb-4">with {masterclass.instructor}</p>
                <p className="text-gray-700 mb-4">{masterclass.description}</p>
                <div className="flex items-center mb-2">
                  <Star className="text-yellow-400 mr-1" size={18} />
                  <span className="font-semibold">{masterclass.rating}</span>
                  <span className="text-gray-600 ml-2">({masterclass.students} students)</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <Clock className="mr-1" size={18} />
                  <span>{masterclass.duration}</span>
                </div>
                <Link 
                  to={`/masterclasses/${masterclass.id}`} 
                  className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-secondary transition duration-300 inline-flex items-center"
                >
                  Learn More <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MasterClasses;

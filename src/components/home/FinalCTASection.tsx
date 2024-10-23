import React from 'react';
import { ArrowRight, Clock, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const FinalCTASection: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-primary to-secondary py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-12 sm:p-16 lg:p-20">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-8">
                Get started on your journey
              </h2>
              <p className="text-xl text-gray-600 mb-10">
                Your next big breakthrough is just 20 minutes a day away. Experience Nood's micro-learning methodology with our annual or monthly plan.
              </p>
              <div className="space-y-6 mb-10">
                {[
                  { icon: Clock, text: 'Just 20 minutes a day' },
                  { icon: Star, text: 'Expert-led courses' },
                  { icon: Users, text: 'Supportive community' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <item.icon className="text-primary mr-4" size={32} />
                    <span className="text-lg">{item.text}</span>
                  </div>
                ))}
              </div>
              <Link 
                to="/signup" 
                className="inline-block bg-primary hover:bg-secondary text-white text-lg font-bold py-4 px-10 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 shadow-lg hover:shadow-xl"
              >
                Become a member <ArrowRight className="inline-block ml-3" size={24} />
              </Link>
            </div>
            <div className="lg:w-1/2 relative">
              <img 
                src="/path/to/cta-image.jpg" 
                alt="Student learning" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white text-3xl sm:text-4xl font-bold mb-6">Join 100,000+ learners</p>
                  <div className="flex justify-center space-x-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="text-yellow-400" fill="currentColor" size={32} />
                    ))}
                  </div>
                  <p className="text-white text-xl">4.9 out of 5 stars</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalCTASection;

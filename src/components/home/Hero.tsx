import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-green-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 z-10">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Create <span className="text-primary">Your</span> Path
            </h1>
            <p className="text-gray-600 mb-8 text-lg max-w-xl">
              Empowering learners just like you to transform their skills into a thriving online business through expert-led courses and comprehensive guidance.
            </p>
            <button className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-secondary transition duration-300 flex items-center">
              Start Learning <ArrowRight className="ml-2" size={20} />
            </button>
            <div className="flex flex-wrap items-center gap-6 mt-8">
              <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <span className="text-primary">🎓</span>
                <span className="ml-2 text-sm">Audio lessons</span>
              </div>
              <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <span className="text-primary">📚</span>
                <span className="ml-2 text-sm">Career advice</span>
              </div>
              <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <span className="text-primary">🎯</span>
                <span className="ml-2 text-sm">Expert Training</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
            <div className="relative">
              <div className="absolute inset-0 bg-primary rounded-full opacity-20 blur-3xl"></div>
              <div className="relative bg-primary rounded-full w-[500px] h-[500px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80"
                  alt="Professional woman"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 shadow-lg flex items-center">
                <span className="text-primary font-bold">25K+</span>
              </div>
              <div className="absolute -bottom-2 -left-4 bg-white rounded-full px-4 py-2 shadow-lg flex items-center">
                <span className="text-primary font-bold">250+</span>
              </div>
              <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <div className="bg-white rounded-full p-3 shadow-lg">
                  <div className="w-4 h-4 rounded-full bg-primary"></div>
                </div>
              </div>
              <div className="absolute bottom-1/4 left-0 transform -translate-x-1/2">
                <div className="bg-white rounded-full p-2 shadow-lg">
                  <div className="w-3 h-3 rounded-full bg-secondary"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
import React from 'react';
import { ArrowRight, Target, Zap, Award, Star } from 'lucide-react';
import { PopupButton } from '@typeform/embed-react';

const BecomeCoachSection: React.FC = () => {
  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-800">Become A Coach</h2>
            <p className="text-gray-600 mb-8 text-xl">
              Guide and inspire others with your expertise. Join our coaching community and make a lasting impact on aspiring professionals.
            </p>
            <div className="space-y-6 mb-10">
              {[
                { icon: Target, text: 'Provide personalized guidance' },
                { icon: Zap, text: 'Empower others to achieve their goals' },
                { icon: Award, text: 'Build your reputation as an expert' }
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <item.icon className="text-secondary mr-4" size={32} />
                  <span className="text-lg">{item.text}</span>
                </div>
              ))}
            </div>
            <PopupButton
              id="01HQB8RH0C3WV37JX65EZ97VX4"
              className="bg-secondary text-white text-lg px-10 py-4 rounded-full font-semibold hover:bg-primary transition duration-300 inline-flex items-center shadow-lg hover:shadow-xl"
            >
              Apply Now <ArrowRight className="ml-3" size={24} />
            </PopupButton>
          </div>
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Coach mentoring a student" 
              className="rounded-2xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeCoachSection;

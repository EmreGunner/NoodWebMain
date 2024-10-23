import React from 'react';
import { ArrowRight, Calendar, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExploreWorkshopsSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="bg-gradient-to-br from-tertiary/10 to-primary/10 rounded-3xl p-12 sm:p-16 shadow-xl">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-800">Explore Nood Workshops / Events</h2>
            <p className="text-gray-600 mb-8 text-xl">
              Embark on enchantment at Nood's award-winning events, where connections, transformations, and wonders converge.
            </p>
            <div className="space-y-6 mb-10">
              {[
                { icon: Calendar, text: 'Attend live, interactive workshops' },
                { icon: Users, text: 'Network with like-minded professionals' },
                { icon: Star, text: 'Experience transformative learning' }
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <item.icon className="text-tertiary mr-4" size={32} />
                  <span className="text-lg">{item.text}</span>
                </div>
              ))}
            </div>
            <Link 
              to="/workshops"
              className="bg-primary text-white text-lg px-10 py-4 rounded-full font-semibold hover:bg-secondary transition duration-300 inline-flex items-center shadow-lg hover:shadow-xl"
            >
              Learn More <ArrowRight className="ml-3" size={24} />
            </Link>
          </div>
          <div className="lg:w-1/2">
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                <img 
                  key={index}
                  src={`/path/to/workshop-image-${index}.jpg`}
                  alt={`Workshop image ${index}`}
                  className="rounded-lg shadow-md w-full h-40 object-cover transform hover:scale-105 transition duration-300"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreWorkshopsSection;

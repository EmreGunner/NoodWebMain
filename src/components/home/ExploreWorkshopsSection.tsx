import React from 'react';
import { ArrowRight, Calendar, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import workshop2img from '../../assets/images/workshop2.png';
import workshop3img from '../../assets/images/workshop3.png';
const ExploreWorkshopsSection: React.FC = () => {
  const workshopImages = [
    "https://i.ibb.co/4ZCgk5tR/Untitled-design-4.webp",
    {workshop2img},
    {workshop3img}  // ... add more Unsplash image URLs as needed
  ];

  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
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
              {workshopImages.map((src, index) => (
                <img 
                  key={index}
                  src={src}
                  alt={`Workshop image ${index + 1}`}
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

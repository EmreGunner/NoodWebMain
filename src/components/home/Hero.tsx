import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-background to-primary/5 overflow-hidden">
      <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-1/2 z-10 text-center lg:text-left mb-12 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Create <span className="text-gray-800">Your</span> Path
            </h1>
            <p className="text-gray-600 mb-8 sm:mb-10 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0">
              Empowering Moroccan youth to transform their skills into successful careers and businesses through expert-led courses and a supportive community.
            </p>
            <Link 
              to="/academy" 
              className="btn-primary text-lg py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 inline-flex items-center justify-center mx-auto lg:mx-0"
            >
              Explore Courses <ArrowRight className="ml-2" size={24} />
            </Link>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8 sm:mt-10 justify-center lg:justify-start">
              {['Public Speaking', 'Career-Oriented', 'Creative Thinking'].map((item, index) => (
                <div key={index} className="flex items-center bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300">
                  <span className="text-primary text-xl mr-2">{['🎓', '📚', '🎯'][index]}</span>
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[550px] lg:h-[550px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 blur-3xl animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-primary to-secondary rounded-full overflow-hidden w-full h-full shadow-2xl">
                <img
                  src="/ExampleTemplateNood/public/external/youngstudentwomanwearingdenimjacketeyeglassesholdi1105-9htb-700h.png"
                  alt="Professional woman"
                  className="w-full h-full object-cover object-center"
                  style={{ objectPosition: '50% 20%' }}
                />
              </div>
              {[
                { text: '5K+ Online Courses', position: 'top-2 right-2 sm:top-4 sm:right-4' },
                { text: '2K+ Video Courses', position: '-bottom-2 -left-2 sm:-bottom-4 sm:-left-4' }
              ].map((item, index) => (
                <div key={index} className={`absolute ${item.position} bg-white rounded-full px-4 py-2 shadow-lg flex items-center`}>
                  <span className="text-primary font-bold text-lg sm:text-xl mr-2">{item.text.split(' ')[0]}</span>
                  <span className="text-xs sm:text-sm">{item.text.split(' ').slice(1).join(' ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16 sm:mt-20 lg:mt-24 flex flex-wrap items-center justify-center lg:justify-between">
          <div className="flex items-center mb-6 lg:mb-0">
            <span className="text-primary font-bold text-3xl sm:text-4xl mr-3">250+</span>
            <span className="text-lg sm:text-xl">Collaborations</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {['Duolingo', 'Codecov', 'User Testing', 'Magic Leap'].map((brand, index) => (
              <img key={index} src={`/ExampleTemplateNood/public/external/${brand.toLowerCase().replace(' ', '')}-logo.svg`} alt={brand} className="h-8 sm:h-10 opacity-70 hover:opacity-100 transition duration-300" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

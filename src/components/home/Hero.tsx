import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-background overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 z-10 text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Create <span className="text-primary">Your</span> Path
            </h1>
            <p className="text-gray-600 mb-8 text-lg max-w-xl mx-auto lg:mx-0">
              Empowering Moroccan youth to transform their skills into successful careers and businesses through expert-led courses and a supportive community.
            </p>
            <button className="btn-primary flex items-center mx-auto lg:mx-0">
              Explore Courses <ArrowRight className="ml-2" size={20} />
            </button>
            <div className="flex flex-wrap items-center gap-6 mt-8 justify-center lg:justify-start">
              <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <span className="text-primary">🎓</span>
                <span className="ml-2 text-sm">Public Speaking</span>
              </div>
              <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <span className="text-primary">📚</span>
                <span className="ml-2 text-sm">Career-Oriented</span>
              </div>
              <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <span className="text-primary">🎯</span>
                <span className="ml-2 text-sm">Creative Thinking</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
            <div className="relative mx-auto w-[300px] h-[300px] lg:w-[500px] lg:h-[500px]">
              <div className="absolute inset-0 bg-primary rounded-full opacity-20 blur-3xl"></div>
              <div className="relative bg-primary rounded-full overflow-hidden">
                <img
                  src="/ExampleTemplateNood/public/external/youngstudentwomanwearingdenimjacketeyeglassesholdi1105-9htb-700h.png"
                  alt="Professional woman"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 shadow-lg flex items-center">
                <span className="text-primary font-bold">5K+</span>
                <span className="ml-1 text-xs">Online Courses</span>
              </div>
              <div className="absolute -bottom-2 -left-4 bg-white rounded-full px-4 py-2 shadow-lg flex items-center">
                <span className="text-primary font-bold">2K+</span>
                <span className="ml-1 text-xs">Video Courses</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 flex flex-wrap items-center justify-center lg:justify-between">
          <div className="flex items-center mb-4 lg:mb-0">
            <span className="text-primary font-bold text-2xl mr-2">250+</span>
            <span>Collaboration</span>
          </div>
          <div className="flex space-x-4">
            <img src="/ExampleTemplateNood/public/external/vector1165-va6.svg" alt="Duolingo" className="h-8" />
            <img src="/ExampleTemplateNood/public/external/codecovlogoblack1166-gbf.svg" alt="Codecov" className="h-8" />
            <img src="/ExampleTemplateNood/public/external/usertestinglogoblack1167-poor.svg" alt="User Testing" className="h-8" />
            <img src="/ExampleTemplateNood/public/external/magicleaplogoblack1168-xfv8.svg" alt="Magic Leap" className="h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

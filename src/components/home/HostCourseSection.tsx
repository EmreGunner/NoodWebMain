import React from 'react';
import { ArrowRight, Video, Users, DollarSign } from 'lucide-react';

const HostCourseSection: React.FC = () => {
  const openTypeform = () => {
    const script = document.createElement('script');
    script.src = "//embed.typeform.com/next/embed.js";
    document.body.appendChild(script);
    script.onload = () => {
      (window as any).tf.createPopup('01HQB8RH0C3WV37JX65EZ97VX4').open();
    };
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-12 sm:p-16 shadow-xl">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-800">Host Your Course</h2>
            <p className="text-gray-600 mb-8 text-xl">
              Share your expertise with our global community. Create engaging courses and help others succeed in their learning journey.
            </p>
            <div className="space-y-6 mb-10">
              {[
                { icon: Video, text: 'Create and upload video lessons' },
                { icon: Users, text: 'Reach thousands of eager learners' },
                { icon: DollarSign, text: 'Earn money from your expertise' }
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <item.icon className="text-primary mr-4" size={32} />
                  <span className="text-lg">{item.text}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={openTypeform}
              className="bg-primary text-white text-lg px-10 py-4 rounded-full font-semibold hover:bg-secondary transition duration-300 inline-flex items-center shadow-lg hover:shadow-xl"
            >
              Start Hosting <ArrowRight className="ml-3" size={24} />
            </button>
          </div>
          <div className="lg:w-1/2">
            <img 
              src="/path/to/host-course-image.jpg" 
              alt="Host teaching online" 
              className="rounded-2xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostCourseSection;

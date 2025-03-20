import React, { useEffect } from 'react';
import { Video, Users, DollarSign } from 'lucide-react';

const HostCourseSection: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//embed.typeform.com/next/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
            <div data-tf-live="01HQB8RH0C3WV37JX65EZ97VX4"></div>
          </div>
          <div className="lg:w-1/2">
            <img 
              src="https://i.ibb.co/V0NZhhWQ/Host-ourses-3.webp" 
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

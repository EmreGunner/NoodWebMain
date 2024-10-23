import React from 'react';
import { ArrowRight, Target, Zap, Award } from 'lucide-react';

const BecomeCoachSection: React.FC = () => {
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
      <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-3xl p-12 sm:p-16 shadow-xl">
        <div className="flex flex-col lg:flex-row-reverse items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pl-12">
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
            <button 
              onClick={openTypeform}
              className="bg-secondary text-white text-lg px-10 py-4 rounded-full font-semibold hover:bg-primary transition duration-300 inline-flex items-center shadow-lg hover:shadow-xl"
            >
              Apply Now <ArrowRight className="ml-3" size={24} />
            </button>
          </div>
          <div className="lg:w-1/2">
            <img 
              src="/path/to/become-coach-image.jpg" 
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

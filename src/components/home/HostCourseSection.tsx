import React from 'react';
import { ArrowRight } from 'lucide-react';

const HostCourseSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="bg-gray-50 rounded-3xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Host Your Course Or Become A Coach</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Share your expertise with our global community. Create engaging courses and help others succeed. Apply now!
        </p>
        <button className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-secondary transition duration-300 flex items-center mx-auto">
          Apply Now <ArrowRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );
};

export default HostCourseSection;
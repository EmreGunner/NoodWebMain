import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MasterclassSection: React.FC = () => {
  useEffect(() => {
    console.log('MasterclassSection mounted');
  }, []);

  console.log('Rendering MasterclassSection');

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Nood Masterclasses</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
          Embark on a profound exploration of self with our advanced programs and empowering experiences led by world-class experts.
        </p>
        <div className="text-center">
          <Link 
            to="/masterclasses" 
            className="bg-primary text-white text-lg px-8 py-3 rounded-full font-semibold hover:bg-secondary transition duration-300 inline-flex items-center shadow-lg hover:shadow-xl"
          >
            Explore All Masterclasses <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MasterclassSection;

import React, { useEffect } from 'react';
import { ArrowRight, Star, Users, Clock } from 'lucide-react';

const MasterclassSection: React.FC = () => {
  const masterclasses = [
    {
      id: 1,
      title: 'Social Media Mastery',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113',
      instructor: 'Sarah Johnson',
      rating: 4.9,
      students: 1500,
      duration: '6 weeks',
    },
    {
      id: 2,
      title: 'AI Mastery',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
      instructor: 'Dr. Alex Chen',
      rating: 4.8,
      students: 2000,
      duration: '8 weeks',
    },
    {
      id: 3,
      title: 'Business Mentoring',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf',
      instructor: 'Emma Thompson',
      rating: 4.7,
      students: 1200,
      duration: '10 weeks',
    },
    {
      id: 4,
      title: 'Marketing Mastery',
      image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312',
      instructor: 'Michael Brown',
      rating: 4.9,
      students: 1800,
      duration: '6 weeks',
    },
  ];

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
    <div className="bg-gradient-to-br from-gray-50 to-white py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">Nood Masterclasses</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Embark on a profound exploration of self with our advanced programs and empowering experiences led by world-class experts.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {masterclasses.map((masterclass) => (
            <div key={masterclass.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <img
                src={masterclass.image}
                alt={masterclass.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{masterclass.title}</h3>
                <p className="text-gray-600 mb-4">with {masterclass.instructor}</p>
                <div className="flex items-center mb-2">
                  <Star className="text-yellow-400 mr-1" size={16} />
                  <span className="font-semibold">{masterclass.rating}</span>
                  <span className="text-gray-600 ml-2">({masterclass.students} students)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="mr-1" size={16} />
                  <span>{masterclass.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <div data-tf-live="01HQB8RH0C3WV37JX65EZ97VX4"></div>
          <button className="bg-primary text-white text-lg px-8 py-3 rounded-full font-semibold hover:bg-secondary transition duration-300 inline-flex items-center shadow-lg hover:shadow-xl">
            Explore All Masterclasses <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasterclassSection;

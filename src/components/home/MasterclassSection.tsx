import React from 'react';

const MasterclassSection: React.FC = () => {
  const masterclasses = [
    {
      id: 1,
      title: 'Social Media Mastery',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113',
    },
    {
      id: 2,
      title: 'AI Mastery',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    },
    {
      id: 3,
      title: 'Business Mentoring',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf',
    },
    {
      id: 4,
      title: 'Marketing Mastery',
      image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-center text-3xl font-bold mb-4">by Nood</h2>
      <p className="text-center text-gray-600 mb-12">
        Embark on a profound exploration of self with our advanced programs and empowering experiences.
      </p>
      <h3 className="text-2xl font-bold mb-8">Nood Masterclasses</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {masterclasses.map((masterclass) => (
          <div key={masterclass.id} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
            <img
              src={masterclass.image}
              alt={masterclass.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold">{masterclass.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasterclassSection;
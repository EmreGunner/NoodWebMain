import React from 'react';

const WhySection: React.FC = () => {
  const reasons = [
    {
      id: '01',
      title: 'Standardization',
      description: 'We standardize your processes to make them more efficient and easier to manage.',
    },
    {
      id: '02',
      title: 'Reduced Costs',
      description: 'Our solutions help reduce operational costs while maintaining high quality standards.',
    },
    {
      id: '03',
      title: 'More Customization',
      description: 'Get personalized solutions that perfectly match your specific needs and goals.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Why?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reasons.map((reason) => (
          <div key={reason.id} className="text-center">
            <div className="text-primary font-bold text-xl mb-4">{reason.id}</div>
            <h3 className="font-semibold text-xl mb-2">{reason.title}</h3>
            <p className="text-gray-600">{reason.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhySection;
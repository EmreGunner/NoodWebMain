import React from 'react';
import { Code2, BookOpen, Blocks, Sparkles } from 'lucide-react';

const PartnerLogos: React.FC = () => {
  const partners = [
    { name: '250+ Collaboration', icon: Blocks, text: '250+ Collaboration' },
    { name: 'Duolingo', icon: BookOpen, text: 'duolingo' },
    { name: 'Codecov', icon: Code2, text: 'Codecov' },
    { name: 'Magic Leap', icon: Sparkles, text: 'magic leap' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center flex-wrap gap-8">
        {partners.map((Partner) => (
          <div key={Partner.name} className="flex items-center group">
            <Partner.icon className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors duration-300" />
            <span className="ml-2 text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
              {Partner.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerLogos;
import React, { useRef, useEffect } from 'react';
import { Linkedin, Instagram } from 'lucide-react';

const heroes = [
  {
    id: 1,
    name: 'Vishen',
    title: 'Unlock Your Mind\'s Potential',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    linkedin: 'https://www.linkedin.com/in/vishen/',
    instagram: 'https://www.instagram.com/vishen/',
  },
  {
    id: 2,
    name: 'Maye Musk',
    title: '5 Rules for Life',
    image: 'https://images.unsplash.com/photo-1531369201-4f7be267b1de',
    linkedin: 'https://www.linkedin.com/in/mayemusk/',
    instagram: 'https://www.instagram.com/mayemusk/',
  },
  {
    id: 3,
    name: 'Neale Donald Walsch',
    title: 'Awaken The Species',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    linkedin: 'https://www.linkedin.com/in/neale-donald-walsch/',
    instagram: 'https://www.instagram.com/nealedonaldwalsch/',
  },
  {
    id: 4,
    name: 'Vishen',
    title: 'Unlock Your Mind\'s Potential',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    linkedin: 'https://www.linkedin.com/in/vishen/',
    instagram: 'https://www.instagram.com/vishen/',
  },
  {
    id: 5,
    name: 'Maye Musk',
    title: '5 Rules for Life',
    image: 'https://images.unsplash.com/photo-1531369201-4f7be267b1de',
    linkedin: 'https://www.linkedin.com/in/mayemusk/',
    instagram: 'https://www.instagram.com/mayemusk/',
  },
  {
    id: 6,
    name: 'Neale Donald Walsch',
    title: 'Awaken The Species',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    linkedin: 'https://www.linkedin.com/in/neale-donald-walsch/',
    instagram: 'https://www.instagram.com/nealedonaldwalsch/',
  },
];

const MeetHeroes: React.FC = () => {
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const topRow = topRowRef.current;
    const bottomRow = bottomRowRef.current;

    let topScrollPosition = 0;
    let bottomScrollPosition = 0;

    const animateTopRow = () => {
      if (topRow) {
        topScrollPosition += 0.2;
        if (topScrollPosition >= topRow.scrollWidth / 2) {
          topScrollPosition = 0;
        }
        topRow.scrollLeft = topScrollPosition;
      }
      requestAnimationFrame(animateTopRow);
    };

    const animateBottomRow = () => {
      if (bottomRow) {
        bottomScrollPosition -= 0.2;
        if (bottomScrollPosition <= 0) {
          bottomScrollPosition = bottomRow.scrollWidth / 2;
        }
        bottomRow.scrollLeft = bottomScrollPosition;
      }
      requestAnimationFrame(animateBottomRow);
    };

    const topAnimationId = requestAnimationFrame(animateTopRow);
    const bottomAnimationId = requestAnimationFrame(animateBottomRow);

    return () => {
      cancelAnimationFrame(topAnimationId);
      cancelAnimationFrame(bottomAnimationId);
    };
  }, []);

  return (
    <div className="bg-gray-100 py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-10">Meet the Heroes</h2>
        <div className="space-y-6 sm:space-y-8">
          <div className="overflow-hidden" ref={topRowRef}>
            <div className="flex space-x-4 sm:space-x-6" style={{ width: `${heroes.length * 220}px` }}>
              {heroes.map((hero) => (
                <div key={hero.id} className="flex-shrink-0 w-[200px] sm:w-[250px] md:w-[280px]">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                    <div className="relative aspect-w-3 aspect-h-4">
                      <img
                        src={hero.image}
                        alt={hero.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-2 left-2 right-2 text-white">
                        <h3 className="font-bold text-base sm:text-lg mb-1">{hero.name}</h3>
                        <p className="text-xs sm:text-sm">{hero.title}</p>
                      </div>
                    </div>
                    <div className="p-2 sm:p-4 flex justify-center space-x-4">
                      <a
                        href={hero.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Linkedin size={20} />
                      </a>
                      <a
                        href={hero.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-800"
                      >
                        <Instagram size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden" ref={bottomRowRef}>
            <div className="flex space-x-4 sm:space-x-6" style={{ width: `${heroes.length * 220}px` }}>
              {heroes.map((hero) => (
                <div key={hero.id} className="flex-shrink-0 w-[200px] sm:w-[250px] md:w-[280px]">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                    <div className="relative aspect-w-3 aspect-h-4">
                      <img
                        src={hero.image}
                        alt={hero.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-2 left-2 right-2 text-white">
                        <h3 className="font-bold text-base sm:text-lg mb-1">{hero.name}</h3>
                        <p className="text-xs sm:text-sm">{hero.title}</p>
                      </div>
                    </div>
                    <div className="p-2 sm:p-4 flex justify-center space-x-4">
                      <a
                        href={hero.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Linkedin size={20} />
                      </a>
                      <a
                        href={hero.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-800"
                      >
                        <Instagram size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetHeroes;

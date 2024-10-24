import React, { useRef, useEffect } from 'react';
import MeetHeroCard from '../MeetHeroCard';

const heroes = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Marketing Expert',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    linkedin: '#',
    instagram: '#',
    course: 'Digital Marketing Mastery',
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Tech Entrepreneur',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    linkedin: '#',
    instagram: '#',
    course: 'Startup Success Strategies',
  },
  {
    id: 3,
    name: 'Neale Donald Walsch',
    title: 'Awaken The Species',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    linkedin: 'https://www.linkedin.com/in/neale-donald-walsch/',
    instagram: 'https://www.instagram.com/nealedonaldwalsch/',
    course: 'Spiritual Awakening Journey',
  },
  {
    id: 4,
    name: 'Vishen',
    title: 'Unlock Your Mind\'s Potential',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    linkedin: 'https://www.linkedin.com/in/vishen/',
    instagram: 'https://www.instagram.com/vishen/',
    course: 'Mindvalley Mastery',
  },
  {
    id: 5,
    name: 'Maye Musk',
    title: '5 Rules for Life',
    image: 'https://images.unsplash.com/photo-1531369201-4f7be267b1de',
    linkedin: 'https://www.linkedin.com/in/mayemusk/',
    instagram: 'https://www.instagram.com/mayemusk/',
    course: 'Life Optimization Blueprint',
  },
  {
    id: 6,
    name: 'Neale Donald Walsch',
    title: 'Awaken The Species',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    linkedin: 'https://www.linkedin.com/in/neale-donald-walsch/',
    instagram: 'https://www.instagram.com/nealedonaldwalsch/',
    course: 'Conversations with God',
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
            <div className="flex space-x-4 sm:space-x-6" style={{ width: `${heroes.length * 240}px` }}>
              {heroes.map((hero) => (
                <div key={hero.id} className="flex-shrink-0">
                  <MeetHeroCard {...hero} />
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden" ref={bottomRowRef}>
            <div className="flex space-x-4 sm:space-x-6" style={{ width: `${heroes.length * 240}px` }}>
              {heroes.map((hero) => (
                <div key={hero.id} className="flex-shrink-0">
                  <MeetHeroCard {...hero} />
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

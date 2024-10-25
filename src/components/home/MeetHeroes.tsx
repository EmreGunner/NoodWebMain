import React, { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import MeetHeroCard from '../MeetHeroCard';
import styled from 'styled-components';

const heroes = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Marketing Expert',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    linkedin: '#',
    course: 'Digital Marketing Mastery',
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Tech Entrepreneur',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    linkedin: '#',
    course: 'Startup Success Strategies',
  },
  {
    id: 3,
    name: 'Neale Donald Walsch',
    title: 'Awaken The Species',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    linkedin: 'https://www.linkedin.com/in/neale-donald-walsch/',
    course: 'Spiritual Awakening Journey',
  },
  {
    id: 4,
    name: 'Vishen',
    title: 'Unlock Your Mind\'s Potential',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    linkedin: 'https://www.linkedin.com/in/vishen/',
    course: 'Mindvalley Mastery',
  },
  {
    id: 5,
    name: 'Maye Musk',
    title: '5 Rules for Life',
    image: 'https://images.unsplash.com/photo-1531369201-4f7be267b1de',
    linkedin: 'https://www.linkedin.com/in/mayemusk/',
    course: 'Life Optimization Blueprint',
  },
  {
    id: 6,
    name: 'Neale Donald Walsch',
    title: 'Awaken The Species',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    linkedin: 'https://www.linkedin.com/in/neale-donald-walsch/',
    course: 'Conversations with God',
  },
];

const ScrollContainer = styled.div`
  overflow-x: hidden;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;

const ScrollContent = styled.div`
  display: flex;
  transition: transform 0.5s ease;
`;

const MeetHeroes: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current!.offsetLeft);
    setScrollLeft(scrollRef.current!.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current!.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer && inView) {
      let animationFrameId: number;
      let lastTimestamp = 0;
      const fps = 60;
      const interval = 1000 / fps;

      const animate = (timestamp: number) => {
        if (timestamp - lastTimestamp >= interval) {
          lastTimestamp = timestamp;
          if (!isHovered && !isDragging) {
            scrollContainer.scrollLeft += 1;
            if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
              scrollContainer.scrollLeft = 0;
            }
          }
        }
        animationFrameId = requestAnimationFrame(animate);
      };

      animationFrameId = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [inView, isHovered, isDragging]);

  return (
    <section className="bg-white shadow-md py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100 opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Meet Our Heroes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert tutors dedicated to transforming lives through knowledge and inspiration.
          </p>
        </div>
        <div className="relative mb-12">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 py-2 bg-white text-lg font-semibold text-primary rounded-full shadow-sm">
              Featured Experts
            </span>
          </div>
        </div>
        <ScrollContainer 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            handleMouseUp();
            setIsHovered(false);
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseMove={handleMouseMove}
        >
          <ScrollContent 
            style={{ 
              width: `${heroes.length * 320 * 2}px`,
            }}
            ref={ref}
          >
            {[...heroes, ...heroes].map((hero, index) => (
              <div key={`${hero.id}-${index}`} className="flex-shrink-0 w-[300px] mx-2">
                <MeetHeroCard {...hero} />
              </div>
            ))}
          </ScrollContent>
        </ScrollContainer>
      </div>
    </section>
  );
};

export default React.memo(MeetHeroes);

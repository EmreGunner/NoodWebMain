import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MeetHeroCard from '../MeetHeroCard';
import styled from 'styled-components';
import { useWindowSize } from '../../hooks/useWindowSize';

const CarouselWrapper = styled.div`
  contain: content;
  position: relative;
  overflow: hidden;
  padding: 2rem 0;
  margin: 0 auto;
  max-width: 1400px;
`;

const CarouselTrack = styled.div`
  display: flex;
  gap: 2rem;
  transform: translateZ(0);
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
  margin: 0 auto;
  padding: 0 calc(50% - 150px);
  
  @media (min-width: 640px) {
    padding: 0 calc(50% - 300px);
  }
  
  @media (min-width: 1024px) {
    padding: 0 calc(50% - 450px);
  }
`;

const NavigationButton = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${props => props.direction === 'left' ? 'left: 1rem;' : 'right: 1rem;'}
  transform: translateY(-50%);
  background: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 10;
  opacity: 0.8;
  cursor: pointer;

  &:hover {
    opacity: 1;
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: translateY(-50%);
  }
`;

const CardWrapper = styled.div`
  flex: 0 0 300px;
  display: flex;
  justify-content: center;
`;

// Define heroes data
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
] as const;

const MeetHeroes: React.FC = () => {
  const { width } = useWindowSize();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '100px',
  });

  const visibleItems = useCallback(() => {
    if (width < 640) return 1;
    if (width < 1024) return 2;
    return 3;
  }, [width])();

  const maxIndex = heroes.length - visibleItems;

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return;

    const newIndex = direction === 'left' 
      ? Math.max(currentIndex - 1, 0)
      : Math.min(currentIndex + 1, maxIndex);

    setCurrentIndex(newIndex);
    
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        const offset = newIndex * (320); // 300px card width + 20px gap
        scrollRef.current.style.transform = `translateX(-${offset}px)`;
      }
    });
  }, [currentIndex, maxIndex]);

  // Automatic scroll with smooth transition
  useEffect(() => {
    if (!inView || isHovered) return;

    const interval = setInterval(() => {
      if (currentIndex >= maxIndex) {
        setCurrentIndex(0);
        if (scrollRef.current) {
          // Smooth reset to start
          scrollRef.current.style.transition = 'none';
          scrollRef.current.style.transform = 'translateX(0)';
          // Force reflow
          scrollRef.current.offsetHeight;
          scrollRef.current.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        }
      } else {
        scroll('right');
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, inView, isHovered, maxIndex, scroll]);

  // Reset position when window is resized
  useEffect(() => {
    if (scrollRef.current) {
      const offset = currentIndex * 320;
      scrollRef.current.style.transform = `translateX(-${offset}px)`;
    }
  }, [width, currentIndex]);

  return (
    <section className="bg-white shadow-md py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100 opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Meet Our Heroes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert tutors dedicated to transforming lives through knowledge and inspiration.
          </p>
        </div>

        <CarouselWrapper>
          <NavigationButton
            direction="left"
            onClick={() => scroll('left')}
            disabled={currentIndex === 0}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </NavigationButton>

          <CarouselTrack
            ref={scrollRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {heroes.map((hero) => (
              <CardWrapper key={hero.id}>
                <MeetHeroCard {...hero} />
              </CardWrapper>
            ))}
          </CarouselTrack>

          <NavigationButton
            direction="right"
            onClick={() => scroll('right')}
            disabled={currentIndex === maxIndex}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </NavigationButton>
        </CarouselWrapper>
      </div>
    </section>
  );
};

export default React.memo(MeetHeroes);

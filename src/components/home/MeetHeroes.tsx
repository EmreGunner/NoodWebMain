import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
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
  overflow-x: auto;
  cursor: grab;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  &:active {
    cursor: grabbing;
  }

  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
`;

const ScrollContent = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1rem 0.5rem;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  
  &::before {
    content: '';
    min-width: calc((100% - 300px) / 2);
  }
  
  &::after {
    content: '';
    min-width: calc((100% - 300px) / 2);
  }

  transform: translateZ(0);
  will-change: transform;
`;

const MeetHeroes: React.FC = () => {
  // Optimize Intersection Observer settings
  const [ref, inView] = useInView({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: false, // Changed to false to handle visibility changes
    delay: 100, // Add delay to reduce unnecessary triggers
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleHeroes, setVisibleHeroes] = useState(heroes.slice(0, 3));
  const animationRef = useRef<number>();
  const lastScrollRef = useRef<number>(0);

  // Increased scroll speed
  const smoothScroll = useCallback(() => {
    if (!scrollRef.current || isHovered || isDragging) return;

    const currentScroll = scrollRef.current.scrollLeft;
    const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    const scrollStep = 1.2; // Increased scroll speed from 0.5 to 1.2

    if (currentScroll >= maxScroll) {
      // Smooth reset to start with easing
      scrollRef.current.scrollTo({
        left: 0,
        behavior: 'auto'
      });
      lastScrollRef.current = 0;
    } else {
      scrollRef.current.scrollLeft = currentScroll + scrollStep;
      lastScrollRef.current = currentScroll + scrollStep;
    }

    if (inView) { // Only request animation frame if in view
      animationRef.current = requestAnimationFrame(smoothScroll);
    }
  }, [isHovered, isDragging, inView]);

  // Optimized animation control based on visibility
  useEffect(() => {
    if (!inView) {
      // Cancel animation when not in view
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    if (!isHovered && !isDragging) {
      animationRef.current = requestAnimationFrame(smoothScroll);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [inView, isHovered, isDragging, smoothScroll]);

  // Optimized progressive loading
  useEffect(() => {
    if (!inView) return;

    const loadMoreHeroes = () => {
      setVisibleHeroes(prev => {
        if (prev.length >= heroes.length) return prev;
        return [...heroes.slice(0, prev.length + 1)];
      });
    };

    const interval = setInterval(loadMoreHeroes, 150); // Slightly faster loading
    return () => clearInterval(interval);
  }, [inView]);

  // Optimized drag handling
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollRef.current || !inView) return; // Don't handle drag if not in view
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  }, [inView]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjusted sensitivity
    scrollRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  // Optimized card rendering with visibility check
  const visibleCards = useMemo(() => {
    if (!inView) return null; // Don't render if not in view

    return [...visibleHeroes, ...visibleHeroes].map((hero, index) => (
      <div 
        key={`${hero.id}-${index}`} 
        className="flex-shrink-0"
        style={{ 
          width: '300px',
          transform: 'translateZ(0)',
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out', // Faster opacity transition
        }}
      >
        <MeetHeroCard {...hero} />
      </div>
    ));
  }, [visibleHeroes, inView]);

  return (
    <section 
      className="bg-white py-20 sm:py-32 relative overflow-hidden"
      ref={ref} // Move ref to section for better visibility detection
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100 opacity-50"></div>
      <div className="relative max-w-[100vw] mx-auto">
        <div className="text-center mb-16 px-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Meet Our Heroes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert tutors dedicated to transforming lives through knowledge and inspiration.
          </p>
        </div>
        
        {inView && ( // Only render ScrollContainer when in view
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
            <ScrollContent>
              {visibleCards}
            </ScrollContent>
          </ScrollContainer>
        )}
      </div>
    </section>
  );
};

export default React.memo(MeetHeroes);
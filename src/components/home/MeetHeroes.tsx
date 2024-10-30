import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import MeetHeroCard from '../MeetHeroCard';

// Reduced to 4 heroes
const HEROES = [
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
    title: "Unlock Your Mind's Potential",
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    linkedin: 'https://www.linkedin.com/in/vishen/',
    course: 'Mindvalley Mastery',
  },
];

const MeetHeroes = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Memoized next index calculation
  const getNextIndex = useCallback((current: number) => {
    return (current + 1) % HEROES.length;
  }, []);

  // Memoized scroll handler
  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;
    
    const scrollTo = index * (isMobile ? 300 : scrollRef.current.offsetWidth / HEROES.length);
    scrollRef.current.scrollTo({
      left: scrollTo,
      behavior: 'smooth'
    });
  }, [isMobile]);

  // Combined auto scroll animation for both mobile and desktop
  useEffect(() => {
    if (!inView || isDragging) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    const autoScroll = () => {
      setCurrentIndex(prev => {
        const next = getNextIndex(prev);
        scrollToIndex(next);
        return next;
      });
    };

    intervalRef.current = setInterval(autoScroll, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [inView, isDragging, getNextIndex, scrollToIndex]);

  // Resize handler with debounce
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Optimized touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!isMobile) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  }, [isMobile]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current || !isMobile) return;
    e.preventDefault();
    const x = e.touches[0].clientX;
    const walk = (startX - x) * 2;
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollLeft + walk;
      }
    });
  }, [isDragging, startX, scrollLeft, isMobile]);

  const handleTouchEnd = useCallback(() => {
    if (!isMobile || !scrollRef.current) return;
    setIsDragging(false);
    
    const currentScroll = scrollRef.current.scrollLeft;
    const cardWidth = 300;
    const newIndex = Math.round(currentScroll / cardWidth);
    
    requestAnimationFrame(() => {
      setCurrentIndex(Math.max(0, Math.min(newIndex, HEROES.length - 1)));
      scrollToIndex(newIndex);
    });
  }, [isMobile, scrollToIndex]);

  return (
    <section 
      ref={ref}
      className="bg-white py-20 sm:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100 opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Meet Our Heroes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert tutors dedicated to transforming lives through knowledge and inspiration.
          </p>
        </div>

        {isMobile ? (
          // Mobile view - Horizontal scroll
          <div 
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex gap-6 px-4">
              {HEROES.map((hero, index) => (
                <div
                  key={hero.id}
                  className="flex-shrink-0"
                  style={{
                    scrollSnapAlign: 'center',
                    opacity: inView ? 1 : 0,
                    transform: `translateX(${isDragging ? 0 : '0'})`,
                    transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-out'
                  }}
                >
                  <MeetHeroCard {...hero} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Desktop and Tablet view with responsive grid
          <div className="hidden md:block">
            <div className={`
              grid gap-6
              md:grid-cols-2 lg:grid-cols-4
              md:gap-4 lg:gap-6
              md:max-w-3xl lg:max-w-none
              mx-auto
              ${window.innerWidth >= 768 && window.innerWidth < 1024 ? 'justify-items-center' : ''}
            `}>
              {HEROES.map((hero, index) => (
                <div
                  key={hero.id}
                  className={`
                    transform transition-all duration-500
                    md:max-w-[280px] 
                    ${currentIndex === index ? 'scale-105 opacity-100' : 'scale-95 opacity-70'}
                  `}
                >
                  <MeetHeroCard {...hero} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {HEROES.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-primary w-4' : 'bg-gray-300'
              }`}
              onClick={() => {
                setCurrentIndex(index);
                if (isMobile && scrollRef.current) {
                  scrollRef.current.scrollTo({
                    left: index * 300,
                    behavior: 'smooth'
                  });
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(MeetHeroes);
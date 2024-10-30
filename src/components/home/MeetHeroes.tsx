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
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mobile auto scroll animation
  useEffect(() => {
    if (!inView || isDragging || !isMobile) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const nextIndex = (currentIndex + 1) % HEROES.length;
        setCurrentIndex(nextIndex);
        scrollRef.current.scrollTo({
          left: nextIndex * 300,
          behavior: 'smooth'
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [inView, isDragging, currentIndex, isMobile]);

  // Desktop auto scroll animation
  useEffect(() => {
    if (!inView || isDragging || isMobile) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HEROES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [inView, isDragging, isMobile]);

  // Mobile touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!isMobile) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  }, [isMobile]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current || !isMobile) return;
    const x = e.touches[0].clientX;
    const walk = (startX - x) * 2;
    scrollRef.current.scrollLeft = scrollLeft + walk;
  }, [isDragging, startX, scrollLeft, isMobile]);

  const handleTouchEnd = useCallback(() => {
    if (!isMobile) return;
    setIsDragging(false);
    if (!scrollRef.current) return;
    const cardWidth = 300;
    const newIndex = Math.round(scrollRef.current.scrollLeft / cardWidth);
    setCurrentIndex(Math.max(0, Math.min(newIndex, HEROES.length - 1)));
  }, [isMobile]);

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
          // Mobile view - keep exactly as before
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
          // Desktop view - new implementation
          <div className="hidden md:block">
            <div className="grid grid-cols-4 gap-6">
              {HEROES.map((hero, index) => (
                <div
                  key={hero.id}
                  className={`transform transition-all duration-500 ${
                    currentIndex === index 
                      ? 'scale-105 opacity-100' 
                      : 'scale-95 opacity-70'
                  }`}
                >
                  <MeetHeroCard {...hero} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dots indicator - visible on both mobile and desktop */}
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
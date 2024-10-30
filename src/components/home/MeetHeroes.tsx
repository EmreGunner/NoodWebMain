import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import MeetHeroCard from '../MeetHeroCard';

// Move heroes data outside component to prevent re-creation
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

const MeetHeroes = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const dragTimeout = useRef(null);
  const scrollTimeout = useRef(null);
  const animationFrame = useRef(null);

  // Optimized intersection observer with reduced options
  const [ref, inView] = useInView({
    threshold: 0.1,
    rootMargin: '100px',
  });

  // Optimized scroll handler using RAF and debouncing
  const handleScroll = useCallback(() => {
    if (!scrollRef.current || !inView) return;

    const currentScroll = scrollRef.current.scrollLeft;
    const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

    if (currentScroll >= maxScroll) {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        scrollRef.current?.scrollTo({ left: 0, behavior: 'auto' });
      }, 100);
      return;
    }

    scrollRef.current.scrollLeft += 1;
    animationFrame.current = requestAnimationFrame(handleScroll);
  }, [inView]);

  // Optimized mouse event handlers
  const handleMouseDown = useCallback((e) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleDragEnd = useCallback(() => {
    if (dragTimeout.current) clearTimeout(dragTimeout.current);
    dragTimeout.current = setTimeout(() => {
      setIsDragging(false);
    }, 100);
  }, []);

  // Optimized animation control
  useEffect(() => {
    if (!inView || isDragging) {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      return;
    }

    animationFrame.current = requestAnimationFrame(handleScroll);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      if (dragTimeout.current) {
        clearTimeout(dragTimeout.current);
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [inView, isDragging, handleScroll]);

  // Early return if not in view
  if (!inView) {
    return <section ref={ref} className="bg-white py-20 sm:py-32 relative overflow-hidden" />;
  }

  return (
    <section 
      ref={ref}
      className="bg-white py-20 sm:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100 opacity-50" />
      <div className="relative max-w-[100vw] mx-auto">
        <div className="text-center mb-16 px-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Meet Our Heroes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert tutors dedicated to transforming lives through knowledge and inspiration.
          </p>
        </div>

        <div 
          ref={scrollRef}
          className="overflow-x-auto cursor-grab active:cursor-grabbing touch-pan-x"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            perspective: '1000px'
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onMouseMove={handleMouseMove}
        >
          <div 
            className="flex gap-6 px-2 py-4"
            style={{
              transform: 'translateZ(0)',
              willChange: 'transform',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {[...HEROES, ...HEROES].map((hero, index) => (
              <div
                key={`${hero.id}-${index}`}
                className="flex-shrink-0 w-[300px]"
                style={{
                  transform: 'translateZ(0)',
                  opacity: 1,
                  transition: 'opacity 0.3s ease-in-out'
                }}
              >
                <MeetHeroCard {...hero} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(MeetHeroes);
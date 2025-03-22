import React, { useCallback, useState, useRef, useMemo, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import MeetHeroCard from '../MeetHeroCard';
import '../../styles/MeetHeroCard.css';

// Define the Hero interface
interface Hero {
  id: number;
  name: string;
  title: string;
  image: string;
  linkedin: string;
  course: string;
}

// Move heroes data outside to prevent recreation on each render
const HEROES: Hero[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Marketing Expert',
    image: 'https://i.postimg.cc/KjqZxGPK/People-2.png',
    linkedin: '#',
    course: 'Digital Marketing Mastery',
  },
  {
    id: 3,
    name: 'Neale Donald Walsch',
    title: 'Awaken The Species',
    image: 'https://i.postimg.cc/sxDVkQhd/People-1.png',
    linkedin: 'https://www.linkedin.com/in/neale-donald-walsch/', 
    course: 'Spiritual Awakening',
  },
  {
    id: 4,
    name: 'Vishen',
    title: "Unlock Your Mind's Potential",
    image: 'https://i.postimg.cc/NGpG143g/People.png',
    linkedin: 'https://www.linkedin.com/in/vishen/',
    course: 'Mindvalley Mastery',
  },
];

interface State {
  currentIndex: number;
  isDragging: boolean;
  startX?: number;
  scrollLeft?: number;
}

const MeetHeroes: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>({
    currentIndex: 0,
    isDragging: false
  });

  // Calculate isMobile once on mount and when window size changes
  const [isMobile, setIsMobile] = useState(false);
  
  // Handle window resize using a resize observer instead of event listeners
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check initially
    checkMobile();
    
    // Set up observer
    const resizeObserver = new ResizeObserver(() => {
      checkMobile();
    });
    
    resizeObserver.observe(document.body);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Use IntersectionObserver to detect when component is in view
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true // Only trigger once for better performance
  });

  // Optimized scroll handler using requestAnimationFrame
  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;
    
    const cardWidth = isMobile ? 300 : scrollRef.current.offsetWidth / HEROES.length;
    const scrollTo = index * cardWidth;
    
    // Use requestAnimationFrame for smoother scrolling
    window.requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          left: scrollTo,
          behavior: 'smooth'
        });
      }
    });
  }, [isMobile]);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!isMobile) return;
    const touch = e.touches[0];
    setState(prev => ({ 
      ...prev, 
      isDragging: true, 
      startX: touch.clientX, 
      scrollLeft: scrollRef.current?.scrollLeft || 0 
    }));
  }, [isMobile]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!state.isDragging || !scrollRef.current || !isMobile || typeof state.startX !== 'number' || typeof state.scrollLeft !== 'number') return;
    e.preventDefault();
    
    const x = e.touches[0].clientX;
    const walk = (state.startX - x) * 2;
    
    // Use requestAnimationFrame for smoother scrolling
    window.requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = state.scrollLeft + walk;
      }
    });
  }, [state, isMobile]);

  const handleTouchEnd = useCallback(() => {
    if (!isMobile || !scrollRef.current) return;
    
    // Calculate which card is closest to the viewport
    const currentScroll = scrollRef.current.scrollLeft;
    const cardWidth = 300;
    const newIndex = Math.round(currentScroll / cardWidth);
    
    // Update state and scroll to the closest card
    setState(prev => ({ 
      ...prev, 
      isDragging: false,
      currentIndex: Math.max(0, Math.min(newIndex, HEROES.length - 1)) 
    }));
    
    scrollToIndex(newIndex);
  }, [isMobile, scrollToIndex]);

  return (
    <section ref={ref} className="bg-white py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100 opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Meet Our Trainers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert tutors dedicated to transforming lives through knowledge and inspiration.
          </p>
        </div>

        {isMobile ? (
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
              {HEROES.map((hero) => (
                <div
                  key={hero.id}
                  className="flex-shrink-0"
                  style={{ scrollSnapAlign: 'center' }}
                >
                  <MeetHeroCard {...hero} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HEROES.map((hero) => (
              <div key={hero.id} className="transform transition-all duration-500">
                <MeetHeroCard {...hero} />
              </div>
            ))}
          </div>
        )}

        {/* Only render dots for mobile view */}
        {isMobile && (
          <div className="flex justify-center gap-2 mt-6">
            {HEROES.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  state.currentIndex === index ? 'bg-primary w-4' : 'bg-gray-300'
                }`}
                onClick={() => {
                  setState(prev => ({ ...prev, currentIndex: index }));
                  scrollToIndex(index);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(MeetHeroes);
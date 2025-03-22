import React, { memo, useCallback, useState, useRef } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import noodLogo from '/src/assets/nood.svg';
import '../styles/MeetHeroCard.css';
import { Link } from 'react-router-dom';

// Define the props interface
interface MeetHeroCardProps {
  name: string;
  title: string;
  image: string;
  linkedin: string;
  course: string;
}

// Course URL mapping
const COURSE_URLS: Record<string, string> = {
  'Fashion Business': '/courses/fashion-business-masterclass',
  'E-commerce Mastery': '/courses/ecommerce-mastery',
  'UGC Creation': '/courses/ugc-creation-masterclass',
};

const MeetHeroCard: React.FC<MeetHeroCardProps> = memo(({ name, title, image, linkedin, course }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Use a single handler for hover without requestAnimationFrame to maintain smooth transitions
  const handleHover = useCallback((hovering: boolean) => {
    setIsHovered(hovering);
  }, []);

  // Prevent event bubbling with a single handler
  const handleSocialClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  // Course URL fallback with default
  const courseUrl = COURSE_URLS[course] || '/courses';

  // Optimized image loading props
  const imageProps = {
    loading: "lazy" as const,
    decoding: "async" as const,
    width: 280,
    height: 280,
    threshold: 100,
    effect: "opacity" as const,
  };

  return (
    <div
      className="hero-card-wrapper"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      <div className="card" ref={cardRef}>
        <LazyLoadImage
          src={noodLogo}
          alt="Nood Logo"
          className={`nood-logo ${isHovered ? 'visible' : ''}`}
          loading="lazy"
          effect="blur"
        />
        <div className="profile-pic">
          <LazyLoadImage
            src={image}
            alt={name}
            {...imageProps}
            placeholder={
              <div className="animate-pulse bg-gray-200 w-full h-full" />
            }
          />
        </div>
        
        <div className="course-info" style={{ opacity: isHovered ? 1 : 0 }}>
          <h3>{course}</h3>
        </div>
        
        <div className={`bottom ${isHovered ? 'expanded' : ''}`}>
          <div className="content">
            <span className="name">{name}</span>
            <span className="about-me">{title}</span>
          </div>
          <div className="bottom-bottom">
            <div className="social-links-container">
              <a 
                href={linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                onClick={handleSocialClick}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  width="24"
                  height="24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
            <Link 
              to={courseUrl}
              className="button"
              onClick={handleSocialClick}
            >
              See Course
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

MeetHeroCard.displayName = 'MeetHeroCard';

export default MeetHeroCard;

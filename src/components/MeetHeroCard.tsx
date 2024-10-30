import React, { memo, useCallback, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import noodLogo from '/src/assets/nood.svg';

// Move styled component definition outside component to prevent recreation
const StyledWrapper = styled.div`
  .card {
    width: 280px;
    height: 280px;
    background: white;
    border-radius: 32px;
    padding: 3px;
    position: relative;
    box-shadow: 
      0 5px 20px rgba(0, 0, 0, 0.1),
      0 1px 3px rgba(0, 0, 0, 0.05);
    transition: all 0.5s ease-in-out;
    transform: translate3d(0, 0, 0);
    will-change: transform;
  }

  .card .profile-pic {
    position: absolute;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    top: 3px;
    left: 3px;
    border-radius: 29px;
    z-index: 1;
    border: 0px solid #84bb75;
    overflow: hidden;
    transition: all 0.5s ease-in-out 0.2s, z-index 0.5s ease-in-out 0.2s;
  }

  .card .profile-pic img,
  .card .profile-pic span {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center !important;
    transform: scale(1) !important; /* Initial scale to ensure full coverage */
    transition: all 0.5s ease-in-out 0s !important;
  }

  .card .bottom {
    position: absolute;
    bottom: 3px;
    left: 3px;
    right: 3px;
    background: #84bb75;
    top: 80%;
    border-radius: 29px;
    z-index: 2;
    box-shadow: rgba(96, 75, 74, 0.188) 0px 5px 5px 0px inset;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
  }

  .card .bottom .content {
    position: absolute;
    bottom: 0;
    left: 1.5rem;
    right: 1.5rem;
    height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 3rem;
  }

  .card .bottom .content .name {
    display: block;
    font-size: 1.2rem;
    color: white;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .card .bottom .content .about-me {
    display: block;
    font-size: 0.9rem;
    color: white;
    margin-bottom: 0.5rem;
  }

  .card .bottom .bottom-bottom {
    position: absolute;
    bottom: 0.5em;
    left: 1.5rem;
    right: 1.5rem;
    display: flex;
    align-items: bottom;
    justify-content: space-between;
    margin-top: auto;
  }

  .card .bottom .bottom-bottom .social-links-container {
    display: flex;
    gap: 1rem;
  }

  .card .bottom .bottom-bottom .social-links-container svg {
    height: 24px;
    fill: white;
    filter: drop-shadow(0 5px 5px rgba(165, 132, 130, 0.133));
    opacity: 0;
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  }

  .card:hover .bottom .bottom-bottom .social-links-container svg {
    opacity: 1;
  }

  .card .bottom .bottom-bottom .social-links-container svg:hover {
    fill: #4e9350;
    transform: scale(1.2);
  }

  .card .bottom .bottom-bottom .button {
    background: white;
    color: #84bb75;
    border: none;
    border-radius: 25px;
    align-self: center;
    justify-self: bottom;
    font-size: 0.8rem;
    padding: 0.6rem 1rem;
    box-shadow: rgba(165, 132, 130, 0.133) 0px 5px 5px 0px;
    transition: all 0.3s ease-in-out;
  }

  .card .bottom .bottom-bottom .button:hover {
    background: #4e9350;
    color: white;
    transform: scale(1.05);
  }

  .card:hover {
    transform: translate3d(0, -5px, 0);
  }

  .card:hover .bottom {
    top: 20%;
    border-radius: 80px 29px 29px 29px;
    transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s;
  }

  .card:hover .profile-pic {
    width: 100px;
    height: 100px;
    aspect-ratio: 1;
    top: 10px;
    left: 10px;
    border-radius: 50%;
    z-index: 3;
    border: 7px solid #84bb75;
    box-shadow: rgba(96, 75, 74, 0.188) 0px 5px 5px 0px;
    transition: all 0.5s ease-in-out, z-index 0.5s ease-in-out 0.1s;
  }

  .card:hover .profile-pic img,
  .card:hover .profile-pic span {
    transform: scale(1) !important; /* Scale back to normal on hover */
    transition: all 0.5s ease-in-out 0.5s !important;
  }

  .course-info {
    position: absolute;
    top: 40%;
    left: 1.5rem;
    right: 1.5rem;
    text-align: center;
    color: #84bb75;
    z-index: 4;
    opacity: 0;
    transition: opacity 1s ease-in-out; /* Slower transition */
    background-color: rgba(255, 255, 255, 0.9);
    padding: 0.7rem;
    border-radius: 15px;
    pointer-events: none;
  }

  .card:hover .course-info {
    opacity: 1;
  }

  .course-info h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
  }

  .card .nood-logo {
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: 30px;
    height: 30px;
    z-index: 5;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .card:hover .nood-logo {
    opacity: 1;
  }
`;

// Move styled components outside the component and memoize them
const StyledCard = memo(styled.div`
  // ... styles
`);

// Use CSS variables for frequently changing values
interface StyledProps {
  expanded: boolean;
}

const dynamicStyles = css<StyledProps>`
  --card-height: ${({ expanded }) => expanded ? '400px' : '280px'};
  height: var(--card-height);
`;

interface MeetHeroCardProps {
  name: string;
  title: string;
  image: string;
  linkedin: string;
  course: string;
}

const MeetHeroCard: React.FC<MeetHeroCardProps> = memo(({ name, title, image, linkedin, course }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleSocialClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleClick = useCallback(() => {
    // Click handling logic
  }, []);

  const cardStyle = useMemo(() => ({
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
  }), [isHovered]);

  return (
    <StyledWrapper>
      <div className="card">
        <LazyLoadImage
          src={noodLogo}
          alt="Nood Logo"
          className="nood-logo"
          effect="blur"
          threshold={300}
        />
        <div className="profile-pic">
          <LazyLoadImage
            src={image}
            alt={name}
            width={280}
            height={280}
            loading="lazy"
            decoding="async"
            placeholder={
              <div className="animate-pulse bg-gray-200 w-full h-full" />
            }
            threshold={100}
            effect="opacity"
          />
        </div>
        <div className="course-info">
          <h3>{course}</h3>
        </div>
        <div className="bottom">
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
            <button className="button">See Course</button>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
});

MeetHeroCard.displayName = 'MeetHeroCard';

export default MeetHeroCard;

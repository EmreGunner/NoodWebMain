import React, { useEffect, useRef } from "react" ;
import styled from "styled-components";
import noodSvg from '../assets/nood.svg';


const StyledWrapper = styled.div` 
:root {
  --nude-light: #f5eae0;  /* Light nude */
  --nude-medium: #e8dcd0; /* Medium nude */
  --nude-dark: #dccfc4;   /* Dark nude */
  --white: #ffffff;
}
 .custom-card {
  position: relative;
  z-index: 10;
  transform-style: preserve-3d;
  .parent   {
    width: 100% !important;
 
    aspect-ratio: 16 / 9 !important;
    perspective: 1500px !important;
      /* Media query to change width based on viewport */
     
  }

  .example-card {
    height: 100% !important; 
    width: 100% !important;
    border-radius: 1.5rem !important;
 background: linear-gradient(135deg, #83b375 0%, #4e9350 100%), url(${noodSvg}) !important;
    background-size: cover !important;
    background-position: center !important;
    transition: all 0.5s ease-in-out;
    transform-style: preserve-3d !important;
    box-shadow: rgba(5, 71, 17, 0.2) 0px 1rem 1.5rem -0.5rem !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    padding: 1rem !important; // Reduced padding for mobile
    animation: floatAnimation 6s ease-in-out infinite;
    transform: translateZ(50px);

    @media (min-width: 768px) {
      padding: 2rem !important; // Increased padding for larger screens
    }
  }

/* Glass effect improvement for better depth */
.glass {
    position: absolute;
    inset: 0.5rem;
    border-radius: 2.25rem;
    border-top-right-radius: 100%;
    background: rgba(255, 255, 255, 0.3); /* Increased opacity for more visibility */
    backdrop-filter: blur(25px); /* Adjusted blur for a balanced glassmorphism effect */
    transform: translateZ(75px);
    border-left: 1px solid rgba(255, 255, 255, 0.3); /* Updated border color for consistency */
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.5s ease-in-out;
    transform-style: preserve-3d;
}

  .content {
    transform: translateZ(100px) !important;
    width: 100% !important;
    height: 100% !important;
    display: flex !important;
      align-items: center !important; /* Center content horizontally */
    justify-content: center !important; /* Center content vertically */
    text-align: center !important;
    padding: 1.5rem; /* Added padding for a more spacious feel */

     }

  .content .title {
    display: block !important;
    color: #ffffff !important;
    font-weight: 900 !important;
    font-size: 36px !important;
    font-family: 'Scala Sans Bold Italic', sans-serif !important;
    margin-bottom: 20px !important;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2) !important;
  }

  .content .text {
    display: block !important;
    color: #ffffff !important;
    font-size: 18px !important;
    font-family: 'Scala Sans Roman', sans-serif !important;
    line-height: 1.6 !important;
    margin-bottom: 30px !important;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1) !important;
  }
 .video-container {
    margin-top: 10px !important; // Reduced margin for mobile
    border-radius: 15px !important; // Slightly reduced border radius
    overflow: hidden !important;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3) !important;
    transition: all 0.5s ease-in-out !important;
    aspect-ratio: 16 / 9 !important;
    width: 100% !important; // Full width on mobile
    z-index: 1 !important;
    transform: translateZ(25px) !important;

    @media (min-width: 768px) {
      margin-top: 20px !important;
      border-radius: 20px !important;
      width: 95% !important; // 95% width on larger screens
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3) !important;
    }

    &:hover {
      transform: translateZ(40px) scale(1.03) !important; // Reduced scale effect
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4) !important;

      @media (min-width: 768px) {
        transform: translateZ(50px) scale(1.05) !important;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4) !important;
      }
    }
  }

  .bottom {
    transform-style: preserve-3d !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    transform: translate3d(0, 0, 30px) !important;
    margin-top: 20px !important;
    z-index: 2 !important; // Increased z-index
    position: relative !important; // Added position relative
  }

  .social-buttons-container {
    display: flex !important;
    gap: 15px !important;
    transform-style: preserve-3d !important;
    position: absolute !important; // Changed to absolute positioning
    bottom: 20px !important; // Positioned at the bottom
    left: 50% !important; // Centered horizontally
    transform: translateX(-50%) !important; // Centering adjustment
  }

  .social-buttons-container .social-button {
    width: 45px !important; // Slightly reduced size
    height: 45px !important;
    padding: 12px !important; // Adjusted padding
    background: rgba(255, 255, 255, 0.9) !important;
    border-radius: 50% !important;
    border: none !important;
    display: grid !important;
    place-content: center !important;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1) !important;
    transition: all 0.3s ease-in-out !important;
    cursor: pointer !important;

    &:hover {
      transform: translateY(-5px) !important;
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2) !important;
    }
  }

  .social-buttons-container .social-button .svg {
    width: 18px !important; // Slightly reduced size
    fill: #4e9350 !important;
  }

  .logo {
    position: absolute !important;
    right: 0 !important;
    top: 0 !important;
    transform-style: preserve-3d !important;
  }

  .star {
    position: absolute !important;
    aspect-ratio: 1 !important;
    border-radius: 50% !important;
    top: 0 !important;
    right: 0 !important;
    box-shadow: rgba(100, 100, 111, 0.2) -10px 10px 20px 0px !important;
    backdrop-filter: blur(5px) !important;
    background: rgba(255, 255, 255, 0.1) !important;
    transition: all 0.5s ease-in-out !important;
  }

  .star1 {
    width: 120px !important;
    transform: translateZ(125px) !important;
    top: -10px !important;
    right: -10px !important;
  }

  .star2 {
    width: 100px !important;
    transform: translateZ(150px) !important;
    top: -5px !important;
    right: -5px !important;
    backdrop-filter: blur(2px) !important;
    transition-delay: 0.4s !important;
  }

  .star3 {
    width: 80px !important;
    transform: translateZ(175px) !important;
    top: 0px !important;
    right: 0px !important;
    transition-delay: 0.8s !important;
  }

  .star4 {
    width: 60px !important;
    transform: translateZ(200px) !important;
    top: 5px !important;
    right: 5px !important;
    transition-delay: 1.2s !important;
  }

  .star5 {
    width: 24px !important;
    transform: translateZ(225px) !important;
    top: 10px !important;
    right: 10px !important;
    display: grid !important;
    place-content: center !important;
    transition-delay: 1.6s !important;
    background: #c1272d !important;
  
  }

  .star5 .svg {
    fill: white !important;
    
  }
  .svg {
    width: 20px !important;
    fill: white !important;
    
  }

  @media (max-width: 767px) {
    .star1 { width: 60px !important; top: 10px !important; right: 10px !important; }
    .star2 { width: 50px !important; top: 12px !important; right: 12px !important; }
    .star3 { width: 40px !important; top: 14px !important; right: 14px !important; }
    .star4 { width: 30px !important; top: 16px !important; right: 16px !important; }
    .star5 { width: 20px !important; top: 18px !important; right: 18px !important; }
  }
 @keyframes wave-animation {
    0% { transform: translateX(0) translateY(0); }
    50% { transform: translateX(-30px) translateY(-20px); }
    100% { transform: translateX(0) translateY(0); }
  }
 @keyframes floatAnimation {
    0%, 100% { transform: translateZ(50px) rotateX(0deg) rotateY(0deg); }
    50% { transform: translateZ(100px) rotateX(10deg) rotateY(10deg); }
  }
  .parent:hover .example-card {
    transform: translateZ(100px) rotateX(10deg) rotateY(10deg) !important;
    box-shadow: rgba(5, 71, 17, 0.3) 20px 40px 20px -30px, rgba(5, 71, 17, 0.1) 0px 20px 25px 0px !important;
  }

  .parent:hover .example-card .social-buttons-container .social-button {
    transform: translateY(-3px) !important;
  }

  .parent:hover .example-card .logo .star2 {
    transform: translateZ(175px) !important;
  }

  .parent:hover .example-card .logo .star3 {
    transform: translateZ(200px) !important;
  }

  .parent:hover .example-card .logo .star4 {
    transform: translateZ(225px) !important;
  }

  .parent:hover .example-card .logo .star5 {
    transform: translateZ(250px) !important;
  }
    }

  @keyframes slideBack {
    0% {
      transform: rotate3d(0, 0, 0, 0deg);
    }
    100% {
      transform: rotate3d(1, 1, 0, 10deg);
    }
  }

  .example-card:hover {
    animation-play-state: paused;
    transform: scale(1.02) rotate3d(1, 1, 0, 5deg);
  }
` ;


const HeroCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <StyledWrapper>
       <div className="custom-card" ref={cardRef}>
      <div className="parent">
        <div className="example-card">
        <div className="logo">
            <span className="star star1" />
            <span className="star star2" />
            <span className="star star3" />
            <span className="star star4" />
            <span className="star star5">
            <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="svg"
>

    <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill="#006233"
    />

    <circle cx="70" cy="60" r="10" fill="#ffffff"/>
    <circle cx="130" cy="60" r="10" fill="#ffffff"/>
</svg>


            </span>
          </div>
    
          <div className="glass" />
          <div className="content">
            <div className="video-container">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/7zDc6364L8w?si=Qp_H355sqfLO5b2b"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      </div>
    </StyledWrapper>
  ) ;
} ;

export default HeroCard ;








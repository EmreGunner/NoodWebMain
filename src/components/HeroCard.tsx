import React from "react" ;
import styled from "styled-components";


const StyledWrapper = styled.div` 
:root {
  --nude-light: #f5eae0;  /* Light nude */
  --nude-medium: #e8dcd0; /* Medium nude */
  --nude-dark: #dccfc4;   /* Dark nude */
  --white: #ffffff;
}
 .custom-card {
 
  .parent   {
    width: 100% !important;
    max-width: 1200px !important;
    aspect-ratio: 16 / 9 !important;
    perspective: 1000px !important;
      /* Media query to change width based on viewport */
      @media (min-width: 1024px) {
        width: 600px !important;
      }
  }

  .example-card {
    height: 100% !important; 
    width: 100% !important;
    border-radius: 1.5rem !important;
 background: linear-gradient(135deg, #83b375 0%, #4e9350 100%) !important; /* NOOD colors */
    transition: all 0.5s ease-in-out;
    transform-style: preserve-3d !important;
    box-shadow: rgba(5, 71, 17, 0.2) 0px 1rem 1.5rem -0.5rem !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    padding: 2.5rem !important;
  }

/* Glass effect improvement for better depth */
.glass {
    position: absolute;
    inset: 0.5rem;
    border-radius: 2.25rem;
    border-top-right-radius: 100%;
    background: rgba(255, 255, 255, 0.3); /* Increased opacity for more visibility */
    backdrop-filter: blur(25px); /* Adjusted blur for a balanced glassmorphism effect */
    transform: translate3d(0px, 0px, 1.25rem);
    border-left: 1px solid rgba(255, 255, 255, 0.3); /* Updated border color for consistency */
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.5s ease-in-out;
    transform-style: preserve-3d;
}

  .content {
    transform: translate3d(0, 0, 55px) !important;
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
    margin-top: 20px !important;
    border-radius: 20px !important;
    overflow: hidden !important;
    transform: translate3d(0, 0, 35px) !important;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3) !important;
    transition: all 0.5s ease-in-out !important;
    aspect-ratio: 16 / 9 !important;
    width: 100% !important;
    z-index: 1 !important;

    &:hover {
      transform: translate3d(0, -10px, 40px) scale(1.05) !important;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4) !important;
    }
  }

  .bottom {
    transform-style: preserve-3d !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    transform: translate3d(0, 0, 30px) !important;
    margin-top: 20px !important;
    z-index: 1 !important;
  }

  .social-buttons-container {
    display: flex !important;
    gap: 15px !important;
    transform-style: preserve-3d !important;
  }

  .social-buttons-container .social-button {
    width: 55px !important;
    height: 55px !important;
    padding: 18px !important;
    background: rgba(255, 255, 255, 0.9) !important;
    border-radius: 50% !important;
    border: none !important;
    display: grid !important;
    place-content: center !important;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1) !important;
    transition: all 0.3s ease-in-out !important;
    cursor: pointer !important;
  }

  .social-buttons-container .social-button .svg {
    width: 20px !important;
    fill: #4e9350 !important;
  }

  .social-buttons-container .social-button:hover {
    transform: translateY(-5px) !important;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2) !important;
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
    transform: translate3d(0, 0, 20px) !important;
    top: 10px !important;
    right: 10px !important;
  }

  .star2 {
    width: 100px !important;
    transform: translate3d(0, 0, 40px) !important;
    top: 15px !important;
    right: 15px !important;
    backdrop-filter: blur(2px) !important;
    transition-delay: 0.4s !important;
  }

  .star3 {
    width: 80px !important;
    transform: translate3d(0, 0, 60px) !important;
    top: 20px !important;
    right: 20px !important;
    transition-delay: 0.8s !important;
  }

  .star4 {
    width: 60px !important;
    transform: translate3d(0, 0, 80px) !important;
    top: 25px !important;
    right: 25px !important;
    transition-delay: 1.2s !important;
  }

  .star5 {
    width: 50px !important;
    transform: translate3d(0, 0, 100px) !important;
    top: 30px !important;
    right: 30px !important;
    display: grid !important;
    place-content: center !important;
    transition-delay: 1.6s !important;
  }

  .star5 .svg {
    width: 20px !important;
    fill: white !important;
  }

 @keyframes wave-animation {
    0% { transform: translateX(0) translateY(0); }
    50% { transform: translateX(-30px) translateY(-20px); }
    100% { transform: translateX(0) translateY(0); }
  }
 @keyframes floatAnimation {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(5deg); }
  }
  .parent:hover .example-card {
    transform: rotate3d(1, 1, 0, 10deg) !important;
    box-shadow: rgba(5, 71, 17, 0.3) 20px 40px 20px -30px, rgba(5, 71, 17, 0.1) 0px 20px 25px 0px !important;
  }

  .parent:hover .example-card .social-buttons-container .social-button {
    transform: translateY(-3px) !important;
  }

  .parent:hover .example-card .logo .star2 {
    transform: translate3d(0, 0, 50px) !important;
  }

  .parent:hover .example-card .logo .star3 {
    transform: translate3d(0, 0, 70px) !important;
  }

  .parent:hover .example-card .logo .star4 {
    transform: translate3d(0, 0, 90px) !important;
  }

  .parent:hover .example-card .logo .star5 {
    transform: translate3d(0, 0, 110px) !important;
  }
    }
` ;


const HeroCard = () => {
  return (
    <StyledWrapper>
       <div className="custom-card">
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
        fill="#ffffff"
    />

    <circle cx="70" cy="60" r="10" fill="#ffffff"/>
    <circle cx="130" cy="60" r="10" fill="#ffffff"/>
</svg>


            </span>
          </div>
    
          <div className="glass" />
          <div className="content">
            <span className="text">
            </span>
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
          <div className="bottom">
            <div className="social-buttons-container">
              <button className="social-button">
                <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className="svg">
                  <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z" />
                </svg>
              </button>
              <button className="social-button">
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="svg">
                  <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </StyledWrapper>
  ) ;
} ;

export default HeroCard ;

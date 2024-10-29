import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const Header: React.FC = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Transform header background opacity based on scroll
  const headerBg = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.95)']
  );

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <motion.header
      className="header-fixed"
      style={{
        backgroundColor: headerBg,
        boxShadow: isScrolled ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
      }}
    >
      <div className="content-container h-full flex items-center justify-between">
        {/* Header content */}
      </div>
    </motion.header>
  );
};

export default Header; 
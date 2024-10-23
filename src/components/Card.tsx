import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};

export default Card;

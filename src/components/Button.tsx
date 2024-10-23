import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  to: string;
  variant: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ to, variant, children, className = '', fullWidth = false }) => {
  const baseClasses = 'px-6 py-3 font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50';
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-secondary focus:ring-primary',
    secondary: 'bg-white text-primary border-2 border-primary hover:bg-accent hover:border-secondary hover:text-secondary',
    outline: 'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`;

  return (
    <Link to={to} className={combinedClasses}>
      {children}
    </Link>
  );
};

export default Button;

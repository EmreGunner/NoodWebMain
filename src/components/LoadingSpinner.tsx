import React from 'react'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  }

  return (
    <div className="flex justify-center items-center">
      <div className={`loading-spinner ${sizeClasses[size]}`}></div>
    </div>
  )
}

export default LoadingSpinner
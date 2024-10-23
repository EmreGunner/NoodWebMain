import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Create Your Path
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Empowering Moroccan youth to transform their skills into successful
              careers and businesses through expert-led courses and a supportive
              community.
            </p>
            <Link
              to="/courses"
              className="btn-primary inline-block"
            >
              Explore Courses →
            </Link>
            <div className="flex items-center mt-8 space-x-4">
              <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="mr-2">🎓</span> Public Speaking
              </span>
              <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="mr-2">💼</span> Career-Oriented
              </span>
              <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="mr-2">🧠</span> Creative Thinking
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary opacity-50 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary opacity-50 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-tertiary opacity-50 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
            <div className="relative">
              <img
                src="/path/to/your/image.jpg"
                alt="Moroccan student"
                className="rounded-lg shadow-2xl w-full h-auto object-cover"
              />
              <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg">
                <span className="text-primary font-semibold">5K+</span>
                <span className="text-sm text-gray-600 dark:text-gray-300"> Online Courses</span>
              </div>
              <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-lg">
                <span className="text-primary font-semibold">2K+</span>
                <span className="text-sm text-gray-600 dark:text-gray-300"> Video Courses</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

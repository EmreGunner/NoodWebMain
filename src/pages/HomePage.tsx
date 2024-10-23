import React from 'react';
import Header from '../components/Header';
import Hero from '../components/home/Hero';
import HostCourseSection from '../components/home/HostCourseSection';
import BecomeCoachSection from '../components/home/BecomeCoachSection';
import ExploreWorkshopsSection from '../components/home/ExploreWorkshopsSection';
import ExploreBlogSection from '../components/home/ExploreBlogSection';
import FinalCTASection from '../components/home/FinalCTASection';

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <Hero />
      <HostCourseSection />
      <BecomeCoachSection />
      <ExploreWorkshopsSection />
      <ExploreBlogSection />
      <FinalCTASection />
      {/* Other sections of your homepage */}
    </div>
  );
};

export default HomePage;

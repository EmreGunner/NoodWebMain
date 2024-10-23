import React from 'react';
import Hero from '../components/home/Hero';
import VideoSection from '../components/home/VideoSection';
import MeetHeroes from '../components/home/MeetHeroes';
import WhySection from '../components/home/WhySection';
import MasterclassSection from '../components/home/MasterclassSection';
import HostCourseSection from '../components/home/HostCourseSection';
import BecomeCoachSection from '../components/home/BecomeCoachSection';
import ExploreWorkshopsSection from '../components/home/ExploreWorkshopsSection';
import ExploreBlogSection from '../components/home/ExploreBlogSection';
import FinalCTASection from '../components/home/FinalCTASection';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Hero />
      <VideoSection />
      <MeetHeroes />
      <WhySection />
      <MasterclassSection />
      <HostCourseSection />
      <BecomeCoachSection />
      <ExploreWorkshopsSection />
      <ExploreBlogSection />
      <FinalCTASection />
    </div>
  );
};

export default HomePage;

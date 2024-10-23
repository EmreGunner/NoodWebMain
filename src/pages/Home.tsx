import React, { useEffect } from 'react';
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

const Home: React.FC = () => {
  useEffect(() => {
    console.log('Home component mounted');
  }, []);

  console.log('Rendering Home component');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Hero />
      {console.log('Rendering VideoSection')}
      <VideoSection />
      <MeetHeroes />
      <WhySection />
      {console.log('Rendering MasterclassSection')}
      <MasterclassSection />
      <HostCourseSection />
      <BecomeCoachSection />
      <ExploreWorkshopsSection />
      <ExploreBlogSection />
      <FinalCTASection />
    </div>
  );
};

export default Home;

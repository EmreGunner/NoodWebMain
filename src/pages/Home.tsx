import React from 'react';
import Hero from '../components/home/Hero';
import VideoSection from '../components/home/VideoSection';
import MeetHeroes from '../components/home/MeetHeroes';
import WhySection from '../components/home/WhySection';
import MasterclassSection from '../components/home/MasterclassSection';
import HostCourseSection from '../components/home/HostCourseSection';
import PartnerLogos from '../components/home/PartnerLogos';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Hero />
      <PartnerLogos />
      <VideoSection />
      <MeetHeroes />
      <WhySection />
      <MasterclassSection />
      <HostCourseSection />
    </div>
  );
};

export default Home;
import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes, createBrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import LoadingSpinner from './components/LoadingSpinner'
import CourseDetail from './pages/CourseDetail'
import { SpeedInsights } from '@vercel/speed-insights/react';
import DocumentTitle from './components/DocumentTitle';
import TermsAndConditions from './pages/TermsAndConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import NotFound from './pages/NotFound'
import ProductDetail from './pages/ProductDetail'
import CourseDetailPage from './pages/CourseDetailPage'
import WorkshopDetail from './pages/WorkshopDetail'
import HomePage from './pages/HomePage'
import Courses from './pages/Courses'
import FashionBusinessMasterclass from './pages/FashionBusinessMasterclass'
import EcommerceMastery from './pages/EcommerceMastery'
import UGCCreationMasterclass from './pages/UGCCreation'
import { Analytics } from "@vercel/analytics/react"
import { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Lazy load the pages
const Blog = React.lazy(() => import('./pages/Blog'))
const Community = React.lazy(() => import('./pages/Community'))
const Careers = React.lazy(() => import('./pages/Careers'))
const ContactUs = React.lazy(() => import('./pages/ContactUs'))
const Consultation = React.lazy(() => import('./pages/Consultation'))
const About = React.lazy(() => import('./pages/About'))
const NoodShop = React.lazy(() => import('./pages/NoodShop'))
const Workshops = React.lazy(() => import('./pages/Workshops'))
const HostCourse = React.lazy(() => import('./pages/HostCourse'))
const Support = React.lazy(() => import('./pages/Support'))

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className 
}: OptimizedImageProps) => {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <div 
      className={`relative ${className}`} 
      style={{ aspectRatio: width && height ? `${width}/${height}` : 'auto' }}
    >
      <LazyLoadImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        effect="blur"
        afterLoad={() => setLoaded(true)}
        wrapperClassName={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        threshold={100}
      />
    </div>
  );
};

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <HomePage />
        </Suspense>
      ),
    },
    {
      path: '/about',
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <About />
        </Suspense>
      ),
    },
    {
      path: '/contact',
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <ContactUs />
        </Suspense>
      ),
    },
  ]);

  return (
    <Router>
      <DocumentTitle />
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:slug" element={<CourseDetailPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/community" element={<Community />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/consultation" element={<Consultation />} />
              <Route path="/tools" element={<NoodShop />} />
              <Route path="/workshops" element={<Workshops />} />
              <Route path="/workshops/:id" element={<WorkshopDetail />} />
              <Route path="/host-course" element={<HostCourse />} />
              <Route path="/support" element={<Support />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/courses/fashion-business-masterclass" element={<FashionBusinessMasterclass />} />
              <Route path="/courses/ecommerce-mastery" element={<EcommerceMastery />} />
              <Route path="/courses/ugc-creation-masterclass" element={<UGCCreationMasterclass />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Analytics />
          </Suspense>
        </main>
        <Footer />
      </div>
      <SpeedInsights />
    </Router>
  )
}

export default App

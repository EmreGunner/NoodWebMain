import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import LoadingSpinner from './components/LoadingSpinner'

// Lazy load the pages
const HomePage = React.lazy(() => import('./pages/HomePage'))
const Academy = React.lazy(() => import('./pages/Academy'))
const Blog = React.lazy(() => import('./pages/Blog'))
const MasterClasses = React.lazy(() => import('./pages/MasterClasses'))
const Community = React.lazy(() => import('./pages/Community'))
const Careers = React.lazy(() => import('./pages/Careers'))
const CourseDetailPage = React.lazy(() => import('./pages/CourseDetailPage'))
const ContactUs = React.lazy(() => import('./pages/ContactUs'))
const Consultation = React.lazy(() => import('./pages/Consultation'))
const About = React.lazy(() => import('./pages/About'))
const NoodShop = React.lazy(() => import('./pages/NoodShop'))
const Workshops = React.lazy(() => import('./pages/Workshops'))
const WorkshopDetail = React.lazy(() => import('./pages/WorkshopDetail'))

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/academy" element={<Academy />} />
              <Route path="/academy/:slug" element={<CourseDetailPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/masterclasses" element={<MasterClasses />} />
              <Route path="/community" element={<Community />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/consultation" element={<Consultation />} />
              <Route path="/about" element={<About />} />
              <Route path="/nood-shop" element={<NoodShop />} />
              <Route path="/workshops" element={<Workshops />} />
              <Route path="/workshops/:id" element={<WorkshopDetail />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import LoadingSpinner from './components/LoadingSpinner'
import CourseDetail from './pages/CourseDetail'

// Lazy load the pages
const HomePage = React.lazy(() => import('./pages/HomePage'))
const Courses = React.lazy(() => import('./pages/Courses')) // Changed from Academy to Courses
const Blog = React.lazy(() => import('./pages/Blog'))
const Community = React.lazy(() => import('./pages/Community'))
const Careers = React.lazy(() => import('./pages/Careers'))
const CourseDetailPage = React.lazy(() => import('./pages/CourseDetailPage'))
const ContactUs = React.lazy(() => import('./pages/ContactUs'))
const Consultation = React.lazy(() => import('./pages/Consultation'))
const About = React.lazy(() => import('./pages/About'))
const NoodShop = React.lazy(() => import('./pages/NoodShop'))
const Workshops = React.lazy(() => import('./pages/Workshops'))
const WorkshopDetail = React.lazy(() => import('./pages/WorkshopDetail'))
const MasterClasses = React.lazy(() => import('./pages/MasterClasses'))
const BecomeCoach = React.lazy(() => import('./pages/BecomeCoach'))
const HostCourse = React.lazy(() => import('./pages/HostCourse'))

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
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:slug" element={<CourseDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/community" element={<Community />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/consultation" element={<Consultation />} />
              <Route path="/about" element={<About />} />
              <Route path="/nood-shop" element={<NoodShop />} />
              <Route path="/workshops" element={<Workshops />} />
              <Route path="/workshops/:id" element={<WorkshopDetail />} />
              <Route path="/masterclasses" element={<MasterClasses />} />
              <Route path="/become-coach" element={<BecomeCoach />} />
              <Route path="/host-course" element={<HostCourse />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

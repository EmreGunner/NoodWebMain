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
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const CourseDetailPage = React.lazy(() => import('./pages/CourseDetailPage'))

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16 sm:pt-20">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/academy" element={<Academy />} />
              <Route path="/academy/:slug" element={<CourseDetailPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/masterclasses" element={<MasterClasses />} />
              <Route path="/community" element={<Community />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

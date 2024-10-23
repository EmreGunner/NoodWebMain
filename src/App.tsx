import React from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import LanguageSelector from './components/LanguageSelector'
import Home from './pages/Home'
import Academy from './pages/Academy'
import Community from './pages/Community'
import Dashboard from './pages/Dashboard'
import Consultation from './pages/Consultation'
import Blog from './pages/Blog'
import CourseDetail from './pages/CourseDetail'

const AnimatedRoutes = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/academy/:courseId" element={<CourseDetail />} />
        <Route path="/community" element={<Community />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-text">
        <LanguageSelector />
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, BookOpen, Users, User, FileText, Search, Moon, Sun, Home } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import courses from '../data/courses.json' // Import your courses data
import noodLogoGreen from '/noodLogoGreen.png' // Adjust the path as necessary

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : false
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<typeof courses>([])
  const location = useLocation()

  // Handle scroll effect with a buffer
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 10 && !isScrolled) {
        setIsScrolled(true);
      } else if (scrollTop <= 10 && isScrolled) {
        setIsScrolled(false);
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrolled])

  // Handle dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    if (term.trim()) {
      const filtered = courses.filter(course => 
        course.name.toLowerCase().includes(term.toLowerCase())
      )
      setSearchResults(filtered.slice(0, 5)) // Limit to 5 results
    } else {
      setSearchResults([])
    }
  }

  const navItems = [
    { to: "/", icon: Home, text: "Home" },
    { to: "/academy", icon: BookOpen, text: "Academy" },
    { to: "/community", icon: Users, text: "Community" },
    { to: "/dashboard", icon: User, text: "Dashboard" },
    { to: "/blog", icon: FileText, text: "Blog" },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src={noodLogoGreen} alt="NOOD Logo" className="h-12 md:h-16 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Link 
                  to={item.to} 
                  className={`text-gray-700 dark:text-white hover:text-primary dark:hover:text-primary transition duration-300 flex items-center relative px-2 py-1
                    ${location.pathname === item.to ? 'text-primary font-semibold' : ''}
                  `}
                >
                  <item.icon className="mr-1" size={18} />
                  {item.text}
                  {location.pathname === item.to && (
                    <motion.span
                      layoutId="underline"
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-primary"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/consultation" className="btn-primary text-sm px-4 py-2 rounded-full">
                Book Consultation
              </Link>
            </motion.div>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                className="pl-8 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden text-gray-700 dark:text-white" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-4"
            >
              <ul className="flex flex-col space-y-2">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link 
                      to={item.to} 
                      className={`text-gray-700 dark:text-white hover:text-primary dark:hover:text-primary transition duration-300 flex items-center py-2 px-2 rounded-md
                        ${location.pathname === item.to ? 'text-primary font-semibold bg-gray-100 dark:bg-gray-700' : ''}
                      `}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="mr-2" size={18} />
                      {item.text}
                    </Link>
                  </li>
                ))}
                <li>
                  <div className="relative mt-2">
                    <input
                      type="text"
                      placeholder="Search courses..."
                      className="w-full pl-8 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                    <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
                  </div>
                  {searchResults.length > 0 && (
                    <div className="mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg">
                      {searchResults.map(course => (
                        <Link
                          key={course.id}
                          to={`/academy/${course.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => {
                            setSearchResults([])
                            setIsMenuOpen(false)
                          }}
                        >
                          {course.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
                <li>
                  <Link to="/consultation" className="btn-primary block text-center mt-4" onClick={() => setIsMenuOpen(false)}>
                    Book Consultation
                  </Link>
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header

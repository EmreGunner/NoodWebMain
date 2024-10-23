import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, BookOpen, Users, User, FileText, Search, Moon, Sun } from 'lucide-react'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const navItems = [
    { to: "/academy", icon: BookOpen, text: "Academy" },
    { to: "/community", icon: Users, text: "Community" },
    { to: "/dashboard", icon: User, text: "Dashboard" },
    { to: "/blog", icon: FileText, text: "Blog" },
  ]

  return (
    <header className={`bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary dark:text-white">
            NOOD
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <Link 
                key={index} 
                to={item.to} 
                className="text-text dark:text-white hover:text-primary dark:hover:text-primary transition duration-300 flex items-center"
              >
                <item.icon className="mr-1" size={18} />
                {item.text}
              </Link>
            ))}
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                className="pl-8 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
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
            <Link to="/consultation" className="btn-primary">
              Book Consultation
            </Link>
          </nav>
          <button 
            className="md:hidden text-text dark:text-white" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden mt-4">
            <ul className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.to} 
                    className="text-text dark:text-white hover:text-primary dark:hover:text-primary transition duration-300 flex items-center py-2 border-b border-accent" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="mr-2" size={18} />
                    {item.text}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/consultation" className="btn-primary block text-center mt-4" onClick={() => setIsMenuOpen(false)}>
                  Book Consultation
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Users, Phone, FileText, Home, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import courses from '../data/courses.json';
import noodLogoGreen from '/noodLogoGreen.png';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [isCareerDropdownOpen, setIsCareerDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 10 && !isScrolled) {
        setIsScrolled(true);
      } else if (scrollTop <= 10 && isScrolled) {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  const navItems = [
    { to: "/", icon: Home, text: "Home" },
    { to: "/academy", icon: BookOpen, text: "Academy" },
    { to: "/community", icon: Users, text: "Community" },
    { to: "/contact", icon: Phone, text: "Contact Us" },
    { to: "/blog", icon: FileText, text: "Blog" },
  ];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      const results = courses.filter(course =>
        course.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <motion.header
      className="bg-white shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <img src={noodLogoGreen} alt="Nood Logo" className="h-10 w-auto" />
          </Link>

          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="text-gray-700 hover:text-primary">
                <item.icon className="inline-block mr-2" size={20} />
                {item.text}
              </Link>
            ))}
            <div className="relative">
              <button
                onClick={() => setIsCareerDropdownOpen(!isCareerDropdownOpen)}
                className="text-gray-700 hover:text-primary flex items-center"
              >
                Career <ChevronDown className="ml-1" size={16} />
              </button>
              {isCareerDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md"
                >
                  <Link to="/careers" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Looking for Jobs
                  </Link>
                  <Link to="/business-collaborations" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    For Business Collaborations
                  </Link>
                  <Link to="/#host-course" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Host Your Course
                  </Link>
                  <Link to="/#become-coach" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Become A Coach
                  </Link>
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="appearance-none bg-gray-100 border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="ar">AR</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/consultation" className="btn-primary text-sm px-4 py-2 rounded-full">
                Book Consultation
              </Link>
            </motion.div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
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
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;

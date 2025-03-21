import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Users, ShoppingBag, ChevronDown, Search, MoreHorizontal } from 'lucide-react';
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
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setIsMoreDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const mainNavItems = [
    { to: "/courses", icon: BookOpen, text: "Courses" },
    { to: "/community", icon: Users, text: "Community" },
    { to: "/tools", icon: ShoppingBag, text: "Tools" },
  ];

  const moreNavItems = [
    { to: "/workshops", text: "Workshops" },
    { to: "/host-course", text: "Host Your Course" },
    { to: "/contact", text: "Contact Us" },
    { to: "/blog", text: "Blog" },
    { to: "/about", text: "About Us" },
    { to: "/careers", text: "Careers" },
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
      className={`
      fixed top-0 left-5 right-0 bg-white z-50
        
        ${isScrolled ? 'shadow-lg' : 'shadow-sm'}
      `}
    >
      <div className="container mx-auto px-4 tablet:px-2">
        <div className="flex justify-between items-center h-12 md:h-14 lg:h-16 tablet:h-16 tablet:gap-4">
          <Link to="/" className="flex items-center group">
            <img 
              src={noodLogoGreen} 
              alt="Nood Logo" 
              className="
                w-12 h-12                    /* Base size for mobile */
                sm:w-14 sm:h-14              /* Slightly larger for small screens */
                md:w-16 md:h-16              /* Medium screens */
                lg:w-16 lg:h-16              /* Large screens */
                object-contain               /* Maintain aspect ratio */
                min-w-[48px]                 /* Prevent logo from getting too small */
              "
            />
          </Link>

          <nav className="hidden md:flex space-x-8 tablet:space-x-6">
            {mainNavItems.map((item) => (
              <Link key={item.to} to={item.to} className="text-gray-700 hover:text-primary">
                <item.icon className="inline-block mr-2" size={20} />
                {item.text}
              </Link>
            ))}
            <div className="relative" ref={moreDropdownRef}>
              <button
                onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                className="text-gray-700 hover:text-primary flex items-center tablet:bg-gray-50 tablet:px-3 tablet:py-1.5 tablet:rounded-md tablet:text-sm tablet:ml-auto tablet:font-medium"
                aria-haspopup="true"
                aria-expanded={isMoreDropdownOpen}
              >
                <MoreHorizontal className="inline-block mr-2 tablet:hidden" size={20} />
                <span>More</span>
                <ChevronDown className="ml-1.5 tablet:ml-2 w-4 h-8" />
              </button>
              {isMoreDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="more-menu"
                >
                  {moreNavItems.map((item) => (
                    <Link 
                      key={item.to} 
                      to={item.to} 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={() => setIsMoreDropdownOpen(false)}
                    >
                      {item.text}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center space-x-4 tablet:space-x-3">
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
                <ChevronDown size={16} />
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
            to="/consultation"
            className={`
              flex-shrink-0
              bg-primary text-white
              px-2 xxs:px-3 sm:px-4
              py-1.5 sm:py-2
              rounded-full
              text-xs xxs:text-sm sm:text-base
              whitespace-nowrap
              ml-1 sm:ml-2
            `}
          >
            Book Consultation
          </Link>
            </motion.div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-500 hover:text-gray-600 focus:outline-none"
              aria-expanded={isMenuOpen}
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
                <li className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search courses..."
                      className="w-full pl-8 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                    <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
                  </div>
                  {searchResults.length > 0 && (
                    <div className="mt-2 bg-white rounded-md shadow-lg">
                      {searchResults.map(course => (
                        <Link
                          key={course.id}
                          to={`/courses/${course.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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

                {mainNavItems.map((item, index) => (
                  <li key={index}>
                    <Link 
                      to={item.to} 
                      className={`text-gray-700 hover:text-primary transition duration-300 flex items-center py-2 px-2 rounded-md
                        ${location.pathname === item.to ? 'text-primary font-semibold bg-gray-100' : ''}
                      `}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="mr-2" size={18} />
                      {item.text}
                    </Link>
                  </li>
                ))}

                <li>
                  <details className="group">
                    <summary className="flex items-center py-2 px-2 text-gray-700 hover:text-primary cursor-pointer list-none">
                      <MoreHorizontal className="mr-2" size={18} />
                      More
                      <ChevronDown className="ml-auto" size={16} />
                    </summary>
                    <ul className="pl-6 mt-2 space-y-2">
                      {moreNavItems.map((item, index) => (
                        <li key={index}>
                          <Link 
                            to={item.to} 
                            className="block py-2 px-2 text-gray-700 hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
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

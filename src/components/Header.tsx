import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Users, ShoppingBag, ChevronDown, Search, MoreHorizontal, Calendar } from 'lucide-react';
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

  // Calculate if we're on the home page
  const isHomePage = location.pathname === "/";
  const isConsultationPage = location.pathname === "/consultation";

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
        fixed top-0 left-0 right-0 bg-white z-50
        border-b border-gray-100
        ${isScrolled ? 'shadow-md' : ''}
        transition-all duration-300
      `}
    >
      <div className="container mx-auto px-4 tablet:px-2">
        <div className="flex justify-between items-center h-14 md:h-16 lg:h-16 tablet:h-16 tablet:gap-4">
          <Link to="/" className="flex items-center group">
            <img 
              src={noodLogoGreen} 
              alt="Nood Logo" 
              className="
                w-12 h-12                    /* Base size for mobile */
                sm:w-14 sm:h-14              /* Slightly larger for small screens */
                md:w-14 md:h-14              /* Medium screens */
                lg:w-14 lg:h-14              /* Large screens */
                object-contain               /* Maintain aspect ratio */
                min-w-[48px]                 /* Prevent logo from getting too small */
              "
            />
            {isHomePage && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>}
          </Link>

          <nav className="hidden md:flex items-center space-x-8 tablet:space-x-6">
            {mainNavItems.map((item) => (
              <Link 
                key={item.to} 
                to={item.to} 
                className={`text-gray-700 hover:text-primary flex items-center relative pb-1 
                  font-medium text-base transition-colors
                  ${location.pathname === item.to ? 'text-primary' : ''}
                `}
              >
                <item.icon className="inline-block mr-2" size={18} />
                <span>{item.text}</span>
                {location.pathname === item.to && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
                )}
              </Link>
            ))}
            
            {/* Book Consultation Button */}
            <Link 
              to="/consultation" 
              className={`
                flex items-center relative px-4 py-2.5 rounded-full
                ${isConsultationPage 
                  ? 'bg-primary text-white' 
                  : 'bg-primary/10 text-primary hover:bg-primary/20'}
                transition-colors font-medium text-base
              `}
            >
              <Calendar className="inline-block mr-2" size={18} />
              Book Consultation
            </Link>
          </nav>

          <div className="flex items-center space-x-4 tablet:space-x-3">
            {/* More Dropdown - Moved here */}
            <div 
              className="relative hidden md:block" 
              ref={moreDropdownRef}
            >
              <button
                onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                className={`
                  text-gray-700 hover:text-primary flex items-center
                  px-3 py-1.5 rounded-md text-base
                  font-medium relative
                  ${moreNavItems.some(item => location.pathname === item.to) ? 'text-primary' : ''}
                `}
                aria-haspopup="true"
                aria-expanded={isMoreDropdownOpen}
              >
                <span>More</span>
                <ChevronDown className="ml-1.5 tablet:ml-2 w-4 h-4" />
                {moreNavItems.some(item => location.pathname === item.to) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
                )}
              </button>
              
              <AnimatePresence>
                {isMoreDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg z-20 overflow-hidden"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="more-menu"
                  >
                    {moreNavItems.map((item) => (
                      <Link 
                        key={item.to} 
                        to={item.to} 
                        className={`
                          block px-4 py-3 text-gray-700 hover:bg-gray-50 text-base
                          ${location.pathname === item.to 
                            ? 'bg-primary/5 font-medium border-l-4 border-primary' 
                            : 'border-l-4 border-transparent'}
                        `}
                        role="menuitem"
                        onClick={() => setIsMoreDropdownOpen(false)}
                      >
                        {item.text}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <select
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-md py-1.5 pl-3 pr-8 text-base focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="ar">AR</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown size={14} />
              </div>
            </div>

            {/* Mobile Book Consultation Button */}
            <Link 
              to="/consultation" 
              className={`
                md:hidden flex items-center relative px-3 py-1.5 rounded-full
                ${isConsultationPage 
                  ? 'bg-primary text-white' 
                  : 'bg-primary/10 text-primary'}
                transition-colors font-medium text-base
              `}
            >
              <Calendar className="w-4 h-4" />
            </Link>

            <button
              className="block md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-1">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`
                      flex items-center py-3 px-4 rounded-lg text-base
                      ${location.pathname === item.to 
                        ? 'bg-primary/10 text-primary font-medium' 
                        : 'text-gray-700'}
                    `}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="mr-3" size={20} />
                    {item.text}
                  </Link>
                ))}
                
                <Link
                  to="/consultation"
                  className={`
                    flex items-center py-3 px-4 rounded-lg text-base
                    ${isConsultationPage 
                      ? 'bg-primary text-white font-medium' 
                      : 'bg-primary/10 text-primary font-medium'}
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Calendar className="mr-3" size={20} />
                  Book Consultation
                </Link>
                
                <div className="py-2 px-4 text-sm font-medium text-gray-500">More Links</div>
                
                {moreNavItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`
                      py-3 px-4 rounded-lg text-base
                      ${location.pathname === item.to 
                        ? 'bg-gray-50 text-primary font-medium' 
                        : 'text-gray-700'}
                    `}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.text}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;

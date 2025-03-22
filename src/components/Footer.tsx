import React from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Mail, Phone } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#16a34a] text-white pt-16 pb-8">
      <div className="content-container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight">NOOD</h3>
            <p className="text-gray-200 max-w-xs">
              Empowering Moroccan youth through education and community.
            </p>
            <div className="pt-2">
              <Link 
                to="/about" 
                className="inline-block text-sm px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-300"
              >
                Learn More About Us
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold after:content-[''] after:block after:w-12 after:h-1 after:bg-secondary after:mt-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/courses" className="text-gray-200 hover:text-white flex items-center transition duration-300">
                  <span className="mr-2">•</span> Academy
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-200 hover:text-white flex items-center transition duration-300">
                  <span className="mr-2">•</span> Community
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-200 hover:text-white flex items-center transition duration-300">
                  <span className="mr-2">•</span> Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold after:content-[''] after:block after:w-12 after:h-1 after:bg-secondary after:mt-2">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-200">
                <Mail size={18} className="mr-3 text-secondary" />
                <span>contact@nood.ma</span>
              </li>
              <li className="flex items-center text-gray-200">
                <Phone size={18} className="mr-3 text-secondary" />
                <span>+212 666-654451</span>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold after:content-[''] after:block after:w-12 after:h-1 after:bg-secondary after:mt-2">
              Follow Us
            </h3>
            <div className="flex space-x-3">
              <a href="https://www.instagram.com/asmae_aboubigi" target="_blank" rel="noopener noreferrer" 
                className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <Instagram size={20} />
              </a>
            </div>
            <p className="text-sm text-gray-300">
              Stay updated with our latest courses and community events!
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/20 my-8"></div>

        {/* Bottom Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-300 mb-2">
            &copy; 2022 - 2025 All prices mentioned are exclusive of VAT.
          </p>
          <p className="text-sm text-gray-300 mb-4">
            NOOD SARL - RC: 559737 | TP: 3160177 | IF: 52699250 | ICE: 003156748000055
          </p>
          
          {/* Legal Links */}
          <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-300 mt-4">
            <Link to="/privacy-policy" className="hover:text-white transition duration-300">
              Privacy Policy
            </Link>
            <span className="text-gray-500">•</span>
            <Link to="/terms-and-conditions" className="hover:text-white transition duration-300">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

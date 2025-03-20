import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-2xl font-semibold mb-4">NOOD</h3>
            <p className="text-sm">Empowering Moroccan youth through education and community.</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/academy" className="hover:text-secondary transition duration-300">Academy</Link></li>
              <li><Link to="/community" className="hover:text-secondary transition duration-300">Community</Link></li>
              <li><Link to="/blog" className="hover:text-secondary transition duration-300">Blog</Link></li>
              <li><Link to="/masterclasses" className="hover:text-secondary transition duration-300">Masterclasses</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm mb-2">Email: contact@nood.com</p>
            <p className="text-sm">Phone: +212 666-654451  </p>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Add social media icons here */}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm">
          <p>&copy;  2022 - 2025 All prices mentioned are exclusive of VAT.
             All rights reserved.
          Tous les prix mentionnés s’entendent HTVA.
NOOD SARL - RC: 559737 | TP: 3160177 | IF: 52699250 | ICE: 003156748000055
          </p>
        </div>
      </div>
      <div className="flex gap-4 justify-center text-sm text-gray-600">
        <Link to="/privacy-policy" className="hover:text-gray-900">
          Privacy Policy
        </Link>
        <Link to="/terms-and-conditions" className="hover:text-gray-900">
          Terms & Conditions
        </Link>
      </div>
    </footer>
  )
}

export default Footer

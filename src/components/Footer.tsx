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
            <p className="text-sm mb-2">Email: info@nood.com</p>
            <p className="text-sm">Phone: +1 234 567 8900</p>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Add social media icons here */}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm">
          <p>&copy; 2023 NOOD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

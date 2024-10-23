import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary dark:bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">NOOD</h3>
            <p className="text-sm">Empowering entrepreneurs and freelancers with targeted skills and expert guidance for digital business success.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/academy" className="hover:text-accent transition duration-300">Academy</Link></li>
              <li><Link to="/agency" className="hover:text-accent transition duration-300">Agency</Link></li>
              <li><Link to="/community" className="hover:text-accent transition duration-300">Community</Link></li>
              <li><Link to="/dashboard" className="hover:text-accent transition duration-300">Dashboard</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-accent transition duration-300">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="hover:text-accent transition duration-300">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a href="mailto:info@nood.com" className="hover:text-accent transition duration-300">info@nood.com</a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <a href="tel:+15551234567" className="hover:text-accent transition duration-300">+1 (555) 123-4567</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition duration-300" aria-label="Facebook"><Facebook /></a>
              <a href="#" className="hover:text-accent transition duration-300" aria-label="Twitter"><Twitter /></a>
              <a href="#" className="hover:text-accent transition duration-300" aria-label="Instagram"><Instagram /></a>
              <a href="#" className="hover:text-accent transition duration-300" aria-label="LinkedIn"><Linkedin /></a>
            </div>
            <div className="mt-4">
              <h5 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h5>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-3 py-2 rounded-l-full text-black focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button type="submit" className="bg-primary hover:bg-accent text-white px-4 py-2 rounded-r-full transition duration-300">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-accent border-opacity-20 text-center text-sm">
          <p>&copy; 2023 NOOD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
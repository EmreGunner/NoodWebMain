import React from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Mail, Phone, ArrowUpRight } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-200">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="content-container py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Stay in the loop</h3>
              <p className="text-gray-400">Get updates on our latest courses and community events.</p>
            </div>
            <div className="flex gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-600 text-gray-200"
              />
              <button className="px-6 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="content-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">NOOD</h3>
              <p className="text-gray-400 leading-relaxed">
                Empowering Moroccan youth through education and community.
              </p>
            </div>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/asmae_aboubigi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="mailto:contact@nood.ma"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['Academy', 'Community', 'Blog', 'About Us'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center group"
                  >
                    {item}
                    <ArrowUpRight 
                      size={16} 
                      className="ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" 
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+212666654451" className="text-gray-400 hover:text-white transition-colors">
                  +212 666-654451
                </a>
              </li>
              <li>
                <a href="mailto:contact@nood.ma" className="text-gray-400 hover:text-white transition-colors">
                  contact@nood.ma
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-6">Legal</h3>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms & Conditions', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(/[& ]/g, '-')}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="content-container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div>
              &copy; {new Date().getFullYear()} NOOD SARL. All rights reserved.
            </div>
            <div className="text-center md:text-right">
              <p>RC: 559737 | TP: 3160177 | IF: 52699250 | ICE: 003156748000055</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

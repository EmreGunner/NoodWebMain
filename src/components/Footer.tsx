import React from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Mail, Phone, ArrowRight, MapPin, ExternalLink } from 'lucide-react'
import noodLogoWhite from '../assets/images/nood-logo-white.png'

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 hero-pattern opacity-5"></div>
      
      {/* Top curved edge */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-white" style={{ borderRadius: '0 0 50% 50% / 100px' }}></div>

      <div className="relative bg-gradient-to-br from-[var(--color-dark)] to-[#112318] pt-16 text-white">
        {/* Email signup with accent background */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-primary/10 skew-y-1 transform"></div>
          <div className="relative content-container py-8">
            <div className="bg-gradient-to-r from-primary/20 to-primary/5 backdrop-blur-sm rounded-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">Join our community</h3>
                  <p className="text-white/80 max-w-md">Stay updated with our latest courses, workshops, and exclusive offers.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-white/50 min-w-[200px]"
                  />
                  <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
                    Subscribe <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="content-container pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* Logo and brand info */}
            <div className="lg:col-span-4 space-y-6">
              <Link to="/" className="inline-block">
                <img src={noodLogoWhite} alt="Nood" className="h-16 w-auto" />
              </Link>
              <p className="text-white/70 leading-relaxed">
                Empowering Moroccan youth to transform their skills into successful careers through expert-led courses and a supportive community.
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/asmae_aboubigi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 rounded-full hover:bg-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href="https://linkedin.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 rounded-full hover:bg-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>

            {/* Navigation Columns */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-lg font-semibold">Academy</h3>
              <ul className="space-y-3">
                {['All Courses', 'Workshops', 'Certifications', 'Become a Coach'].map((item) => (
                  <li key={item}>
                    <Link 
                      to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-white/70 hover:text-white transition-colors inline-flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-lg font-semibold">Company</h3>
              <ul className="space-y-3">
                {['About Us', 'Careers', 'Partners', 'Blog'].map((item) => (
                  <li key={item}>
                    <Link 
                      to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-white/70 hover:text-white transition-colors inline-flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <h3 className="text-lg font-semibold">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone size={18} className="text-primary mt-1" />
                  <div>
                    <p className="text-sm text-white/60">Phone</p>
                    <a href="tel:+212666654451" className="text-white/90 hover:text-white transition-colors">
                      +212 666-654451
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={18} className="text-primary mt-1" />
                  <div>
                    <p className="text-sm text-white/60">Email</p>
                    <a href="mailto:contact@nood.ma" className="text-white/90 hover:text-white transition-colors">
                      contact@nood.ma
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary mt-1" />
                  <div>
                    <p className="text-sm text-white/60">Location</p>
                    <address className="text-white/90 not-italic">
                      Rabat, Morocco
                    </address>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10">
          <div className="content-container py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link to="/cookie-policy" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </div>
              
              <div>
                <p>RC: 559737 | TP: 3160177 | IF: 52699250 | ICE: 003156748000055</p>
              </div>
            </div>
            
            <div className="mt-4 text-center md:text-left text-sm text-white/60">
              &copy; {new Date().getFullYear()} NOOD SARL. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check, AlertCircle, Loader2, ExternalLink } from 'lucide-react';

const ContactUs: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle opening email client with form data
  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Prepare email content
    const subject = encodeURIComponent(formData.subject || 'Contact from Website');
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}

Message:
${formData.message}
    `);
    
    // Open email client
    window.open(`mailto:contact@nood.ma?subject=${subject}&body=${body}`);
    
    // Show success message
    setStatus('success');
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setStatus('idle');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gradient-to-br from-gray-50 to-white min-h-screen py-20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions or want to learn more? We'd love to hear from you.
            Fill out the form below or reach out directly.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 bg-white p-8 rounded-xl shadow-md border border-gray-200"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Send Us a Message</h2>
            
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-100 rounded-lg p-6 text-center"
              >
                <div className="inline-flex items-center justify-center bg-green-100 w-16 h-16 rounded-full mb-4">
                  <Check size={28} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Email Client Opened!</h3>
                <p className="text-green-700">Your message has been prepared. Please send the email from your mail client.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSendEmail} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-lg border ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors`}
                      placeholder="Your name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-lg border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors`}
                      placeholder="Your email address"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="Your phone number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="What is this regarding?"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full p-3 rounded-lg border ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors`}
                    placeholder="How can we help you?"
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center p-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors duration-300 shadow-md"
                  >
                    <Mail className="mr-2" size={18} />
                    Open Email Client
                  </motion.button>
                  
                  <a 
                    href="mailto:contact@nood.ma"
                    className="flex-1 flex items-center justify-center p-3 rounded-lg bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition-colors duration-300 border border-gray-300"
                  >
                    <ExternalLink className="mr-2" size={18} />
                    Direct Email
                  </a>
                </div>
                
                <p className="text-sm text-gray-500 text-center mt-4">
                  We respect your privacy and will never share your information.
                </p>
              </form>
            )}
          </motion.div>
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Contact Information Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Email</h3>
                    <a href="mailto:contact@nood.ma" className="text-gray-800 hover:text-primary transition-colors font-medium">
                      contact@nood.ma
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Phone</h3>
                    <a href="tel:+212666654451" className="text-gray-800 hover:text-primary transition-colors font-medium">
                      +212 666-654451
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Address</h3>
                    <p className="text-gray-800">
                      Rue Al Araar, Casablanca 20250<br />
                      Morocco
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Business Hours Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Business Hours</h2>
              <ul className="space-y-3">
                <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-gray-600 font-medium">Monday - Friday</span>
                  <span className="font-bold text-primary">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-gray-600 font-medium">Saturday</span>
                  <span className="font-bold text-primary">10:00 AM - 2:00 PM</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Sunday</span>
                  <span className="font-bold text-red-500">Closed</span>
                </li>
              </ul>
            </div>
            
            {/* Quick Contact Card */}
            <div className="bg-primary/5 p-6 rounded-xl shadow-sm border border-primary/10">
              <h2 className="text-xl font-bold mb-3 text-gray-900">Need Immediate Assistance?</h2>
              <p className="text-gray-600 mb-4">
                For urgent inquiries, feel free to call us or send a direct email.
              </p>
              <div className="flex flex-col space-y-2">
                <a 
                  href="tel:+212666654451" 
                  className="flex items-center justify-center p-2 bg-white text-primary border border-primary/20 rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <Phone size={16} className="mr-2" />
                  Call Us Now
                </a>
                <a 
                  href="mailto:contact@nood.ma" 
                  className="flex items-center justify-center p-2 bg-white text-primary border border-primary/20 rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <Mail size={16} className="mr-2" />
                  Email Directly
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactUs;

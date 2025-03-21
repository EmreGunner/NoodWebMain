import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check, AlertCircle, Loader2 } from 'lucide-react';

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
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setStatus('submitting');
    
    try {
      // Create a hidden iframe for form submission (to bypass CORS)
      let iframe = document.getElementById("hidden-form-iframe") as HTMLIFrameElement;
      
      if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.id = "hidden-form-iframe";
        iframe.name = "hidden-form-iframe";
        iframe.style.display = "none";
        document.body.appendChild(iframe);
      }
      
      // Create a form element
      const formElement = document.createElement("form");
      formElement.method = "POST";
      formElement.action = "https://hooks.airtable.com/workflows/v1/genericWebhook/appziEgZIh15IcxSW/wflNIr39R5Yce086a/wtriIdn8eaC69HBoI";
      formElement.target = "hidden-form-iframe";
      formElement.enctype = "application/x-www-form-urlencoded";
      formElement.style.display = "none";
      
      // Add form fields
      const payload = {
        Name: formData.name,
        Email: formData.email,
        Phone: formData.phone || "",
        Subject: formData.subject || "Contact Form Submission",
        Message: formData.message,
        Status: "New Contact",
      };
      
      Object.entries(payload).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        formElement.appendChild(input);
      });
      
      // Add form to body and submit
      document.body.appendChild(formElement);
      formElement.submit();
      document.body.removeChild(formElement);
      
      // Show success state
      setStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-50 min-h-screen pt-20"
    >
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
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
            className="lg:col-span-3 bg-white p-8 rounded-xl shadow-sm border border-gray-100"
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
                <h3 className="text-xl font-semibold text-green-800 mb-2">Message Received!</h3>
                <p className="text-green-700">Thank you for reaching out. We'll get back to you as soon as possible.</p>
              </motion.div>
            ) : status === 'error' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border border-red-100 rounded-lg p-6 text-center mb-6"
              >
                <div className="inline-flex items-center justify-center bg-red-100 w-16 h-16 rounded-full mb-4">
                  <AlertCircle size={28} className="text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-red-800 mb-2">Something went wrong</h3>
                <p className="text-red-700">{errorMessage || 'Please try again or contact us directly.'}</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      placeholder="your.email@example.com"
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
                
                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  whileHover={{ scale: status === 'submitting' ? 1 : 1.02 }}
                  whileTap={{ scale: status === 'submitting' ? 1 : 0.98 }}
                  className={`w-full flex items-center justify-center p-3 rounded-full font-bold shadow-md text-base transition-all ${
                    status === 'submitting' 
                      ? 'bg-primary/70 text-white/90 cursor-not-allowed' 
                      : 'bg-primary text-white hover:bg-primary-dark'
                  }`}
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={20} className="mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={18} className="ml-2" />
                    </>
                  )}
                </motion.button>
                
                <p className="text-xs text-gray-500 text-center">
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
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-grow">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">Email Address</h3>
                    <a href="mailto:contact@nood.ma" className="text-gray-800 hover:text-primary transition-colors">
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
                    <a href="tel:+212666654451" className="text-gray-800 hover:text-primary transition-colors">
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
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Business Hours</h2>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium">10:00 AM - 2:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium">Closed</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
        
        {/* Hidden iframe for form submission */}
        <iframe id="hidden-form-iframe" name="hidden-form-iframe" style={{display: 'none'}} title="Hidden Form Target"></iframe>
      </div>
    </motion.div>
  );
};

export default ContactUs;

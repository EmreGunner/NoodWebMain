import React, { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ApplyNowButtonProps {
  buttonText?: string;
  className?: string;
}

export const ApplyNowButton: React.FC<ApplyNowButtonProps> = ({
  buttonText = "Apply Now",
  className = "px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(
        "https://hooks.airtable.com/workflows/v1/genericWebhook/appziEgZIh15IcxSW/wflNIr39R5Yce086a/wtriIdn8eaC69HBoI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            Name: formData.name,
            Email: formData.email,
            Phone: formData.phone,
            Course: "Fashion Business Masterclass",
            Status: "Start"
          })
        }
      );

      const data = await response.json();
      
      if (response.ok && data.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '' });
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      alert("There was an error submitting your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      if (isSuccess) setIsSuccess(false);
    }, 300);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={className}>
        {buttonText}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8 max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close form"
              >
                <X size={20} />
              </button>
              
              {isSuccess ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-100">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Application Submitted!</h3>
                  <p className="text-gray-700 mb-5">
                    Thank you for applying to our Fashion Business Masterclass. We'll contact you shortly with the next steps.
                  </p>
                  <button
                    onClick={closeModal}
                    className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
                      Apply for Fashion Business Masterclass
                    </h2>
                    
                    <div className="bg-red-50 text-red-600 py-2 px-4 rounded-lg inline-flex items-center font-medium text-sm md:text-base mb-4">
                      <AlertCircle className="inline mr-2 h-4 w-4" />
                      Limited spots available
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex flex-col">
                      <label htmlFor="name" className="text-left text-sm font-medium text-gray-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={`w-full p-3 text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                          errors.name ? "border-red-300 bg-red-50" : "border-gray-300"
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>
                    
                    <div className="flex flex-col">
                      <label htmlFor="email" className="text-left text-sm font-medium text-gray-700 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`w-full p-3 text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                          errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                    
                    <div className="flex flex-col">
                      <label htmlFor="phone" className="text-left text-sm font-medium text-gray-700 mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1234567890"
                        className={`w-full p-3 text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
                          errors.phone ? "border-red-300 bg-red-50" : "border-gray-300"
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>
                    
                    <div className="mt-5">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                        className={`w-full p-3 text-white font-medium rounded-lg text-base transition-colors ${
                          isSubmitting 
                            ? "bg-primary/70 cursor-not-allowed" 
                            : "bg-primary hover:bg-primary/90"
                        }`}
                      >
                        {isSubmitting ? "Processing..." : "Submit Application"}
                      </motion.button>
                      
                      <p className="mt-3 text-xs text-center text-gray-500">
                        Your information is secure and will only be used for processing your application.
                      </p>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}; 
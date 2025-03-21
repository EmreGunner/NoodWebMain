import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, AlertCircle, Check, Loader2, Briefcase, Link as LinkIcon } from 'lucide-react';
import { createPortal } from 'react-dom';

interface CareerApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
}

const CareerApplicationForm: React.FC<CareerApplicationFormProps> = ({
  isOpen,
  onClose,
  jobTitle,
}) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    cv: '',
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Reset form when it's opened with new job
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        linkedinUrl: '',
        cv: '',
        notes: ''
      });
      setErrors({});
      setStatus('idle');
      setErrorMessage('');
    }
  }, [isOpen, jobTitle]);
  
  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    
    if (formData.linkedinUrl && !formData.linkedinUrl.includes('linkedin.com')) {
      newErrors.linkedinUrl = 'Please enter a valid LinkedIn URL';
    }
    
    if (!formData.cv.trim()) {
      newErrors.cv = 'CV link is required';
    } else if (!formData.cv.startsWith('http')) {
      newErrors.cv = 'Please enter a valid URL to your CV';
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
      // Create a hidden iframe for form submission
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
      formElement.action = "https://hooks.airtable.com/workflows/v1/genericWebhook/appziEgZIh15IcxSW/wfljN7Hk3mCqunyAF/wtrol6n5ZaheAkhDr";
      formElement.target = "hidden-form-iframe";
      formElement.enctype = "application/x-www-form-urlencoded";
      formElement.style.display = "none";
      
      // Add form fields
      const payload = {
        "Name": formData.name,
        "Email": formData.email,
        "Phone": formData.phone || "",
        "LinkedIn-Url": formData.linkedinUrl || "",
        "Notes": formData.notes || "",
        "Cv": formData.cv,
        "Position": jobTitle
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
      
      // Show success state after a brief delay
      setTimeout(() => {
        setStatus('success');
      }, 1000);
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus('error');
      setErrorMessage('Failed to submit application. Please try again later.');
    }
  };
  
  if (!isOpen) return null;
  
  return createPortal(
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-auto"
      >
        {status === 'success' ? (
          <div className="p-6 text-center">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            
            <div className="py-6 flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="text-green-600" size={32} />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for applying for the <span className="font-medium">{jobTitle}</span> position. 
                We'll review your application and get back to you soon.
              </p>
              
              <button
                onClick={onClose}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">
                  Apply for: {jobTitle}
                </h2>
                <button 
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {status === 'error' && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-start">
                  <AlertCircle className="mr-2 mt-0.5 flex-shrink-0" size={16} />
                  <span>{errorMessage || 'Something went wrong. Please try again.'}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-3 border ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
                
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
                
                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="+1 (123) 456-7890"
                  />
                </div>
                
                {/* LinkedIn URL Field */}
                <div>
                  <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn Profile
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LinkIcon size={16} className="text-gray-500" />
                    </div>
                    <input
                      id="linkedinUrl"
                      name="linkedinUrl"
                      type="url"
                      value={formData.linkedinUrl}
                      onChange={handleChange}
                      className={`w-full pl-10 p-3 border ${
                        errors.linkedinUrl ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors`}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  {errors.linkedinUrl && (
                    <p className="mt-1 text-sm text-red-600">{errors.linkedinUrl}</p>
                  )}
                </div>
                
                {/* CV Link Field */}
                <div>
                  <label htmlFor="cv" className="block text-sm font-medium text-gray-700 mb-1">
                    CV/Resume Link *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LinkIcon size={16} className="text-gray-500" />
                    </div>
                    <input
                      id="cv"
                      name="cv"
                      type="url"
                      value={formData.cv}
                      onChange={handleChange}
                      className={`w-full pl-10 p-3 border ${
                        errors.cv ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors`}
                      placeholder="https://drive.google.com/your-cv"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Please provide a link to your CV/Resume (Google Drive, Dropbox, etc.)
                  </p>
                  {errors.cv && (
                    <p className="mt-1 text-sm text-red-600">{errors.cv}</p>
                  )}
                </div>
                
                {/* Notes Field */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="Tell us why you're a great fit for this position..."
                  />
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`w-full p-3 rounded-lg text-white font-medium flex items-center justify-center ${
                    status === 'submitting' 
                      ? 'bg-primary/70 cursor-not-allowed' 
                      : 'bg-primary hover:bg-primary-dark'
                  } transition-colors`}
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={20} className="mr-2 animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      Submit Application
                    </>
                  )}
                </button>
                
                <p className="mt-3 text-xs text-center text-gray-500">
                  We respect your privacy and will never share your information with third parties.
                </p>
              </form>
            </div>
          </div>
        )}
      </motion.div>
    </div>,
    document.body
  );
};

export default CareerApplicationForm; 
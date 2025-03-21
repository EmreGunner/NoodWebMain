import React, { useState } from "react";
import { motion } from "framer-motion";

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    email: "",
    instagram: "",
    projectDescription: ""
  });
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submit triggered", formData);
    
    // Basic validation
    if (!formData.email || !formData.email.includes('@')) {
      console.log("Invalid email");
      setStatus("error");
      return;
    }
    
    // Set submitting state
    setStatus("submitting");
    
    try {
      // Using form submission approach to avoid CORS issues
      const formElement = document.createElement('form');
      formElement.method = 'POST';
      formElement.action = 'https://hooks.zapier.com/hooks/catch/22087400/2e6t5y9/';
      formElement.target = '_blank'; // This opens in a new tab but is hidden
      formElement.style.display = 'none';

      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value.toString();
        formElement.appendChild(input);
      });

      // Add form to body, submit it, then remove
      document.body.appendChild(formElement);
      formElement.submit();
      document.body.removeChild(formElement);
      
      // Show success state
      setStatus("success");
      setShowPopup(true);
      setFormData({
        email: "",
        instagram: "",
        projectDescription: ""
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="font-sans w-full max-w-md mx-auto bg-white rounded-2xl shadow-sm p-6 md:p-8 h-full relative">
      <h2 className="text-2xl md:text-3xl font-bold mb-3 text-black">
        Join the <span className="text-primary">Nood</span> Community
      </h2>
      
      <p className="text-sm md:text-base text-gray-700 mb-6">
        Limited to only 1000 members. Secure your spot now!
      </p>
      
      {status === "error" && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 border border-red-200">
          Couldn't add you to the list. Please try again.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-left text-sm font-medium text-gray-800 mb-2">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="youremail@example.com"
            required
            className="w-full p-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="instagram" className="text-left text-sm font-medium text-gray-800 mb-2">Instagram Handle</label>
          <div className="flex">
            <span className="inline-flex items-center px-4 bg-gray-50 text-gray-500 text-sm border border-r-0 border-gray-300 rounded-l-xl">
              @
            </span>
            <input
              id="instagram"
              name="instagram"
              type="text"
              value={formData.instagram}
              onChange={handleInputChange}
              placeholder="your_instagram"
              className="flex-1 p-3 text-base border border-gray-300 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="projectDescription" className="text-left text-sm font-medium text-gray-800 mb-2">Why do you want to join? *</label>
          <textarea
            id="projectDescription"
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleInputChange}
            placeholder="Tell us about yourself and why you want to join the Nood community..."
            required
            rows={3}
            className="w-full p-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <motion.button
          type="submit"
          disabled={status === "submitting"}
          whileHover={{ scale: status === "submitting" ? 1 : 1.02 }}
          whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
          className={`w-full p-4 text-white font-semibold rounded-xl transition-colors duration-200 mt-6 ${
            status === "submitting" 
              ? "bg-primary/70 cursor-not-allowed" 
              : "bg-primary hover:bg-secondary"
          }`}
        >
          {status === "submitting" ? "Processing..." : "Apply to Join"}
        </motion.button>
        
        <p className="mt-4 text-xs text-center text-gray-500">
          We respect your privacy and will never share your information.
        </p>
      </form>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-sm mx-4 relative shadow-xl"
          >
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Application Received!</h3>
              <p className="text-gray-700 mb-6">
                Thanks for applying to the Nood community! We'll review your application and be in touch soon.
              </p>
              <motion.button
                onClick={closePopup}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full p-3 bg-primary text-white rounded-xl hover:bg-secondary transition-colors font-semibold"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 
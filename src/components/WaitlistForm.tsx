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

  const handleSubmit = (e: React.FormEvent) => {
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
    
    // Post to Zapier webhook
    fetch("https://hooks.zapier.com/hooks/catch/22087400/2e6t5y9/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        setStatus("success");
        setShowPopup(true);
        setFormData({
          email: "",
          instagram: "",
          projectDescription: ""
        });
      } else {
        setStatus("error");
      }
    })
    .catch(() => {
      setStatus("error");
    });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="relative font-sans w-full p-4 md:p-6 text-center bg-white rounded-lg shadow-md h-full">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
        Join the <span className="text-primary">Nood</span> Community
      </h2>
      
      <p className="text-sm md:text-base text-gray-600 mb-4">
        Limited to only 1000 members. Secure your spot now!
      </p>
      
      {status === "error" && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 border border-red-300">
          Couldn't add you to the list. Please try again.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-left text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="youremail@example.com"
            required
            className="w-full p-2 text-base border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="instagram" className="text-left text-sm font-medium text-gray-700 mb-1">Instagram Handle</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 bg-gray-100 text-gray-500 text-sm border-2 border-r-0 border-gray-300 rounded-l-md">
              @
            </span>
            <input
              id="instagram"
              name="instagram"
              type="text"
              value={formData.instagram}
              onChange={handleInputChange}
              placeholder="your_instagram"
              className="flex-1 p-2 text-base border-2 border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="projectDescription" className="text-left text-sm font-medium text-gray-700 mb-1">Why do you want to join? *</label>
          <textarea
            id="projectDescription"
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleInputChange}
            placeholder="Tell us about yourself and why you want to join the Nood community..."
            required
            rows={3}
            className="w-full p-2 text-base border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <motion.button
          type="submit"
          disabled={status === "submitting"}
          whileHover={{ scale: status === "submitting" ? 1 : 1.03 }}
          whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
          className={`w-full p-3 text-white font-medium rounded-md transition-colors duration-200 ${
            status === "submitting" 
              ? "bg-primary/70 cursor-not-allowed" 
              : "bg-primary hover:bg-secondary"
          }`}
        >
          {status === "submitting" ? "Processing..." : "Apply to Join"}
        </motion.button>
      </form>
      
      <p className="mt-4 text-xs text-gray-500">
        We respect your privacy and will never share your information.
      </p>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 relative shadow-xl">
            <button 
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Application Received!</h3>
              <p className="text-gray-600 mb-4">
                Thanks for applying to the Nood community! We'll review your application and be in touch soon.
              </p>
              <motion.button
                onClick={closePopup}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full p-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors"
              >
                Close
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
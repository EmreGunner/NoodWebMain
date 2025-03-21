import React, { useState } from "react";
import { Form, FormField } from "./FormSystem";

// Example form fields configuration
const contactFormFields: FormField[] = [
  {
    id: "name",
    name: "name",
    type: "text",
    label: "Full Name",
    placeholder: "Your full name",
    required: true
  },
  {
    id: "email",
    name: "email",
    type: "email",
    label: "Email Address",
    placeholder: "you@example.com",
    required: true
  },
  {
    id: "message",
    name: "message",
    type: "textarea",
    label: "Message",
    placeholder: "Enter your message here...",
    required: true,
    maxLength: 500
  }
];

// Example waitlist form fields configuration
const waitlistFormFields: FormField[] = [
  {
    id: "email",
    name: "email",
    type: "email",
    label: "Email Address",
    placeholder: "you@example.com",
    required: true
  },
  {
    id: "instagram",
    name: "instagram",
    type: "instagram",
    label: "Instagram Handle",
    placeholder: "yourusername",
    required: true
  },
  {
    id: "reason",
    name: "reason",
    type: "textarea",
    label: "Why do you want to join?",
    placeholder: "Tell us a bit about yourself and why you want to join our community...",
    required: true,
    maxLength: 300
  }
];

export const FormSystemExample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Example handler for contact form submission
  const handleContactSubmit = async (formData: Record<string, string>) => {
    console.log("Contact form submitted:", formData);
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
  };

  // Example handler for waitlist form submission
  const handleWaitlistSubmit = async (formData: Record<string, string>) => {
    console.log("Waitlist form submitted:", formData);
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Form System Examples</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Example 1: Standard Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Regular Contact Form</h2>
          <Form
            fields={contactFormFields}
            onSubmit={handleContactSubmit}
            submitButtonText="Send Message"
            title="Contact Us"
            description="We'll get back to you within 48 hours"
            footerText="Your information is secure and will not be shared."
          />
        </div>
        
        {/* Example 2: Modal Form */}
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-4">Modal Waitlist Form</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Apply to Join
          </button>
          
          <Form
            fields={waitlistFormFields}
            onSubmit={handleWaitlistSubmit}
            submitButtonText="Submit Application"
            title="Join Our Waitlist"
            description="Limited to only 1000 members"
            isModal={true}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            successMessage={{
              title: "Application Received!",
              message: "Thanks for applying to join our community. We'll review your application and get back to you soon.",
              buttonText: "Got it!"
            }}
            footerText="Membership is subject to review and approval."
          />
        </div>
      </div>
    </div>
  );
}; 
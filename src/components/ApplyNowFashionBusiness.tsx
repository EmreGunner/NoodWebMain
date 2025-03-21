import React, { useState } from "react";
import { Form, FormField } from "./FormSystem";

interface ApplyNowFashionBusinessProps {
  // Optional props for customization
  showTitle?: boolean;
  alternativeTitle?: string;
  displayMode?: 'modal' | 'inline';
  buttonText?: string;
}

/**
 * A dedicated component for Fashion Business Masterclass applications
 * that can be used either as an inline form or a modal popup.
 * 
 * Usage examples:
 * 
 * 1. As a modal with a button:
 * <ApplyNowFashionBusiness displayMode="modal" buttonText="Apply Now" />
 * 
 * 2. As an inline form on a page:
 * <ApplyNowFashionBusiness displayMode="inline" showTitle={true} />
 */
export const ApplyNowFashionBusiness: React.FC<ApplyNowFashionBusinessProps> = ({
  showTitle = true,
  alternativeTitle,
  displayMode = 'modal',
  buttonText = "Apply Now"
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Define form fields for the application
  const applyFormFields: FormField[] = [
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
      required: true,
      validation: (value) => {
        return /\S+@\S+\.\S+/.test(value) ? null : "Please enter a valid email address";
      }
    },
    {
      id: "phone",
      name: "phone",
      type: "text",
      label: "Phone Number",
      placeholder: "+1234567890",
      required: true
    }
  ];

  // Submit handler to send data to Airtable webhook
  const handleSubmit = async (formData: Record<string, string>) => {
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
      
      if (!response.ok || !data.success) {
        throw new Error("Failed to submit application");
      }
      
      return Promise.resolve();
    } catch (error) {
      console.error("Error submitting application:", error);
      return Promise.reject(error);
    }
  };

  // For modal display mode
  if (displayMode === 'modal') {
    return (
      <>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          {buttonText}
        </button>
        
        <Form
          fields={applyFormFields}
          onSubmit={handleSubmit}
          submitButtonText="Submit Application"
          title={showTitle ? (alternativeTitle || "Apply for Fashion Business Masterclass") : undefined}
          description="Limited spots available"
          isModal={true}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          successMessage={{
            title: "Application Submitted!",
            message: "Thank you for applying to our Fashion Business Masterclass. We'll contact you shortly with the next steps.",
            buttonText: "Close"
          }}
          footerText="Your information is secure and will only be used for processing your application."
        />
      </>
    );
  }

  // For inline display mode
  return (
    <div className="my-8">
      <Form
        fields={applyFormFields}
        onSubmit={handleSubmit}
        submitButtonText="Submit Application"
        title={showTitle ? (alternativeTitle || "Apply for Fashion Business Masterclass") : undefined}
        description="Limited spots available"
        isModal={false}
        successMessage={{
          title: "Application Submitted!",
          message: "Thank you for applying to our Fashion Business Masterclass. We'll contact you shortly with the next steps.",
          buttonText: "Close"
        }}
        footerText="Your information is secure and will only be used for processing your application."
      />
    </div>
  );
}; 
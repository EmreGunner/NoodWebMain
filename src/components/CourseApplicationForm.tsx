import React from "react";
import { Form, FormField } from "./FormSystem";

interface CourseApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
}

const CourseApplicationForm: React.FC<CourseApplicationFormProps> = ({
  isOpen,
  onClose,
  courseName,
}) => {
  // Define form fields
  const applicationFields: FormField[] = [
    {
      id: "name",
      name: "name",
      type: "text",
      label: "Full Name",
      placeholder: "Enter your full name",
      required: true,
    },
    {
      id: "email",
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "you@example.com",
      required: true,
    },
    {
      id: "phone",
      name: "phone",
      type: "text",
      label: "Phone Number",
      placeholder: "e.g., +212 612 345 678",
    },
  ];

  // Handle form submission
  const handleSubmit = async (formData: Record<string, string>) => {
    const payload = {
      Name: formData.name,
      Email: formData.email,
      Phone: formData.phone || "",
      Course: courseName,
      Status: "Start",
    };

    const response = await fetch(
      "https://hooks.airtable.com/workflows/v1/genericWebhook/appziEgZIh15IcxSW/wflNIr39R5Yce086a/wtriIdn8eaC69HBoI",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    
    if (!data.success) {
      throw new Error("Failed to submit application");
    }
  };

  return (
    <Form
      fields={applicationFields}
      onSubmit={handleSubmit}
      submitButtonText="Submit Application"
      title={`Apply for ${courseName}`}
      description="Complete this form to apply for the course. We'll contact you with next steps."
      isModal={true}
      isOpen={isOpen}
      onClose={onClose}
      successMessage={{
        title: "Application Submitted!",
        message: "Thank you for your interest in our course. We'll review your application and get back to you soon.",
        buttonText: "Close",
      }}
      footerText="Your information is secure and will only be used for course-related communications."
    />
  );
};

export default CourseApplicationForm; 
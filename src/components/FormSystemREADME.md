# Reusable Form System

This is a flexible, type-safe form component system that maintains consistent styling and error handling while allowing for easy configuration for different form scenarios.

## Files

1. `FormSystem.tsx` - The core reusable form component
2. `FormSystemExample.tsx` - An example implementation showing different form configurations

## Features

- **Configurable Fields**: Support for text, email, textarea, and Instagram handle inputs
- **Validation**: Built-in and custom validation options
- **Modal Support**: Can be used as a modal popup or embedded directly in the page
- **Success Feedback**: Customizable success messages and popup
- **Responsive Design**: Fully responsive with mobile-friendly UI
- **Type Safety**: Written with TypeScript for better type safety

## Usage Example

```tsx
import React, { useState } from "react";
import { Form, FormField } from "./FormSystem";

// Define your form fields
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

// Create a submission handler
const handleSubmit = async (formData: Record<string, string>) => {
  // Process form data (e.g., send to API)
  console.log(formData);
  return Promise.resolve();
};

// Use the form component
const MyFormPage = () => (
  <Form
    fields={contactFormFields}
    onSubmit={handleSubmit}
    submitButtonText="Send Message"
    title="Contact Us"
    description="We'll get back to you within 48 hours"
  />
);
```

## Modal Form Example

```tsx
const [isModalOpen, setIsModalOpen] = useState(false);

<button onClick={() => setIsModalOpen(true)}>
  Open Form
</button>

<Form
  fields={formFields}
  onSubmit={handleSubmit}
  submitButtonText="Submit"
  title="Form Title"
  isModal={true}
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
/>
```

## Resolving Linter Errors

The form system requires the following dependencies to be properly installed and configured:

1. **React and React Types**: For React components
   ```
   npm install react @types/react
   ```

2. **Framer Motion**: For animations
   ```
   npm install framer-motion
   ```

3. **Lucide React**: For icons
   ```
   npm install lucide-react
   ```

4. **TypeScript Configuration**: Ensure your `tsconfig.json` has proper JSX support:
   ```json
   {
     "compilerOptions": {
       "jsx": "react",
       "esModuleInterop": true,
       "lib": ["dom", "dom.iterable", "esnext"],
       "skipLibCheck": true
     }
   }
   ```

## Customizing Field Types

To add a new field type:

1. Update the `FormFieldType` type in `FormSystem.tsx`:
   ```tsx
   export type FormFieldType = 'text' | 'email' | 'textarea' | 'instagram' | 'your-new-type';
   ```

2. Add the rendering logic for your new field type in the `renderField` function within the Form component.

## Extending the Form System

The form system can be extended in several ways:

1. **Additional Field Types**: Add new field types to support more input formats
2. **Custom Styling**: Modify the Tailwind classes to match your design system
3. **Multi-Step Forms**: Extend the component to support multi-page forms
4. **File Upload**: Add file upload capability with preview support
5. **Integration with Form Libraries**: Connect with Formik, React Hook Form, or other form libraries 
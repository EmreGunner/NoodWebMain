# Airtable Form Integration Guide

This guide explains how we've implemented the Airtable webhook integration for course application forms, particularly for the Fashion Business Masterclass course.

## Overview

We've created a reusable form system that can be integrated with Airtable webhooks to collect and store application data. The implementation currently focuses on the Fashion Business Masterclass course, with the following components:

1. **FormSystem.tsx**: The core reusable form component
2. **ApplyNowButton.tsx**: A button that opens a modal form for course applications
3. **ApplyNowFashionBusiness.tsx**: A specialized component for Fashion Business Masterclass applications

## Implementation Steps

Here's a step-by-step overview of how the integration works:

1. **Form Creation**: We use the FormSystem to create a customizable form with fields for Name, Email, and Phone
2. **Button Integration**: The "Apply Now" button on the course card opens a modal form
3. **Data Collection**: The form collects user data and validates it
4. **Webhook Submission**: Form data is submitted to the Airtable webhook with the Course name pre-filled
5. **Success Feedback**: Users get a success message when their application is received

## Webhook Integration

The application data is sent to Airtable using the following endpoint:
```
https://hooks.airtable.com/workflows/v1/genericWebhook/appziEgZIh15IcxSW/wflNIr39R5Yce086a/wtriIdn8eaC69HBoI
```

The data format follows this structure:
```json
{
  "Name": "User's full name",
  "Email": "user@example.com",
  "Phone": "+1234567890",
  "Course": "Fashion Business Masterclass",
  "Status": "Start"
}
```

## Usage Examples

### 1. Course Card Integration

We've updated the `CourseCard` component to use the `ApplyNowButton` specifically for the Fashion Business Masterclass course:

```tsx
// In CourseCard.tsx
{isFashionBusinessCourse ? (
  <ApplyNowButton 
    buttonText={seatsLeft <= 3 ? 'Reserve Your Seat Now!' : 'Apply Now'} 
    className="bg-primary text-white font-bold text-lg py-3 rounded-full w-full transition-all duration-300 hover:bg-primary-dark shadow-md hover:shadow-lg"
  />
) : (
  <motion.button className="...">
    {seatsLeft <= 3 ? 'Reserve Your Seat Now!' : 'Apply Now'}
  </motion.button>
)}
```

### 2. Standalone Usage (Modal with Button)

You can place the form anywhere in your application with:

```tsx
import { ApplyNowFashionBusiness } from './components/ApplyNowFashionBusiness';

// In your component
<ApplyNowFashionBusiness 
  displayMode="modal" 
  buttonText="Apply for Fashion Business Course" 
/>
```

### 3. Inline Form (No Modal)

For embedding the form directly on a page (like a dedicated application page):

```tsx
import { ApplyNowFashionBusiness } from './components/ApplyNowFashionBusiness';

// In your component
<ApplyNowFashionBusiness 
  displayMode="inline" 
  showTitle={true}
  alternativeTitle="Start Your Fashion Business Journey Today" 
/>
```

## Extending to Other Courses

To implement this for other courses:

1. Create a specialized component similar to `ApplyNowFashionBusiness.tsx`
2. Update the webhook URL if needed
3. Modify the form fields as required
4. Change the static Course name in the submission payload

## Troubleshooting

If the form submission fails:

1. Check browser console for error messages
2. Verify that the webhook URL is correct and accessible
3. Ensure the data format matches what Airtable expects
4. Add more detailed error handling if needed 
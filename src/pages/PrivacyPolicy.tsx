import React from 'react';
import { Helmet } from 'react-helmet';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Helmet>
        <title>Privacy Policy - NoodWeb</title>
        <meta name="description" content="Privacy Policy for NoodWeb" />
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose prose-lg">
      PRIVACY POLICY – NOOD PLATFORM

1. Introduction
NOOD ("we," "us," or "our") operates www.nood.ma. This policy explains how we collect, use, and protect your personal data when you use our platform. By accessing NOOD, you agree to these terms.

2. Data We Collect
Personal Information: Name, email, phone number, billing address, and payment details.
Usage Data: IP address, device type, browser, pages visited, and interaction with courses/community.
User Content: Posts, comments, or files shared in the community.

3. How We Use Your Data
To process payments and deliver purchased services (courses, digital products).
To manage your account and provide customer support.
To send updates, offers, or legal notices (with your consent where required).
To moderate the community and enforce platform rules.
To comply with Moroccan tax, legal, or regulatory obligations.

4. Data Sharing
Third Parties: Payment processors (e.g., CMI, Payzone) and IT service providers (e.g., hosting, analytics).
Legal Compliance: We may disclose data to Moroccan authorities if required by law (e.g., tax audits, fraud investigations).
Never Sold: We do not sell your data to third parties for marketing purposes.

5. Data Security
SSL encryption secures data transmission.
Access to personal data is restricted to authorized personnel.
Regular audits of security practices.

6. Your Rights
Access/Correction: Request a copy of your data or update inaccuracies via contact@nood.ma.
Deletion: Request account deletion (excludes data required for legal/tax compliance).
Opt-Out: Unsubscribe from marketing emails via the link in each email.

7. Cookies
We use cookies to improve site functionality and track usage analytics.
Adjust cookie settings via your browser.

8. Children’s Privacy
NOOD does not target users under 16. Minors must obtain parental consent to use the platform.

9. International Transfers
Data is stored in Morocco. By using NOOD, international users consent to data processing under Moroccan law.

10. Updates to This Policy
Changes will be posted on this page. Continued use of NOOD constitutes acceptance.

11. Contact Us
For privacy concerns or data requests:
Email: contact@nood.ma
Address: [Your Registered Address, Morocco]
Phone: +212 XXX-XXXXXX


      </div>
    </div>
  );
};

export default PrivacyPolicy;
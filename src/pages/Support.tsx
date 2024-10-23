import React, { useState } from 'react'
import { MessageCircle, Mail, Phone, ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: 'How do I enroll in a course?',
    answer: 'To enroll in a course, navigate to the course page and click the "Enroll Now" button. Follow the prompts to complete your enrollment and payment.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept major credit cards (Visa, MasterCard, American Express) and PayPal for course payments.'
  },
  {
    question: 'Can I get a refund if I\'m not satisfied with a course?',
    answer: 'Yes, we offer a 30-day money-back guarantee for all our courses. If you\'re not satisfied, you can request a full refund within 30 days of your purchase.'
  },
  {
    question: 'How long do I have access to a course after enrolling?',
    answer: 'Once you enroll in a course, you have lifetime access to the course materials, including any future updates.'
  },
  {
    question: 'Do you offer certificates upon course completion?',
    answer: 'Yes, we provide a certificate of completion for each course you finish. You can download and share your certificates from your user profile.'
  },
]

const Support: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Support Center</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg">
              <button
                className="flex justify-between items-center w-full p-4 text-left font-semibold hover:bg-gray-50 transition duration-300"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                {faq.question}
                <span>{openFaq === index ? <ChevronUp /> : <ChevronDown />}</span>
              </button>
              {openFaq === index && (
                <div className="p-4 bg-gray-50">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
            <MessageCircle className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
            <p className="mb-4">Chat with our support team in real-time</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
              Start Chat
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
            <Mail className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="text-lg font-semibold mb-2">Email Support</h3>
            <p className="mb-4">Send us an email and we'll respond within 24 hours</p>
            <a href="mailto:support@educonsult.com" className="text-blue-600 hover:underline">
              support@educonsult.com
            </a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
            <Phone className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
            <p className="mb-4">Call us for immediate assistance</p>
            <a href="tel:+15551234567" className="text-blue-600 hover:underline">
              +1 (555) 123-4567
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Support
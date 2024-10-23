import React from 'react'
import { ArrowRight, Briefcase, PenTool, Globe, TrendingUp, Mail, Code, Search } from 'lucide-react'

const services = [
  { icon: Briefcase, title: 'Digital Strategy Consulting', description: 'Tailored strategies to boost your online presence and achieve your business goals.' },
  { icon: PenTool, title: 'Branding and Graphic Design', description: 'Create a memorable brand identity that resonates with your target audience.' },
  { icon: Globe, title: 'Web Design and Development', description: 'Custom websites that are both visually stunning and highly functional.' },
  { icon: TrendingUp, title: 'Social Media Management', description: 'Engage your audience and grow your brand across all major social platforms.' },
  { icon: Mail, title: 'Email Marketing', description: 'Craft compelling email campaigns that convert leads into customers.' },
  { icon: Search, title: 'SEO Optimization', description: 'Improve your search engine rankings and drive organic traffic to your website.' },
]

const Agency: React.FC = () => {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 nood-gradient-text">NOOD Agency</h1>
        <p className="text-xl text-text max-w-3xl mx-auto">
          Transform your business with our expert digital marketing services. From strategy to execution, we've got you covered.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="nood-card p-6">
              <service.icon className="text-primary mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-text mb-4">{service.description}</p>
              <button className="text-primary hover:text-secondary inline-flex items-center">
                Learn More <ArrowRight className="ml-1" size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center py-12 bg-accent rounded-3xl">
        <h2 className="text-2xl font-bold mb-4">Ready to Elevate Your Digital Presence?</h2>
        <p className="text-lg text-text mb-6">
          Let's discuss how we can help your business thrive in the digital landscape.
        </p>
        <button className="btn-secondary inline-flex items-center">
          Schedule a Consultation <ArrowRight className="ml-2" size={20} />
        </button>
      </section>
    </div>
  )
}

export default Agency
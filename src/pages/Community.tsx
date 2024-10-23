import React from 'react'
import { ArrowRight, Users, MessageCircle, Zap, Award } from 'lucide-react'

const Community: React.FC = () => {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 nood-gradient-text">NOOD Community</h1>
        <p className="text-xl text-text max-w-3xl mx-auto">
          Join our thriving Telegram-based community. Connect, learn, and grow with like-minded individuals focused on side hustle development.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="nood-card p-6">
          <Users className="text-primary mb-4" size={48} />
          <h2 className="text-2xl font-bold mb-4">Join the Conversation</h2>
          <p className="text-text mb-4">
            Engage with fellow entrepreneurs, share ideas, and get instant feedback on your projects.
          </p>
          <button className="btn-primary inline-flex items-center">
            Join Telegram Community <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
        <div className="nood-card p-6">
          <MessageCircle className="text-primary mb-4" size={48} />
          <h2 className="text-2xl font-bold mb-4">Sub-Communities</h2>
          <p className="text-text mb-4">
            Explore specialized groups for Graphic Design, E-commerce, Trading, and Content Creation.
          </p>
          <button className="btn-secondary inline-flex items-center">
            Explore Sub-Communities <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Community Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="nood-card p-6">
            <Zap className="text-primary mb-4" size={36} />
            <h3 className="text-xl font-semibold mb-2">Networking Opportunities</h3>
            <p className="text-text">Connect with potential collaborators, clients, and mentors.</p>
          </div>
          <div className="nood-card p-6">
            <MessageCircle className="text-primary mb-4" size={36} />
            <h3 className="text-xl font-semibold mb-2">Expert Q&A Sessions</h3>
            <p className="text-text">Regular sessions with industry experts to answer your questions.</p>
          </div>
          <div className="nood-card p-6">
            <Award className="text-primary mb-4" size={36} />
            <h3 className="text-xl font-semibold mb-2">Exclusive Resources</h3>
            <p className="text-text">Access to tools, guides, and discounts for community members.</p>
          </div>
        </div>
      </section>

      <section className="text-center py-12 bg-accent rounded-3xl">
        <h2 className="text-2xl font-bold mb-4">Ready to Join Our Community?</h2>
        <p className="text-lg text-text mb-6">
          Take the first step towards building your digital side hustle with the support of our community.
        </p>
        <button className="btn-primary inline-flex items-center">
          Join NOOD Community <ArrowRight className="ml-2" size={20} />
        </button>
      </section>
    </div>
  )
}

export default Community
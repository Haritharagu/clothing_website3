'use client'

import { useState } from 'react'
import { Mail, MessageCircle, Share2, Send } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  return (
    <footer className="bg-dark-bg border-t border-dark-gray mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-brand-gold mb-4">AURA</h2>
            <p className="text-dark-gray text-sm leading-relaxed">
              Defining modern elegance through premium craftsmanship and timeless silhouettes since 2018.
            </p>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-semibold text-text-light mb-4">Customer Care</h3>
            <ul className="space-y-2">
              <li>
                <a href="/shipping" className="text-dark-gray hover:text-brand-gold transition-colors text-sm">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="/size-guide" className="text-dark-gray hover:text-brand-gold transition-colors text-sm">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="/track-order" className="text-dark-gray hover:text-brand-gold transition-colors text-sm">
                  Track Your Order
                </a>
              </li>
              <li>
                <a href="/contact" className="text-dark-gray hover:text-brand-gold transition-colors text-sm">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-text-light mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="/our-story" className="text-dark-gray hover:text-brand-gold transition-colors text-sm">
                  Our Story
                </a>
              </li>
              <li>
                <a href="/sustainability" className="text-dark-gray hover:text-brand-gold transition-colors text-sm">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="/careers" className="text-dark-gray hover:text-brand-gold transition-colors text-sm">
                  Careers
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-dark-gray hover:text-brand-gold transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-text-light mb-4">Stay Connected</h3>
            <p className="text-dark-gray text-sm mb-4">
              Subscribe for exclusive early access and style updates
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full input-field px-4 py-2 rounded-sm text-sm"
              />
              <button
                type="submit"
                className="w-full btn-primary text-sm flex items-center justify-center space-x-2"
              >
                <span>Subscribe</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-dark-gray mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-dark-gray text-sm mb-4 md:mb-0">
              © 2024 Aura Fashion. All rights reserved.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-dark-gray hover:text-brand-gold transition-colors"
                aria-label="Discord"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-dark-gray hover:text-brand-gold transition-colors"
                aria-label="Share"
              >
                <Share2 className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-dark-gray hover:text-brand-gold transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

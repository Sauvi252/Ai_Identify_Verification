
import React, { useState } from 'react';
import { api } from '../services/api';
import { SendIcon, ChatBubbleIcon } from './icons';

/**
 * ContactPage Component
 * 
 * Provides a user interface for contacting support.
 * Features:
 * - Real-time form validation
 * - API integration with simulated backend
 * - Responsive layout with contact information and form
 * - Accessible status feedback
 */
const ContactPage: React.FC = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  
  // State for submission status (idle, submitting, success, error)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  /**
   * Handles form submission
   * 1. Prevents default browser submission
   * 2. Sets loading state
   * 3. Calls API
   * 4. Resets form on success
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      // Simulate API call to save message
      await api.submitContactForm(formData);
      setStatus('success');
      
      // Reset form
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="py-20 container mx-auto px-6 animate-fade-in">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-100 mb-4">Contact Support</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Have questions about the VeriSecure Demo Platform? Our support team is here to help you understand the simulation environment.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Card */}
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 h-fit">
          <h3 className="text-xl font-bold text-white mb-6">Get in Touch</h3>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-emerald-500/10 p-3 rounded-lg text-emerald-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Headquarters</p>
                <p className="text-slate-200">Innovation Labs, Tech Campus</p>
                <p className="text-slate-200">Bangalore, India</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-emerald-500/10 p-3 rounded-lg text-emerald-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Email Support</p>
                <p className="text-slate-200">support@verisecure-demo.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-emerald-500/10 p-3 rounded-lg text-emerald-400">
                 <ChatBubbleIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Live Chat</p>
                <p className="text-slate-200">Available 24/7 (AI Bot)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-slate-800/30 p-8 rounded-2xl border border-slate-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  placeholder="John Doe"
                  aria-label="Full Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  placeholder="john@example.com"
                  aria-label="Email Address"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
              <select
                value={formData.subject}
                onChange={e => setFormData({...formData, subject: e.target.value})}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                aria-label="Subject"
              >
                <option>General Inquiry</option>
                <option>API Access Request</option>
                <option>Report a Bug</option>
                <option>Partnership</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
                placeholder="How can we help you?"
                aria-label="Message"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting' || status === 'success'}
              className={`w-full flex items-center justify-center space-x-2 py-4 rounded-xl font-bold text-white transition-all duration-300
                ${status === 'success' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-500/20'}
                ${status === 'submitting' ? 'opacity-75 cursor-wait' : ''}
              `}
            >
              {status === 'submitting' ? (
                <span>Sending...</span>
              ) : status === 'success' ? (
                <span>Message Sent Successfully!</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <SendIcon className="h-5 w-5" />
                </>
              )}
            </button>
            
            {status === 'error' && (
              <p className="text-red-400 text-center text-sm" role="alert">Something went wrong. Please try again later.</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

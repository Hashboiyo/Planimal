import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) return;

    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1200);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-rose-50 text-rose-700 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-4 border border-rose-100">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Open Communication</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight mb-4">
            Connect With Us
          </h2>
          <p className="text-lg text-slate-600 font-light leading-relaxed">
            Have questions about our audits? Want to sponsor a custom food drive or learn more about our child wellness protocols? Reach out to our teams directly.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          {/* Column 1: Contact Coordinates */}
          <div className="lg:col-span-5 bg-gradient-to-br from-white/95 via-amber-50/10 to-slate-50/50 text-slate-800 rounded-3xl p-8 sm:p-10 flex flex-col justify-between border border-slate-150 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-8">
              <div>
                <h3 className="font-display font-bold text-2xl mb-2 text-slate-900">Our Contact Details</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">
                  Reach out directly via our official channels for any assistance, support, or questions.
                </p>
              </div>

              <div className="space-y-6">
                {/* Call center */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-slate-50 rounded-xl text-rose-500 shrink-0 border border-slate-100">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-slate-700 uppercase tracking-wider font-mono">Helpline & Queries</h4>
                    <p className="text-slate-600 text-sm font-light mt-1">
                      +92 (317) 773-5097 <span className="text-slate-400 font-mono text-xs">(Operations)</span>
                    </p>
                  </div>
                </div>

                {/* Email coordinates */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-slate-50 rounded-xl text-emerald-500 shrink-0 border border-slate-100">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-slate-700 uppercase tracking-wider font-mono">Electronic Inquiries</h4>
                    <p className="text-slate-600 text-sm font-light mt-1">
                      info@yaranefuqra.org
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 mt-8 flex items-center space-x-3 text-xs text-slate-500 font-light">
              <Clock className="h-4 w-4 text-slate-400 shrink-0" />
              <span>Office Hours: Mon - Sat (9:00 AM - 6:00 PM PST)</span>
            </div>
          </div>

          {/* Column 2: Inquiry Form */}
          <div id="contact-form-container" className="lg:col-span-7 bg-white border border-slate-150 p-8 sm:p-10 rounded-3xl shadow-sm relative flex flex-col justify-center">
            {isSubmitted ? (
              <div id="contact-success-state" className="text-center py-12 space-y-4">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-500 mb-2">
                  <CheckCircle2 className="h-10 w-10 stroke-[1.8]" />
                </div>
                <h3 className="font-display font-extrabold text-2xl text-slate-900">
                  Message Transmitted Successfully!
                </h3>
                <p className="text-sm text-slate-500 font-light max-w-md mx-auto leading-relaxed">
                  Thank you for writing to Yaran-e-Fuqra. A representative from our central coordination desk will review your inquiry and follow up via email within 24 working hours.
                </p>
                <button
                  id="reset-contact-form"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg font-mono uppercase tracking-wider transition-all"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-display font-bold text-2xl text-slate-900 mb-2">
                  Leave a Message
                </h3>
                <p className="text-sm text-slate-400 font-light mb-6">
                  Fill out the form below and we will route your query to the concerned department.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="con-name" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-2">
                      Your Name
                    </label>
                    <input
                      id="con-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Zainab Malik"
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-rose-500 focus:ring-1 focus:ring-rose-500 rounded-xl py-3 px-4 text-slate-800 placeholder-slate-400 font-sans text-sm outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="con-email" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-2">
                      Email Address
                    </label>
                    <input
                      id="con-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. zainab@example.com"
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-rose-500 focus:ring-1 focus:ring-rose-500 rounded-xl py-3 px-4 text-slate-800 placeholder-slate-400 font-sans text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="con-subject" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Subject Line
                  </label>
                  <input
                    id="con-subject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Sponsoring monthly meal drives"
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-rose-500 focus:ring-1 focus:ring-rose-500 rounded-xl py-3 px-4 text-slate-800 placeholder-slate-400 font-sans text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="con-msg" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Detailed Message
                  </label>
                  <textarea
                    id="con-msg"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your questions, requests, or corporate sponsorship proposal in detail..."
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-rose-500 focus:ring-1 focus:ring-rose-500 rounded-xl p-4 text-slate-800 placeholder-slate-400 font-sans text-sm outline-none transition-all resize-none"
                  />
                </div>

                <button
                  id="submit-contact-inquiry"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 rounded-xl text-center shadow-md flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4.5 w-4.5" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

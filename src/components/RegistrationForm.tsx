import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Users, CheckCircle2, MapPin, User, Mail, Phone, Heart, Trash2, CalendarCheck } from 'lucide-react';
import { ORPHANAGES } from '../data';
import { VisitRegistration } from '../types';

export default function RegistrationForm() {
  const [registrations, setRegistrations] = useState<VisitRegistration[]>([]);
  const [selectedOrphanageId, setSelectedOrphanageId] = useState(ORPHANAGES[0].id);
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('');
  const [visitorCount, setVisitorCount] = useState(1);
  const [purpose, setPurpose] = useState<'gifts' | 'meal' | 'teaching' | 'general'>('general');
  const [notes, setNotes] = useState('');
  
  // Alert & Modal states
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [latestRegistration, setLatestRegistration] = useState<VisitRegistration | null>(null);

  // Load existing registrations on mount
  useEffect(() => {
    const saved = localStorage.getItem('yaran_registrations');
    if (saved) {
      try {
        setRegistrations(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse registrations', e);
      }
    }
  }, []);

  // Save registrations helper
  const saveRegistrations = (newRegs: VisitRegistration[]) => {
    setRegistrations(newRegs);
    localStorage.setItem('yaran_registrations', JSON.stringify(newRegs));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !visitDate || !visitTime) {
      return;
    }

    const orphanage = ORPHANAGES.find(o => o.id === selectedOrphanageId) || ORPHANAGES[0];

    const newReg: VisitRegistration = {
      id: 'reg-' + Math.random().toString(36).substring(2, 11),
      name,
      email,
      phone,
      visitDate,
      visitTime,
      orphanageId: selectedOrphanageId,
      orphanageName: orphanage.name,
      visitorCount,
      purpose,
      notes,
      registeredAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'confirmed' // Instant confirmation for design-feel
    };

    const updatedRegs = [newReg, ...registrations];
    saveRegistrations(updatedRegs);
    setLatestRegistration(newReg);
    setShowSuccessModal(true);

    // Reset Form Fields
    setName('');
    setEmail('');
    setPhone('');
    setVisitDate('');
    setVisitTime('');
    setVisitorCount(1);
    setPurpose('general');
    setNotes('');
  };

  const handleCancelRegistration = (id: string) => {
    const filtered = registrations.filter(r => r.id !== id);
    saveRegistrations(filtered);
  };

  const activeOrphanage = ORPHANAGES.find(o => o.id === selectedOrphanageId) || ORPHANAGES[0];

  return (
    <section id="visit" className="py-20 md:py-28 bg-white/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-rose-50 text-rose-700 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-4 border border-rose-100">
            <Heart className="h-3.5 w-3.5 text-rose-500" />
            <span>Foster Connection</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight mb-4">
            Visit an Orphanage
          </h2>
          <p className="text-lg text-slate-600 font-light leading-relaxed">
            We dream to bring joy to every orphan through visitors who share their warmth. We aim to coordinate verified partner home visits in Lahore so you can schedule a day and hope to plant smiles.
          </p>
        </div>

        {/* Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Form */}
          <div id="visit-form-container" className="lg:col-span-7 bg-white/70 border border-slate-150 p-6 sm:p-10 rounded-3xl shadow-sm backdrop-blur-sm">
            <h3 className="font-display font-bold text-2xl text-slate-900 mb-6 flex items-center space-x-2">
              <CalendarCheck className="h-6 w-6 text-rose-500" />
              <span>Schedule Your Visit</span>
            </h3>

            <div className="mb-6 p-4 rounded-2xl bg-amber-50/50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
              <div className="font-bold text-sm bg-amber-500 text-white rounded-full h-5 w-5 flex items-center justify-center shrink-0">i</div>
              <div>
                <p className="font-semibold">Visit Contribution Required</p>
                <p className="text-slate-600 mt-0.5">To cover refreshments and coordinate security clearances, there is an entry visit contribution of <strong className="text-amber-800">1000 PKR per person</strong>.</p>
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              {/* Orphanage Selection */}
              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  1. Select a Partner Orphanage in Lahore
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {ORPHANAGES.map((orph) => (
                    <button
                      id={`opt-orphanage-${orph.id}`}
                      key={orph.id}
                      type="button"
                      onClick={() => setSelectedOrphanageId(orph.id)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        selectedOrphanageId === orph.id
                          ? 'border-rose-500 bg-rose-500/5 ring-1 ring-rose-500'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="font-semibold text-slate-900 text-xs sm:text-sm leading-tight mb-1">
                        {orph.name}
                      </div>
                      <div className="text-xs font-mono text-slate-400 flex items-center">
                        <MapPin className="h-3 w-3 text-slate-400 mr-1 shrink-0" />
                        {orph.city}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="vis-name" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <input
                      id="vis-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Haris Ali"
                      className="w-full bg-white border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 rounded-xl py-3 pl-11 pr-4 text-slate-800 placeholder-slate-400 font-sans text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="vis-email" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <input
                      id="vis-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. haris@example.com"
                      className="w-full bg-white border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 rounded-xl py-3 pl-11 pr-4 text-slate-800 placeholder-slate-400 font-sans text-sm outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Phone & Visitors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="vis-phone" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <input
                      id="vis-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +92 300 1234567"
                      className="w-full bg-white border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 rounded-xl py-3 pl-11 pr-4 text-slate-800 placeholder-slate-400 font-sans text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="vis-count" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Number of Visitors
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <input
                      id="vis-count"
                      type="number"
                      required
                      min={1}
                      max={12}
                      value={visitorCount}
                      onChange={(e) => setVisitorCount(parseInt(e.target.value) || 1)}
                      className="w-full bg-white border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 rounded-xl py-3 pl-11 pr-4 text-slate-800 font-sans text-sm outline-none transition-colors"
                    />
                  </div>
                  <span className="block mt-1.5 text-[11px] text-amber-700 font-semibold font-mono">
                    ⚠️ Total Visit Cost: {visitorCount * 1000} PKR (1000 PKR/person)
                  </span>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="vis-date" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <input
                      id="vis-date"
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 rounded-xl py-3 pl-11 pr-4 text-slate-800 font-sans text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="vis-time" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <select
                      id="vis-time"
                      required
                      value={visitTime}
                      onChange={(e) => setVisitTime(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 rounded-xl py-3 pl-11 pr-4 text-slate-800 font-sans text-sm outline-none transition-colors appearance-none"
                    >
                      <option value="">Choose a time slot...</option>
                      <option value="11:00 AM - 01:00 PM">Morning (11:00 AM - 01:00 PM)</option>
                      <option value="02:00 PM - 04:00 PM">Midday (02:00 PM - 04:00 PM)</option>
                      <option value="04:30 PM - 06:30 PM">Evening (04:30 PM - 06:30 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Purpose & Description */}
              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  What activity would you like to arrange?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(['general', 'gifts', 'meal', 'teaching'] as const).map((p) => {
                    const labels = {
                      general: 'Interact & Play',
                      gifts: 'Gift Giving',
                      meal: 'Share a Meal',
                      teaching: 'Teach / Mentor'
                    };
                    return (
                      <button
                        id={`opt-purpose-${p}`}
                        key={p}
                        type="button"
                        onClick={() => setPurpose(p)}
                        className={`py-2.5 px-3 rounded-lg border text-xs font-medium text-center transition-all ${
                          purpose === p
                            ? 'border-rose-600 bg-rose-50 text-rose-700 font-semibold'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {labels[p]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Motivation Notes */}
              <div>
                <label htmlFor="vis-notes" className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Special requests or notes (Optional)
                </label>
                <textarea
                  id="vis-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. We will be bringing cupcakes and drawing books for 30 children..."
                  className="w-full bg-white border border-slate-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 rounded-xl p-4 text-slate-800 placeholder-slate-400 font-sans text-sm outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit */}
              <button
                id="submit-visit-registration"
                type="submit"
                className="w-full bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white py-4 rounded-xl font-semibold text-center shadow-lg shadow-rose-600/10 hover:shadow-rose-600/25 hover:scale-101 transition-all"
              >
                Register My Scheduled Visit
              </button>
            </form>
          </div>

          {/* Right Column: Facility Details & Persisted Register Reviews */}
          <div className="lg:col-span-5 space-y-8">
            {/* Selected Facility Details Card */}
            <div id="facility-detail-card" className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-xl border border-slate-800">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/10 rounded-full blur-2xl" />
              <span className="font-mono text-[10px] text-rose-400 uppercase tracking-widest border border-rose-500/20 px-3 py-1 rounded-full">
                Active Center Profile
              </span>
              <h3 className="font-display font-extrabold text-2xl text-white mt-4 mb-2">
                {activeOrphanage.name}
              </h3>
              <p className="text-slate-400 text-xs font-mono flex items-center mb-4">
                <MapPin className="h-3 w-3 text-rose-500 mr-1.5" />
                {activeOrphanage.address}
              </p>
              <p className="text-slate-300 font-light text-sm leading-relaxed mb-6">
                {activeOrphanage.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-2 border-t border-slate-800 pt-6">
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    Coordinator
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">
                    {activeOrphanage.contactPerson}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    Capacity
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">
                    {activeOrphanage.capacity} Kids
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    Visit Cost
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-amber-400">
                    1000 PKR
                  </span>
                </div>
              </div>
            </div>

            {/* List of My Persisted scheduled visits */}
            <div id="persisted-visits-panel" className="bg-white/80 border border-slate-150 p-6 sm:p-8 rounded-3xl backdrop-blur-sm shadow-sm text-slate-800">
              <h4 className="font-display font-bold text-lg text-slate-900 mb-4 flex items-center justify-between">
                <span>My Scheduled Visits</span>
                <span className="bg-slate-200 text-slate-700 text-xs font-mono px-2.5 py-1 rounded-full">
                  {registrations.length} Active
                </span>
              </h4>

              {registrations.length === 0 ? (
                <div className="text-center py-10 bg-white border border-slate-100 rounded-2xl p-6">
                  <Calendar className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-400 font-light">
                    No scheduled visits found. Fill out the form to schedule a physical visit.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                  {registrations.map((reg) => (
                    <div
                      id={`visit-record-${reg.id}`}
                      key={reg.id}
                      className="bg-white border border-slate-100 rounded-xl p-4 shadow-2xs relative group"
                    >
                      <button
                        id={`cancel-visit-btn-${reg.id}`}
                        onClick={() => handleCancelRegistration(reg.id)}
                        className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Cancel Scheduled Visit"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="text-xs font-mono text-rose-600 font-semibold uppercase tracking-wider mb-1">
                        {reg.purpose === 'gifts' ? '🎁 Gift Drive' : reg.purpose === 'meal' ? '🍱 Feed orphans' : reg.purpose === 'teaching' ? '📚 Mentoring' : '🤝 Interaction'}
                      </div>
                      <h5 className="font-display font-bold text-slate-900 pr-8">
                        {reg.orphanageName}
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1.5 mt-3 text-xs text-slate-500 font-light border-t border-slate-50 pt-2.5">
                        <div>
                          <strong className="font-medium text-slate-700">Visitor:</strong> {reg.name}
                        </div>
                        <div>
                          <strong className="font-medium text-slate-700">Group Size:</strong> {reg.visitorCount} Person(s)
                        </div>
                        <div>
                          <strong className="font-medium text-slate-700">Date:</strong> {reg.visitDate}
                        </div>
                        <div>
                          <strong className="font-medium text-slate-700">Time:</strong> {reg.visitTime}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Success Modal */}
      <AnimatePresence>
        {showSuccessModal && latestRegistration && (
          <div id="registration-success-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl z-10 overflow-hidden border border-slate-100"
            >
              {/* Highlight background strip */}
              <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-emerald-500 to-teal-500" />

              <div className="text-center mb-6">
                <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-500 mb-4">
                  <CheckCircle2 className="h-8 w-8 stroke-[1.8]" />
                </div>
                <h3 className="font-display font-extrabold text-2xl text-slate-950">
                  Visit Scheduled Successfully!
                </h3>
                <p className="text-sm text-slate-500 mt-1 font-light">
                  Thank you for your kindness. The children are eagerly waiting!
                </p>
              </div>

              {/* Confirmation Details Card */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-3.5 text-sm text-slate-700">
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-wide">Orphanage Home</span>
                  <span className="font-bold text-slate-900">{latestRegistration.orphanageName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-wide">Date & Time</span>
                  <span className="font-medium text-slate-900">{latestRegistration.visitDate} @ {latestRegistration.visitTime}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-wide">Scheduled Representative</span>
                  <span className="font-medium text-slate-900">{latestRegistration.name} ({latestRegistration.visitorCount} visitors)</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-wide">On-Site Liaison</span>
                  <span className="font-medium text-slate-900">{activeOrphanage.contactPerson}</span>
                </div>
              </div>

              {/* Action instructions */}
              <div className="mt-6 text-xs text-slate-500 text-center leading-relaxed">
                <p className="font-medium text-rose-600 mb-1">⚠️ Important Security Advisory</p>
                Please bring a digital copy of this confirmation along with your National ID (CNIC) for safety screening at the entrance gate.
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  id="success-modal-close"
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md text-center"
                >
                  Got it, thank you!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

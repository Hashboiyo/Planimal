import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, CreditCard, ShieldCheck, CheckCircle2, Gift, History, Sparkles, Award, Copy, Landmark } from 'lucide-react';
import { DonationRecord } from '../types';

const DONATION_TIERS = [
  { amount: 1500, label: 'Feed a Child', impact: 'Provides nutritious, hot daily meals for an orphan child for 30 full days.' },
  { amount: 3000, label: 'Fund Education', impact: 'Covers full tuition, books, uniform, and school bags for 2 underprivileged kids.' },
  { amount: 6000, label: 'Sponsor an Orphan', impact: 'Full guardianship including boarding, food, tutoring, healthcare, and guidance.' },
  { amount: 15000, label: 'Slum Medical Drive', impact: 'Sponsors 1 mobile clinic deployment treating over 60 patients with medicines.' }
];

interface DonationSectionProps {
  isModalOpen?: boolean;
  onCloseModal?: () => void;
}

export default function DonationSection({ isModalOpen, onCloseModal }: DonationSectionProps) {
  const [history, setHistory] = useState<DonationRecord[]>([]);
  
  // Funding goal trackers (dynamic simulation in PKR)
  const [currentProgress, setCurrentProgress] = useState(1845000);
  const targetGoal = 2500000;

  // Donation Form States
  const [amount, setAmount] = useState<number>(3000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [frequency, setFrequency] = useState<'once' | 'monthly' | 'yearly'>('monthly');
  const [program, setProgram] = useState<'orphan' | 'food' | 'education' | 'medical' | 'general'>('orphan');
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  // Checkout Form States
  const [donorName, setDonorName] = useState('');
  const [email, setEmail] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  // Success receipts and modal
  const [latestDonation, setLatestDonation] = useState<DonationRecord | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  
  // Copy feedback states
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [copiedName, setCopiedName] = useState(false);

  // Load donation history on mount
  useEffect(() => {
    const saved = localStorage.getItem('yaran_donations_pkr');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse donations', e);
      }
    }
  }, []);

  const saveDonation = (record: DonationRecord) => {
    const updated = [record, ...history];
    setHistory(updated);
    localStorage.setItem('yaran_donations_pkr', JSON.stringify(updated));
    
    // Add amount to total progress
    setCurrentProgress(prev => prev + record.amount);
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : amount;
    if (isNaN(finalAmount) || finalAmount <= 0) {
      return;
    }

    setIsPaying(true);

    // Simulate transfer gateway preparation
    setTimeout(() => {
      const record: DonationRecord = {
        id: 'don-' + Math.random().toString(36).substring(2, 11),
        donorName: isAnonymous ? 'Anonymous Donor' : donorName || 'Kind Patron',
        email: email || 'patron@example.com',
        amount: finalAmount,
        isAnonymous,
        frequency,
        program,
        donatedAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        paymentMethod: 'JazzCash (Pending confirmation)'
      };

      saveDonation(record);
      setLatestDonation(record);
      setIsPaying(false);
      setShowReceipt(true);

      // Reset form fields
      setDonorName('');
      setEmail('');
      setCustomAmount('');
    }, 1200);
  };

  const selectedAmount = customAmount ? parseFloat(customAmount) : amount;
  const currentPercentage = Math.min(100, Math.round((currentProgress / targetGoal) * 100));

  const programLabels = {
    orphan: 'Orphan Care & Guardianship',
    food: 'Sustenance & Nutrition Packs',
    education: 'Al-Ilm Education Scholarship',
    medical: 'Slum Mobile Healthcare Vans',
    general: 'General Funds (Zakat & Sadqah)'
  };

  const copyToClipboard = (text: string, type: 'number' | 'name') => {
    navigator.clipboard.writeText(text);
    if (type === 'number') {
      setCopiedNumber(true);
      setTimeout(() => setCopiedNumber(false), 2000);
    } else {
      setCopiedName(true);
      setTimeout(() => setCopiedName(false), 2000);
    }
  };

  return (
    <section id="donate" className="py-20 md:py-28 bg-transparent text-slate-800 relative overflow-hidden">
      {/* Background airy elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200 text-amber-800 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-4">
            <Award className="h-3.5 w-3.5 text-amber-600" />
            <span>Zakat & Sadqah Eligible</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight mb-4">
            Join the Hope Campaign
          </h2>
          <p className="text-lg text-slate-600 font-light leading-relaxed">
            Your generous contributions aim to fund partner shelters, dream to support teachers, build medical cabinets, and hope to provide clean daily sustenance in Pakistan. Together, we aim to rewrite lives.
          </p>
        </div>

        {/* Crowdfunding Tracker Board - Airy Glassmorphism */}
        <div id="crowdfunding-tracker" className="max-w-md mx-auto bg-white/70 border border-slate-150 rounded-3xl p-6 sm:p-8 mb-16 shadow-sm backdrop-blur-md text-center">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">Campaign Target Goal</span>
          <div className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 flex items-center justify-center">
            <span className="text-amber-600 mr-1.5 text-2xl font-sans">Rs.</span>
            <span>{targetGoal.toLocaleString()} <span className="text-slate-400 text-lg font-light">PKR</span></span>
          </div>
          <div className="mt-4 text-xs text-slate-500 font-light leading-relaxed">
            All donations are directly tracked and allocated transparently to partner shelters.
          </div>
        </div>

        {/* Main Donation Portal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          {/* Left Column: Form Controls */}
          <div id="donation-portal-form" className="lg:col-span-7 bg-white/80 border border-slate-150 p-6 sm:p-10 rounded-3xl shadow-sm backdrop-blur-sm">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 mb-6 flex items-center space-x-2">
              <Heart className="h-5.5 w-5.5 text-rose-500 fill-rose-500/10" />
              <span>Select Contribution Amount</span>
            </h3>

            <form onSubmit={handleDonateSubmit} className="space-y-6">
              {/* Frequency Selector */}
              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
                  Donation Frequency
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['once', 'monthly', 'yearly'] as const).map((freq) => (
                    <button
                      id={`opt-frequency-${freq}`}
                      key={freq}
                      type="button"
                      onClick={() => setFrequency(freq)}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center uppercase tracking-wider transition-all ${
                        frequency === freq
                          ? 'border-rose-500 bg-rose-500/5 text-rose-600 font-bold'
                          : 'border-slate-200 bg-slate-50/50 text-slate-500 hover:border-slate-300 hover:text-slate-700'
                      }`}
                    >
                      {freq === 'once' ? 'One-time' : freq === 'monthly' ? 'Monthly' : 'Annual'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tiers Grid */}
              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
                  Preset Donation Tiers
                </label>
                <div className="grid grid-cols-2 gap-3.5 mb-4">
                  {DONATION_TIERS.map((tier) => (
                    <button
                      id={`opt-tier-${tier.amount}`}
                      key={tier.amount}
                      type="button"
                      onClick={() => {
                        setAmount(tier.amount);
                        setCustomAmount('');
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        amount === tier.amount && !customAmount
                          ? 'border-amber-500 bg-amber-50/30 ring-1 ring-amber-500 text-slate-950 font-medium'
                          : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-display font-extrabold text-xl sm:text-2xl mb-0.5 text-slate-900">
                        Rs. {tier.amount.toLocaleString()}
                      </div>
                      <div className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                        {tier.label}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="relative">
                  <div className="absolute left-4 top-3.5 font-display font-medium text-lg text-slate-400">Rs.</div>
                  <input
                    id="custom-donation-amount"
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setAmount(0);
                    }}
                    placeholder="Or enter custom contribution amount..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 focus:bg-white rounded-2xl py-3.5 pl-12 pr-16 text-slate-900 placeholder-slate-400 font-sans text-sm outline-none transition-colors"
                  />
                  <div className="absolute right-4 top-4 text-xs font-mono text-slate-400 uppercase font-semibold">PKR</div>
                </div>
              </div>

              {/* Dynamic Impact Statement */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedAmount}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="bg-rose-50/30 border border-rose-100 rounded-2xl p-4 flex items-start space-x-3"
                >
                  <Gift className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-sans font-semibold text-xs text-rose-700 uppercase tracking-wider mb-1">
                      Direct Human Impact:
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      {customAmount
                        ? `A personalized grant of Rs. ${selectedAmount.toLocaleString()} PKR will be fully distributed to build resources, purchase school uniform kits, and feed orphans based on current critical campaign needs.`
                        : DONATION_TIERS.find(t => t.amount === amount)?.impact}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Program Selector */}
              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Fund Allocation Program
                </label>
                <select
                  id="donation-program"
                  value={program}
                  onChange={(e) => setProgram(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-rose-500 focus:bg-white rounded-xl py-3 px-4 text-slate-800 font-sans text-sm outline-none transition-colors"
                >
                  <option value="orphan">Orphan welfare & housing fund</option>
                  <option value="food">Eradicate Hunger (Hot food parcels)</option>
                  <option value="education">Al-Ilm primary school scholarships</option>
                  <option value="medical">Mobile dispensary units & healthcare</option>
                  <option value="general">General Zakat & Sadqah (Most needed area)</option>
                </select>
              </div>

              {/* Secure Checkout Sub-form */}
              <div className="border-t border-slate-100 pt-6 space-y-4">
                <h4 className="font-display font-semibold text-sm text-slate-700 uppercase tracking-widest mb-2 flex items-center space-x-2">
                  <CreditCard className="h-4.5 w-4.5 text-slate-500" />
                  <span>Your Information</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    id="donor-name"
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Your Full Name (e.g. Bilal Ahmed)"
                    className="bg-slate-50 border border-slate-200 focus:border-rose-500 focus:bg-white rounded-xl py-3 px-4 text-sm text-slate-950 placeholder-slate-400 outline-none transition-all"
                  />
                  <input
                    id="donor-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address (for logs receipt)"
                    className="bg-slate-50 border border-slate-200 focus:border-rose-500 focus:bg-white rounded-xl py-3 px-4 text-sm text-slate-950 placeholder-slate-400 outline-none transition-all"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="chk-anonymous"
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="h-4.5 w-4.5 rounded border-slate-300 bg-slate-50 text-rose-600 focus:ring-rose-500 cursor-pointer"
                  />
                  <label htmlFor="chk-anonymous" className="ml-2.5 text-xs text-slate-500 select-none cursor-pointer">
                    Donated anonymously (Hide my name from public ledgers)
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                id="submit-donation"
                type="submit"
                disabled={isPaying}
                className="w-full bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold py-4 rounded-xl text-center shadow-md hover:scale-101 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isPaying ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Preparing Transfer Details...</span>
                  </>
                ) : (
                  <>
                    <Landmark className="h-5 w-5" />
                    <span>Generate JazzCash Transfer Request</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Ledger Log & Security Trust */}
          <div className="lg:col-span-5 space-y-8">
            {/* Direct Trust Badges */}
            <div className="bg-white/80 border border-slate-150 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm backdrop-blur-sm text-slate-800">
              <h4 className="font-display font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">Trust & Transparency</h4>
              
              <div className="flex items-start space-x-3.5 text-slate-700">
                <ShieldCheck className="h-5.5 w-5.5 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <h5 className="font-semibold text-slate-900">Direct Peer-to-Peer</h5>
                  <p className="text-slate-500 font-light mt-0.5">We facilitate direct local transfers for instant local aid. Every rupee goes entirely to supporting food, education, and shelter programs.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 text-slate-700 pt-1">
                <Heart className="h-5.5 w-5.5 text-rose-500 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <h5 className="font-semibold text-slate-900">Local Community Trust</h5>
                  <p className="text-slate-500 font-light mt-0.5">Yaran-e-Fuqra coordinates with local communities in Pakistan to run transparent, verified programs for orphaned children.</p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* JazzCash payment pop-up modal */}
      <AnimatePresence>
        {showReceipt && latestDonation && (
          <div id="donation-receipt-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReceipt(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl z-10 overflow-hidden border border-slate-100 text-slate-850"
            >
              {/* Top gradient highlight strip */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500" />

              <div className="text-center mb-6">
                <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-rose-50 border border-rose-100 text-rose-500 mb-3">
                  <CheckCircle2 className="h-8 w-8 stroke-[1.8]" />
                </div>
                <h3 className="font-display font-extrabold text-2xl text-slate-900">
                  JazzCash Details generated!
                </h3>
                <p className="text-sm text-slate-500 mt-1 font-light">
                  Follow instructions below to complete your noble contribution of <span className="font-semibold text-rose-600">Rs. {latestDonation.amount.toLocaleString()} PKR</span>
                </p>
              </div>

              {/* Secure JazzCash Payment Details box */}
              <div className="bg-rose-50/50 border border-rose-100/70 rounded-2xl p-6 mb-6 space-y-4">
                <div className="flex items-center space-x-2 text-rose-600 font-bold text-xs uppercase tracking-widest font-mono border-b border-rose-100/50 pb-2">
                  <Landmark className="h-4 w-4" />
                  <span>JAZZCASH PAYMENT PORTAL</span>
                </div>

                {/* Account Number */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white border border-slate-100 p-3.5 rounded-xl">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Account Number (JazzCash)</span>
                    <span className="text-lg font-mono font-bold text-slate-900">03177735097</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('03177735097', 'number')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors shrink-0"
                  >
                    <Copy className="h-3.5 w-3.5 text-slate-500" />
                    <span>{copiedNumber ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                {/* Account Name */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white border border-slate-100 p-3.5 rounded-xl">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Account Title</span>
                    <span className="text-sm font-semibold text-slate-800">hashir maqbool</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('hashir maqbool', 'name')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors shrink-0"
                  >
                    <Copy className="h-3.5 w-3.5 text-slate-500" />
                    <span>{copiedName ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                {/* Instructions */}
                <div className="text-xs text-slate-500 font-light leading-relaxed space-y-1.5 border-t border-rose-100/50 pt-3">
                  <p className="font-semibold text-slate-700 uppercase tracking-wider font-mono text-[9px]">How to complete payment:</p>
                  <p>1. Open your JazzCash app (or any banking app supporting EasyPaisa/IBFT transfers).</p>
                  <p>2. Send the exact donation amount to the account details above.</p>
                  <p>3. Capture a receipt screenshot of the successful transfer.</p>
                  <p>4. Share the transfer slip with our support line or billing team to secure your entry in our permanent logbook.</p>
                </div>
              </div>

              {/* Digital Invoice Slip */}
              <div className="border border-slate-150 rounded-2xl p-4 bg-slate-50 space-y-2 text-[11px] font-mono text-slate-600 relative">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-r border-slate-150" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-l border-slate-150" />

                <div className="text-center border-b border-dashed border-slate-200 pb-2">
                  <span className="font-display font-bold text-slate-800 tracking-wider">YARAN-E-FUQRA SLIP</span>
                  <p className="text-[8px] text-slate-400 mt-0.5">PKR TRANSACTION SUMMARY</p>
                </div>

                <div className="flex justify-between">
                  <span>SLIP ID:</span>
                  <span className="font-semibold text-slate-800">{latestDonation.id.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>DONOR:</span>
                  <span className="font-semibold text-slate-800">{latestDonation.donorName}</span>
                </div>
                <div className="flex justify-between">
                  <span>PROGRAM:</span>
                  <span className="font-semibold text-slate-800">{programLabels[latestDonation.program]}</span>
                </div>
                <div className="flex justify-between border-t border-dashed border-slate-200 pt-2 text-xs">
                  <span className="font-bold text-slate-800">DUE AMOUNT:</span>
                  <span className="font-bold text-rose-600 font-display">Rs. {latestDonation.amount.toLocaleString()} PKR</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  id="receipt-modal-close"
                  onClick={() => setShowReceipt(false)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md text-center text-sm"
                >
                  Confirm Transfer Made
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

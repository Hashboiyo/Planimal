import React from 'react';
import { motion } from 'motion/react';
import { HeartHandshake, UtensilsCrossed, GraduationCap, Target, Quote, ArrowUpRight } from 'lucide-react';
import { INITIATIVES, TESTIMONIALS } from '../data';

const iconMap: Record<string, React.ComponentType<any>> = {
  HeartHandshake: HeartHandshake,
  UtensilsCrossed: UtensilsCrossed,
  GraduationCap: GraduationCap,
  Target: Target,
};

export default function Mission() {
  return (
    <section id="mission" className="py-20 md:py-28 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center space-x-2 bg-rose-50 text-rose-700 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase font-mono mb-4 border border-rose-100">
            <Target className="h-3.5 w-3.5" />
            <span>Our Path</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight mb-4">
            Our Noble Mission
          </h2>
          <p className="text-lg text-slate-600 font-light leading-relaxed">
            Founded by 4 college friends, Yaran-e-Fuqra (Friends of the Poor) dreams to bridge the gap between fortunate patrons and impoverished souls in Pakistan. Every initiative we champion aims to restore hope and help children dream of self-reliance.
          </p>
        </div>

        {/* Initiatives Grid */}
        <div id="mission-initiatives-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-20 md:mb-24">
          {INITIATIVES.map((init, index) => {
            const IconComponent = iconMap[init.iconName] || HeartHandshake;
            return (
              <motion.div
                id={`initiative-card-${init.id}`}
                key={init.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 border border-slate-100 transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Metrics header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-2xl border ${init.colorClass}`}>
                      <IconComponent className="h-7 w-7 stroke-[1.8]" />
                    </div>
                    <span className="font-mono text-xs font-semibold tracking-widest text-slate-400 bg-slate-50 border border-slate-100 px-3.5 py-1.5 rounded-full uppercase">
                      {init.metric}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 mb-2 group-hover:text-rose-600 transition-colors">
                    {init.title}
                  </h3>
                  <p className="text-xs font-semibold font-sans text-rose-500 uppercase tracking-wider mb-4">
                    {init.tagline}
                  </p>
                  <p className="text-slate-600 leading-relaxed font-light text-sm sm:text-base">
                    {init.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-400 group-hover:text-rose-500 transition-colors">
                  <span>Transparency Guaranteed</span>
                  <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials Block */}
        <div id="mission-testimonials-section" className="bg-gradient-to-br from-white/90 via-rose-50/10 to-amber-50/20 text-slate-800 rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-sm border border-slate-150 backdrop-blur-md">
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-200/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-mono text-xs text-rose-500 uppercase tracking-widest font-semibold">Beneficiary Voices</span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl mt-2 text-slate-900">Impact on the Ground</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
              {TESTIMONIALS.map((test) => (
                <div id={`testimonial-${test.id}`} key={test.id} className="flex flex-col justify-between bg-white/60 border border-slate-100 p-8 rounded-2xl shadow-xs">
                  <div>
                    <Quote className="h-8 w-8 text-rose-500/20 mb-4 stroke-[1.5]" />
                    <p className="text-slate-600 font-light text-sm sm:text-base leading-relaxed italic mb-6">
                      "{test.quote}"
                    </p>
                  </div>

                  <div className="flex items-center space-x-3.5 pt-4 border-t border-slate-100">
                    <img
                      src={test.image}
                      alt={test.name}
                      referrerPolicy="no-referrer"
                      className="h-12 w-12 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="font-display font-semibold text-sm text-slate-900">{test.name}</h4>
                      <p className="text-xs font-mono text-slate-400">{test.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

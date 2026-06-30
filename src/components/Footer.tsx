import React from 'react';
import { Heart, Globe, ArrowUpCircle, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 text-slate-600 py-16 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2 text-slate-900">
              <div className="bg-rose-500 p-2 rounded-xl text-white">
                <Heart className="h-5 w-5 fill-current" />
              </div>
              <span className="font-display font-bold text-lg tracking-wider text-slate-900">
                YARAN<span className="text-rose-500">-E-</span>FUQRA
              </span>
            </div>
            <p className="text-sm text-slate-500 font-light leading-relaxed max-w-sm">
              Yaran-e-Fuqra is a non-profit organization that aims to foster hope, dreaming to support food, medical aid, education, and shelter care for underprivileged orphans and widow-led households across Pakistan.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-slate-800 font-semibold font-display text-sm tracking-widest uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#hero" className="hover:text-rose-500 transition-colors">
                  Home Portal
                </a>
              </li>
              <li>
                <a href="#mission" className="hover:text-rose-500 transition-colors">
                  Our core work
                </a>
              </li>
              <li>
                <a href="#visit" className="hover:text-rose-500 transition-colors">
                  Schedule Orphan Visit
                </a>
              </li>
              <li>
                <a href="#donate" className="hover:text-rose-500 transition-colors">
                  Zakat & Zadaqah Donation
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-rose-500 transition-colors">
                  Contact Coordinates
                </a>
              </li>
            </ul>
          </div>

          {/* Official Communications */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-slate-800 font-semibold font-display text-sm tracking-widest uppercase">
              Official Coordinates
            </h4>
            <div className="space-y-3.5 text-sm font-light">
              <div className="flex items-center space-x-2.5">
                <Globe className="h-4.5 w-4.5 text-slate-400" />
                <span>www.yaranefuqra.org</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="h-4.5 w-4.5 text-slate-400" />
                <span>info@yaranefuqra.org</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="h-4.5 w-4.5 text-slate-400" />
                <span>+92 (317) 773-5097</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border-t border-slate-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 font-light">
            © {currentYear} Yaran-e-Fuqra. All Rights Reserved.
          </div>

          {/* Back to top */}
          <a
            id="footer-back-to-top"
            href="#hero"
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-rose-500 transition-colors uppercase tracking-widest font-mono"
          >
            <span>Back to top</span>
            <ArrowUpCircle className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

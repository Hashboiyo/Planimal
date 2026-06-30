import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, Gift } from 'lucide-react';

interface NavbarProps {
  onOpenDonateModal?: () => void;
}

export default function Navbar({ onOpenDonateModal }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Listen for scroll to toggle background color and detect active section
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Simple intersection tracker
      const sections = ['hero', 'mission', 'visit', 'donate', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If top of section is near the middle of viewport
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'Our Mission', href: '#mission', id: 'mission' },
    { label: 'Orphanage Visits', href: '#visit', id: 'visit' },
    { label: 'Donate', href: '#donate', id: 'donate' },
    { label: 'Contact Us', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-800/50 py-3'
          : 'bg-gradient-to-b from-black/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            id="nav-logo"
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center space-x-2 text-white group"
          >
            <div className="bg-rose-600 p-2 rounded-xl text-white shadow-md shadow-rose-600/30 group-hover:scale-105 transition-transform">
              <Heart className="h-6 w-6 fill-current" />
            </div>
            <div>
              <span className="font-display font-bold text-lg sm:text-xl tracking-wider text-white">
                YARAN<span className="text-rose-500">-E-</span>FUQRA
              </span>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400 font-mono leading-none">
                Sowing Hope • Nurturing Lives
              </p>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <a
                  id={`nav-link-${item.id}`}
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`font-sans text-sm font-medium transition-colors hover:text-rose-400 ${
                    activeSection === item.id
                      ? 'text-rose-500'
                      : 'text-slate-200'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <button
              id="nav-cta-donate"
              onClick={onOpenDonateModal}
              className="flex items-center space-x-2 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-rose-600/20 hover:scale-102"
            >
              <Gift className="h-4 w-4" />
              <span>Donate Now</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white p-2 rounded-lg focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div id="mobile-nav-menu" className="md:hidden bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-4 pt-3 pb-6 space-y-3 shadow-inner">
            {navItems.map((item) => (
              <a
                id={`mobile-nav-link-${item.id}`}
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`block px-3 py-2.5 rounded-lg font-medium text-base ${
                  activeSection === item.id
                    ? 'bg-rose-950/40 text-rose-400 border-l-4 border-rose-500'
                    : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-800">
              <button
                id="mobile-nav-cta-donate"
                onClick={() => {
                  setIsOpen(false);
                  if (onOpenDonateModal) onOpenDonateModal();
                }}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-rose-600 to-amber-600 text-white py-3 rounded-xl font-semibold text-base shadow-md"
              >
                <Gift className="h-5 w-5" />
                <span>Donate Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

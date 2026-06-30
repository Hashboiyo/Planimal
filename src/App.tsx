import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Mission from './components/Mission';
import RegistrationForm from './components/RegistrationForm';
import DonationSection from './components/DonationSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-gradient-to-b from-sky-100 via-rose-50/70 via-amber-50/60 to-blue-50/80 min-h-screen text-slate-800 selection:bg-rose-500 selection:text-white relative overflow-hidden">
      {/* Fixed Background Ambient Cloud Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-[120px] animate-pulse duration-[8000ms]" />
        <div className="absolute top-[35%] right-[5%] w-[600px] h-[600px] bg-rose-100/50 rounded-full blur-[140px] animate-pulse duration-[12000ms]" />
        <div className="absolute bottom-[25%] left-[10%] w-[550px] h-[550px] bg-amber-100/40 rounded-full blur-[130px] animate-pulse duration-[10000ms]" />
        <div className="absolute bottom-[10%] right-[15%] w-[700px] h-[700px] bg-blue-100/30 rounded-full blur-[150px] animate-pulse duration-[9000ms]" />
      </div>

      {/* Dynamic Header Navbar */}
      <div className="relative z-50">
        <Navbar onOpenDonateModal={() => handleScrollToSection('donate')} />
      </div>

      {/* Main Single Page Sections */}
      <main className="relative z-10">
        {/* Full Screen Ambient Video Hero */}
        <Hero onDonateClick={() => handleScrollToSection('donate')} />

        {/* Our Mission & Core Initiatives */}
        <Mission />

        {/* Physical Visit Registration module */}
        <RegistrationForm />

        {/* Crowdfunding progress tracking & donation portal */}
        <DonationSection />

        {/* Official contacts & physical headquarter nodes in Pakistan */}
        <ContactSection />
      </main>

      {/* Footer copyright, coordinate grids, social hubs */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SecurityPillars from './components/SecurityPillars';
import VideoSection from './components/VideoSection';
import WhyUs from './components/WhyUs';
import Services from './components/Services';
import Offers from './components/Offers';
import IsabelPromise from './components/IsabelPromise';
import FAQ from './components/FAQ';
import About from './components/About';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import RegistrationSection from './components/RegistrationSection';

function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 60000); // 1 minute

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-sans text-plum bg-cream min-h-screen selection:bg-gold selection:text-white">
      <Header />
      <main>
        <Hero />
        <VideoSection />
        <IsabelPromise onOpenModal={() => setShowModal(true)} />
        <WhyUs />
        <Services />
        <Offers />
        <About />
        <SecurityPillars />
        <FAQ />
      </main>

      <RegistrationSection isOpen={showModal} onClose={() => setShowModal(false)} />

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;

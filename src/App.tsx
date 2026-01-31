import { useState, useEffect, Suspense, lazy } from 'react';
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
const LeadForm = lazy(() => import('./components/LeadForm'));

function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 2000); // 2 seconds

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

      <Suspense fallback={null}>
        <LeadForm isOpen={showModal} onClose={() => setShowModal(false)} />
      </Suspense>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;

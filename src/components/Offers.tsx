import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactForm from './ContactForm';

const banners = [
    { id: 1, src: "/banner-v3-1.jpg", alt: "Pasaje Cuba Rusia - 999 USD" },
    { id: 2, src: "/banner-v3-2.jpg", alt: "De Cuba a Dubái - 1800 USD" },
    { id: 3, src: "/banner-v3-3.jpg", alt: "Dubai Tour y Viajes - Paquete 1 1600 USD" }
];

const Offers = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Auto-rotate carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, 5000); // Change every 5 seconds
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-12 bg-cream border-y border-gold/20">
            <div className="container mx-auto px-4 md:px-8">

                <div className="flex flex-col items-center gap-8">
                    {/* Static Title Area */}
                    <div className="w-full text-center mb-4">
                        <h3 className="font-serif font-bold text-3xl text-plum mb-2">
                            Oportunidades <span className="text-gold italic">Flash</span>
                        </h3>
                        <p className="text-plum/60 text-sm max-w-2xl mx-auto mb-6">
                            Precios actualizados diariamente. No dejes pasar tu oportunidad.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-gold hover:bg-white hover:text-plum text-plum font-bold py-2 px-6 rounded-sm transition-all duration-300 uppercase tracking-widest text-xs shadow-md border border-transparent hover:border-gold"
                        >
                            Consultar Disponibilidad
                        </button>
                    </div>

                    {/* Banner Carousel Area */}
                    <div className="w-full relative overflow-hidden rounded-sm shadow-xl hover:shadow-2xl transition-all duration-300 aspect-[3/1] md:aspect-[4/1]">
                        <AnimatePresence mode='wait'>
                            <motion.img
                                key={currentIndex}
                                src={banners[currentIndex].src}
                                alt={banners[currentIndex].alt}
                                className="w-full h-full object-cover absolute top-0 left-0"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.8 }}
                            />
                        </AnimatePresence>

                        {/* Navigation Dots */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                            {banners.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex
                                        ? 'bg-gold w-8'
                                        : 'bg-white/50 hover:bg-white'
                                        }`}
                                    aria-label={`Ver banner ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <ContactForm
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    selectedPackage="Oportunidad Flash - $1800 USD"
                />

            </div>
        </section>
    );
};

export default Offers;

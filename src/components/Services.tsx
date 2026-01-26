import { useState, useEffect } from 'react';
import { Plane, Building2, Globe, Crown, Sparkles, Hand } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const Services = () => {
    const [hasInteracted, setHasInteracted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const packages = [
        {
            icon: <Plane size={48} />,
            title: "Turismo 30 Días",
            subtitle: "Pack Visita Rápida",
            price: "$1,600 USD",
            features: [
                "Visa de Turismo 30 días",
                "Pasaje en Avión Cuba a Dubai",
                "Gestión de Renta",
                "Confección de CV Profesional",
                "Recogida en aeropuerto + Snack",
                "Guía básica y asesoría laboral",
                "Tarjeta de Transporte",
                "Café o Cena de bienvenida"
            ],
            featured: false,
            whatsappMsg: "Hola Isabel! Vi la web y me interesa el Paquete de Turismo de 30 Días. Quiero explorar opciones en Dubái para mi próxima estancia. ¿Me podrías dar los requisitos?"
        },
        {
            icon: <Building2 size={48} />,
            title: "Viaje + Residencia",
            subtitle: "Pack Completo",
            price: "$4,200 USD",
            features: [
                "Visa de 2 años",
                "Pasaje en Avión Cuba a Dubai",
                "Gestión de Renta",
                "Carta de NOC",
                "Certificado de Salario",
                "Confección de CV Profesional",
                "Recogida en aeropuerto + Snack",
                "Guía básica y asesoría laboral",
                "Tarjeta de Transporte",
                "Café o Cena de bienvenida"
            ],
            featured: true, // Highlighted
            whatsappMsg: "Hola Isabel! Estoy decidido a relocalizarme. Vi el paquete de Viaje + Residencia en la web. Busco asesoría para hacer el proceso legal y seguro. ¿Podemos hablar?"
        },
        {
            icon: <Globe size={48} />,
            title: "Turismo 60 Días",
            subtitle: "Pack Visita Extendida",
            price: "$1,800 USD",
            features: [
                "Visa de Turismo 60 días",
                "Pasaje en Avión Cuba a Dubai",
                "Gestión de Renta",
                "Confección de CV Profesional",
                "Recogida en aeropuerto + Snack",
                "Guía básica y asesoría laboral",
                "Tarjeta de Transporte",
                "Café o Cena de bienvenida"
            ],
            featured: false,
            whatsappMsg: "Hola Isabel! Vi la web y me interesa el Paquete de Turismo de 60 Días. Quiero explorar opciones en Dubái para mi próxima estancia. ¿Me podrías dar los requisitos?"
        },
        {
            icon: <Sparkles size={48} />,
            title: "Experiencia Completa",
            subtitle: "Exclusivo Todo Incluido",
            price: "$2,600 USD",
            features: [
                "Visa Turismo 60 Días",
                "Pasaje en Avión",
                "30 Días de Renta Incluida",
                "Una Comida Diaria Gourmet",
                "Recogida Aeropuerto (VIP)",
                "Tarjeta de Transporte",
                "Guía Básica y Asesoría",
                "Confección de CV"
            ],
            featured: true,
            whatsappMsg: "Hola Isabel! Me interesa el Paquete Experiencia Completa con renta y comida incluida. Quiero asegurar mi plaza para esta oferta exclusiva. ¿Cómo procedemos?"
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" as const }
        },
        shake: {
            opacity: 1,
            y: 0,
            x: [0, 40, 0, 40, 0], // Shake movement
            transition: {
                x: {
                    delay: 1, // Quick start
                    duration: 1.2,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut" as const
                },
                opacity: { duration: 0.6 },
                y: { duration: 0.6 }
            }
        }
    };

    return (
        <section id="servicios" className="py-24 bg-gradient-to-b from-plum to-[#1a0f2e] text-white relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-16 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-gold uppercase tracking-[0.2em] text-xs font-bold mb-4 block">Nuestros Paquetes</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                            Soluciones a Medida
                        </h2>
                        <p className="max-w-xl mx-auto text-white/70 font-light leading-relaxed mb-4">
                            Diseñados para brindarte la mejor experiencia y seguridad en tu viaje y estancia en los Emiratos.
                        </p>

                        <AnimatePresence>
                            {isMobile && !hasInteracted && (
                                <motion.div
                                    className="md:hidden flex items-center justify-center gap-2 text-gold/80 text-xs uppercase tracking-widest mt-6"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div
                                        animate={{ x: [-5, 5, -5] }}
                                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                    >
                                        <Hand className="rotate-90" size={20} />
                                    </motion.div>
                                    <span>Desliza para ver más</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </motion.div>
                </div>

                <motion.div
                    className="flex md:grid md:grid-cols-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none gap-4 md:gap-6 items-stretch pt-4 pb-8 md:pb-0 scrollbar-hide"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    onScroll={() => isMobile && !hasInteracted && setHasInteracted(true)}
                    onTouchStart={() => isMobile && !hasInteracted && setHasInteracted(true)}
                >
                    {packages.map((pack, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            animate={isMobile && !hasInteracted ? "shake" : "visible"}
                            whileHover={{ y: -10 }}
                            className={cn(
                                "min-w-[85vw] md:min-w-0 snap-center p-6 rounded-[2rem] transition-all duration-500 border flex flex-col relative group backdrop-blur-sm",
                                pack.featured
                                    ? "bg-gradient-to-b from-plum/80 to-[#150a25]/90 border-gold shadow-[0_0_40px_-10px_rgba(197,160,33,0.3)] scale-[1.02] md:scale-105 z-20 py-10"
                                    : "bg-white/5 border-white/10 hover:border-gold/50 hover:bg-white/10 hover:shadow-2xl text-white py-8"
                            )}
                        >
                            {/* Hover Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2rem]"></div>

                            {pack.featured && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-full text-center">
                                    <span className="bg-gold text-plum text-[10px] font-bold px-4 py-1.5 uppercase tracking-widest rounded-full shadow-lg whitespace-nowrap inline-flex items-center gap-1 ring-4 ring-plum/50">
                                        <Crown size={12} fill="currentColor" /> Recomendado
                                    </span>
                                </div>
                            )}

                            <div className={cn("mb-6 transition-transform duration-500 group-hover:scale-110 origin-left relative z-10", pack.featured ? "text-gold drop-shadow-[0_0_8px_rgba(197,160,33,0.5)]" : "text-rose")}>
                                {pack.icon}
                            </div>

                            <h3 className={cn("text-lg font-serif font-bold mb-1 relative z-10", pack.featured ? "text-white" : "text-white")}>{pack.title}</h3>

                            <p className={cn("text-[10px] font-bold uppercase tracking-wider mb-4 relative z-10", pack.featured ? "text-gold/80" : "text-white/40")}>
                                {pack.subtitle}
                            </p>

                            <div className="mb-6 pb-6 border-b border-white/10 relative z-10">
                                <span className={cn("text-2xl font-bold", pack.featured ? "text-gold" : "text-white")}>
                                    {pack.price}
                                </span>
                            </div>

                            <ul className={cn("space-y-3 mb-8 flex-grow text-xs text-left relative z-10", pack.featured ? "text-gray-300" : "text-gray-400")}>
                                {pack.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <span className="text-gold mt-0.5">●</span>
                                        <span className="leading-tight">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href={`https://wa.me/971505282053?text=${encodeURIComponent(pack.whatsappMsg)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    "w-full py-3 px-4 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase transition-all duration-300 text-center block relative z-10",
                                    pack.featured
                                        ? "bg-gold text-plum hover:bg-white hover:text-plum shadow-[0_4px_14px_0_rgba(197,160,33,0.39)] hover:shadow-[0_6px_20px_rgba(197,160,33,0.23)]"
                                        : "border content-center placeholder:border-gold text-gold hover:bg-gold hover:text-white"
                                )}
                            >
                                Más Información
                            </a>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;

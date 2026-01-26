
import { Instagram, Youtube, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-plum text-white pt-20 pb-10">
            <div className="container mx-auto px-4 md:px-8">

                {/* Top Section: CTA */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                        ¿Listo para abrir tu puerta en Dubái?
                    </h2>
                    <p className="text-white/70 mb-8">
                        El momento de actuar es ahora. Agenda una consulta inicial y evaluemos tu perfil.
                    </p>
                    <a
                        href="https://wa.me/971505282053?text=Hola%20Isabel%2C%20vengo%20de%20la%20web%20y%20quiero%20informaci%C3%B3n%20sobre%20la%20residencia%20en%20Dub%C3%A1i"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-rose hover:bg-rose/90 text-plum font-bold py-4 px-8 rounded-sm transition-colors uppercase tracking-widest inline-flex items-center gap-2"
                    >
                        Hablar con un asesor ahora <ArrowRight size={20} />
                    </a>
                </div>

                <hr className="border-white/10 mb-12" />

                {/* Bottom Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div>
                        <img src="/logo-pd-v3.png" alt="Puerta Dubai" className="h-16 w-auto mb-4" />
                        <p className="text-white/60 text-sm leading-relaxed">
                            Consultoría estratégica para emprendedores e inversores cubanos en los Emiratos Árabes Unidos.
                        </p>
                    </div>

                    <div className="flex justify-center md:justify-end gap-6 items-start">
                        <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-gold hover:text-plum transition-all"><Instagram size={20} /></a>
                        <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-gold hover:text-plum transition-all">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                            </svg>
                        </a>
                        <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-gold hover:text-plum transition-all"><Youtube size={20} /></a>
                        <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-gold hover:text-plum transition-all"><Linkedin size={20} /></a>
                    </div>
                </div>

                {/* Copyright & Disclaimer */}
                <div className="text-center pt-8 border-t border-white/5">
                    <p className="text-white/30 text-xs mb-4">
                        © 2024 Puerta Dubai. Todos los derechos reservados.
                    </p>
                    <p className="text-white/20 text-[10px] max-w-3xl mx-auto leading-relaxed">
                        DISCLAIMER: Puerta Dubai es una consultora privada de negocios. No garantizamos resultados de visas, los cuales dependen exclusivamente de las autoridades de EAU. No somos una agencia de empleo ni ofrecemos trabajo.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;

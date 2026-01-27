import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

// Using a custom placeholder for TikTok icon since Lucide might not have it or it's named differently in versions


const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);



    const navLinks = [
        { name: 'Servicios', href: '#servicios' },
        { name: 'Sobre Mí', href: '#sobre-mi' },
        { name: 'FAQ', href: '#faq' },
    ];

    return (
        <header
            className={cn(
                "fixed w-full z-50 transition-all duration-300 border-b border-white/10",
                isScrolled ? "bg-plum/95 backdrop-blur-md py-4 shadow-lg" : "bg-black/40 backdrop-blur-sm py-6"
            )}
        >
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo Section */}
                    <a href="#" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gold/10 rounded-full flex items-center justify-center border border-gold/30 group-hover:bg-gold/20 transition-all duration-500">
                            <img src="/logo-pd-v3.png" alt="Puerta Dubai Logo" className="w-full h-full object-cover rounded-full" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl md:text-2xl font-serif font-bold text-white tracking-wide">
                                PUERTA <span className="text-gold">DUBAI</span>
                            </span>
                            <span className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-[0.2em] text-white/60">
                                Tu llave a los emiratos
                            </span>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-white/80 hover:text-gold transition-colors uppercase tracking-widest relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <a
                            href="https://wa.me/971505282053?text=Hola%20Isabel%2C%20vengo%20de%20la%20web%20y%20quiero%20informaci%C3%B3n%20sobre%20la%20residencia%20en%20Dub%C3%A1i"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gold hover:bg-white text-plum font-bold py-3 px-8 rounded-sm transition-all duration-300 uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(197,160,33,0.3)] hover:shadow-[0_0_30px_rgba(197,160,33,0.5)] transform hover:-translate-y-1"
                        >
                            Agendar
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-plum/95 backdrop-blur-xl border-t border-white/10 shadow-2xl animate-in slide-in-from-top-5">
                        <div className="flex flex-col p-6 space-y-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-serif text-white hover:text-gold transition-colors text-center"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="https://wa.me/971505282053?text=Hola%20Isabel%2C%20vengo%20de%20la%20web%20y%20quiero%20informaci%C3%B3n%20sobre%20la%20residencia%20en%20Dub%C3%A1i"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gold text-plum font-bold py-4 rounded-sm text-center uppercase tracking-widest text-sm shadow-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Agendar Consulta
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;

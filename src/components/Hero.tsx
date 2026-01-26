
import { motion } from 'framer-motion';

// Placeholder image for the founder - utilizing a professional corporate portrait style
// In reality, this should be the actual photo of the user's wife.
const HERO_IMAGE_URL = "/isabel-authority.png";

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-cream">
            <div className="container mx-auto px-4 md:px-8 flex flex-col-reverse md:flex-row items-center gap-12">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-10"
                >
                    <div className="w-full">
                        <span className="inline-block py-1 px-3 border border-gold/30 rounded-full text-gold text-xs font-bold tracking-[0.2em] mb-6 uppercase">
                            Consultoría Estratégica
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-plum leading-[1.15] mb-6">
                        Tu éxito en Dubái no es cuestión de suerte, <span className="text-gold italic">es cuestión de estrategia.</span>
                    </h1>

                    <p className="text-plum/80 text-lg mb-8 max-w-xl font-light leading-relaxed">
                        Bienvenido a Puerta Dubai. Soy <span className="font-semibold text-plum">Isabel</span>, y ayudo a emprendedores cubanos a establecerse legalmente en los Emiratos Árabes con seguridad, transparencia y un plan de acción real.
                    </p>

                    <button className="bg-gold hover:bg-gold/90 text-white font-medium py-4 px-10 rounded-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-sm tracking-widest uppercase">
                        Iniciar mi proceso ahora
                    </button>
                </motion.div>

                {/* Image Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full md:w-1/2 relative flex justify-center md:justify-end"
                >
                    <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[550px] lg:w-[450px] lg:h-[600px]">
                        {/* Decorative Elements behind image */}
                        <div className="absolute top-4 -right-4 w-full h-full border-2 border-gold/40 z-0"></div>
                        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-rose/20 rounded-full blur-2xl z-0"></div>

                        {/* Main Image */}
                        <div className="relative w-full h-full overflow-hidden rounded-sm shadow-2xl z-10 bg-gray-200">
                            <img
                                src={HERO_IMAGE_URL}
                                alt="Fundadora de Puerta Dubai"
                                className="w-full h-full object-cover object-top"
                            />
                            {/* Gradient overlay for better text contrast if needed, mostly style here */}
                            <div className="absolute inset-0 bg-gradient-to-t from-plum/40 to-transparent opacity-30"></div>
                        </div>

                        {/* Floating badge */}
                        <div className="absolute bottom-8 -left-8 bg-white p-4 shadow-xl z-20 max-w-[180px] hidden md:block border-l-4 border-gold">
                            <p className="text-plum font-serif text-sm italic">
                                "La llave de tu nueva vida en los Emiratos."
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Background patterns */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/50 to-transparent pointer-events-none"></div>
        </section>
    );
};

export default Hero;

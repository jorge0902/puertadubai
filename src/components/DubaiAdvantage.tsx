
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Sun, Globe } from 'lucide-react';


const DubaiAdvantage = () => {
    const benefits = [
        {
            icon: <TrendingUp size={32} />,
            title: "0% Impuestos",
            desc: "Tus ganancias son 100% tuyas. Sin impuestos sobre la renta personal. El entorno fiscal ideal para hacer crecer tu patrimonio sin límites."
        },
        {
            icon: <Shield size={32} />,
            title: "Seguridad Total",
            desc: "Dubái es una de las ciudades más seguras del mundo. Olvídate de la inestabilidad. Aquí, tú y tu familia construyen futuro sobre terreno firme."
        },
        {
            icon: <Globe size={32} />,
            title: "Conectividad Global",
            desc: "Estás en el centro del mundo. Vuelos directos a los principales capitales y una puerta abierta a mercados asiáticos, europeos y africanos."
        },
        {
            icon: <Sun size={32} />,
            title: "Calidad de Vida",
            desc: "Infraestructura de primer nivel, salud, educación y un estilo de vida que combina lujo y confort. El lugar donde todos quieren estar."
        }
    ];

    return (
        <section className="py-20 bg-white overflow-hidden relative">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left Content */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-rose font-bold tracking-widest uppercase text-xs mb-2 block">
                                El Destino del Momento
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-plum mb-6 leading-tight">
                                ¿Por qué <span className="text-gold">Dubái</span>? <br />
                                ¿Por qué ahora?
                            </h2>
                            <p className="text-plum/80 text-lg mb-6 leading-relaxed">
                                Miles de emprendedores cubanos están eligiendo Dubái no solo como un destino, sino como su nueva plataforma de lanzamiento.
                            </p>
                            <p className="text-plum/70 mb-8 leading-relaxed">
                                A diferencia de otras opciones migratorias complejas, los Emiratos Árabes Unidos ofrecen un camino claro, rápido y digno hacia la residencia y la libertad financiera. No es solo un cambio de país, es un cambio de mentalidad.
                            </p>

                            <button className="text-gold font-bold uppercase tracking-widest text-sm border-b-2 border-gold pb-1 hover:text-plum hover:border-plum transition-colors">
                                Descubre tu potencial &rarr;
                            </button>
                        </motion.div>
                    </div>

                    {/* Right Grid */}
                    <div className="w-full lg:w-1/2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-cream p-6 rounded-sm border border-gold/10 hover:border-gold/50 transition-colors group"
                                >
                                    <div className="text-gold mb-4 group-hover:scale-110 transition-transform duration-300">
                                        {benefit.icon}
                                    </div>
                                    <h3 className="font-serif font-bold text-xl text-plum mb-2">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-plum/60 text-sm leading-relaxed">
                                        {benefit.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default DubaiAdvantage;

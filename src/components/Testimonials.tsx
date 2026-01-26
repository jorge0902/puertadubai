
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const Testimonials = () => {
    const testimonials = [
        {
            name: "Alejandro G.",
            role: "Emprendedor Digital",
            origin: "La Habana",
            quote: "Pensé que mi pasaporte cubano sería un obstáculo insalvable. Isabel y su equipo no solo me ayudaron con la visa, me enseñaron a estructurar mi negocio para operar globalmente desde Dubái. Hoy facturo sin restricciones.",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=3387&auto=format&fit=crop"
        },
        {
            name: "Laura M.",
            role: "Hospitality Specialist",
            origin: "Camagüey",
            quote: "Conseguir trabajo en un restaurante de lujo en tiempo récord cambió la vida de mi familia. Con un salario de casi $2,000 USD y la asesoría laboral que recibí, logré establecerme y ahora puedo ayudarlos como nunca antes.",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop"
        },
        {
            name: "Jorge y María",
            role: "Inversionistas",
            origin: "Santa Clara",
            quote: "Buscábamos seguridad para nuestros hijos. La asesoría sobre colegios y vivienda fue impagable. No solo nos mudamos, mejoramos nuestra calidad de vida un 200%. Dubái es otro mundo.",
            image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop"
        }
    ];

    return (
        <section className="py-24 bg-white relative">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-16">
                    <span className="text-gold uppercase tracking-widest text-xs font-bold mb-2 block">Historias Reales</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-plum mb-6">
                        Cubanos triunfando en Dubái
                    </h2>
                    <div className="w-24 h-1 bg-gold mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-cream p-8 rounded-sm relative pt-12"
                        >
                            <Quote className="absolute top-8 left-8 text-gold/20 transform -scale-x-100" size={64} />

                            <p className="text-plum/70 italic mb-8 relative z-10 font-medium">
                                "{t.quote}"
                            </p>

                            <div className="flex items-center gap-4">
                                <img
                                    src={t.image}
                                    alt={t.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-gold"
                                />
                                <div>
                                    <h4 className="font-bold text-plum text-sm">{t.name}</h4>
                                    <p className="text-xs text-rose font-bold uppercase tracking-wider">{t.role}</p>
                                    <p className="text-xs text-gray-400">De {t.origin}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;



import { ShieldCheck, Eye, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const WhyUs = () => {
    const reasons = [
        {
            icon: <ShieldCheck size={40} className="text-gold" />,
            title: "Especialización en Perfil Cuba",
            desc: "No todas las nacionalidades enfrentan los mismos retos. Conocemos los protocolos específicos de seguridad y banca para cubanos. Tu pasaporte no es un freno si sabes cómo usarlo."
        },
        {
            icon: <Eye size={40} className="text-gold" />,
            title: "Transparencia Radical",
            desc: "Aquí no hay costos ocultos. Te entregamos un presupuesto cerrado desde el día uno. Sin sorpresas de último minuto en el aeropuerto o en la notaría."
        },
        {
            icon: <Users size={40} className="text-gold" />,
            title: "Acompañamiento 360",
            desc: "No somos una gestoría de visas. Somos tu equipo de confianza en Dubái. Te entregamos las llaves de tu empresa, tu residencia y tu nuevo hogar."
        }
    ];

    return (
        <section className="py-20 bg-cream">
            <div className="container mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-plum mb-4">
                        ¿Por qué Puerta Dubai?
                    </h2>
                    <div className="w-24 h-1 bg-gold mx-auto"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {reasons.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="flex flex-col items-start p-8 bg-white border-t-4 border-gold shadow-sm hover:shadow-xl transition-shadow duration-300 rounded-sm"
                        >
                            <div className="mb-6 p-4 bg-cream rounded-full">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-plum mb-4 font-serif">
                                {item.title}
                            </h3>
                            <p className="text-plum/70 leading-relaxed text-sm">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;

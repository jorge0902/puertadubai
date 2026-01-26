import { ShieldCheck, Users, Ban } from 'lucide-react';
import { motion } from 'framer-motion';

const SecurityPillars = () => {
    const pillars = [
        {
            icon: <ShieldCheck size={48} />,
            title: "Proceso 100% Legal",
            description: "Cumplimiento estricto con las normativas de los EAU para garantizar tu estatus."
        },
        {
            icon: <Users size={48} />,
            title: "Acompañamiento en Dubái",
            description: "No estarás solo. Te guiamos desde tu llegada hasta la obtención de tu ID."
        },
        {
            icon: <Ban size={48} />,
            title: "Sin intermediarios",
            description: "Trato directo. Eliminamos capas innecesarias para tu seguridad y ahorro."
        }
    ];

    return (
        <section className="py-16 bg-white relative z-20 -mt-10 rounded-t-[2.5rem] md:rounded-t-[4rem] shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-plum/10">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="flex flex-col items-center text-center p-4"
                        >
                            <div className="text-gold mb-6 p-4 bg-plum/5 rounded-full">
                                {pillar.icon}
                            </div>
                            <h3 className="text-xl font-serif font-bold text-plum mb-3">
                                {pillar.title}
                            </h3>
                            <p className="text-plum/60 leading-relaxed font-light">
                                {pillar.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SecurityPillars;

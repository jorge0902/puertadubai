import { motion } from 'framer-motion';
import { Heart, Briefcase, Home, Package, Lightbulb } from 'lucide-react';

const IsabelPromise = ({ onOpenModal }: { onOpenModal: () => void }) => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:w-1/2"
                    >
                        <div className="relative p-4">
                            <div className="absolute -inset-4 bg-gold/10 rounded-lg transform -rotate-3"></div>
                            <img
                                src="/isabel-promise-v2.jpg"
                                alt="Isabel - Tu amiga en Dubái"
                                className="relative rounded-lg shadow-2xl w-full object-cover h-[400px] md:h-[600px]"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-cream p-6 rounded-lg shadow-xl border border-gold/20 max-w-xs hidden md:block">
                                <p className="font-serif italic text-plum text-lg">"Dubái es increíble, pero con alguien que te cuide, es mucho mejor."</p>
                                <p className="text-right text-rose font-bold text-sm mt-2">- Isabel</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:w-1/2"
                    >
                        <span className="text-gold uppercase tracking-widest text-xs font-bold mb-2 block">Por qué confiar en mí</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-plum mb-6">
                            La Promesa de Isabel
                        </h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Sé que mudarse o invertir aquí da un poco de vértigo. Yo misma estuve en tus zapatos.
                            Por eso, en Dhahabi Agency no te tratamos como un "cliente", te tratamos como a uno de los nuestros.
                            Aquí te cuento cómo te voy a acompañar en este viaje:
                        </p>

                        <div className="space-y-6">
                            <PromiseItem
                                icon={<Heart />}
                                title="No estás solo, tienes a una amiga aquí"
                                text="Nada más aterrizar, olvida los nervios. Yo misma o mi equipo te recibiremos. Te enseñaré a moverte como un local y te llevaré a las mejores tiendas."
                            />
                            <PromiseItem
                                icon={<Briefcase />}
                                title="Tu éxito laboral es mi prioridad"
                                text="Acceso a mi base de datos con +20,000 empresas. Usaremos IA para tu CV y buscaremos intensivamente para multiplicar tus opciones."
                            />
                            <PromiseItem
                                icon={<Home />}
                                title="Tu casa y tus finanzas bajo control"
                                text="Gestiono tu renta para evitar líos. Facilito remesas y recargas para que sigas conectado con los tuyos."
                            />
                            <PromiseItem
                                icon={<Package />}
                                title="Conexión directa con los tuyos (Especial Cuba)"
                                text="Servicio especializado de envío de paquetes seguro y rápido."
                            />
                            <PromiseItem
                                icon={<Lightbulb />}
                                title="Y porque siempre hay un 'extra'..."
                                text="Consejos a las 3 AM, pagar facturas... Mi compromiso es que te sientas en casa desde el minuto uno."
                            />
                        </div>

                        <div className="mt-10">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onOpenModal}
                                className="bg-gold text-plum px-8 py-4 rounded font-bold text-lg shadow-lg hover:shadow-xl transition-all w-full md:w-auto"
                            >
                                Isabel, quiero empezar mi viaje
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const PromiseItem = ({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) => (
    <div className="flex gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-cream rounded-full flex items-center justify-center text-gold shadow-sm">
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-plum text-lg mb-1">{title}</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
        </div>
    </div>
);

export default IsabelPromise;

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-plum/10">
            <button
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg md:text-xl font-serif font-medium text-plum group-hover:text-gold transition-colors">
                    {question}
                </span>
                <div className="ml-4 text-gold shrink-0">
                    {isOpen ? <Minus size={24} /> : <Plus size={24} />}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pb-8 text-plum/70 leading-relaxed pr-8">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    const faqs = [
        {
            question: "¿Cómo es el alojamiento?",
            answer: "Dubái es caro si quieres vivir solo, pero el sistema está diseñado para que los trabajadores compartan gastos. Bed Space (Cama en habitación compartida): Es común al llegar si se tiene bajo presupuesto. Cuesta entre $150 y $300 USD al mes, dependiendo de la zona y si incluye servicios (agua, luz, internet). Partition: es lo más común, es como un cuarto muy pequeño con espacio para tu cama y espacio para poner tus cosas, tiene más privacidad que la bed space pero el espacio es reducido, pero el baño está afuera y es compartido al igual que la cocina, el costo es de 1700 AED aproximadamente (alrededor de 500 USD). Habitación privada: Entre $600 y $900 USD. Dato importante: Las rentas suelen incluir el 'DEWA' (servicios básicos) en modalidades compartidas, lo cual ayuda a presupuestar mejor."
        },
        {
            question: "¿Cómo son los trabajos y salarios?",
            answer: "Hay mucha oferta, pero la competencia es global. Servicios (Meseros, limpieza, seguridad): $600 - $900 USD + en ocasiones propinas o comida. A veces son mucho más altos en lugares premium. Construcción/Mantenimiento: $500 - $800 USD. Ventas/Retail: $1,000 - $1,500 USD. Profesionales especializados: $2,500 USD en adelante. Sinceridad: Al principio, el primer sueldo suele ser para establecerte. El crecimiento real viene después de los primeros 6 meses."
        },
        {
            question: "¿Qué documentos necesitas para llegar a Dubái?",
            answer: "Pasaporte vigente, Visa de turista (nosotros la gestionamos) y Foto 2x2 de pasaporte."
        },
        {
            question: "¿Qué pasa si deniegan la visa?",
            answer: "No es común si los documentos están en regla, pero sucede. Si se deniega, generalmente se puede apelar o reintentar corrigiendo el error (como una foto mal tomada o un error en el nombre). Dhahabi Agency te asesora para que el expediente vaya impecable y minimizar este riesgo."
        },
        {
            question: "Costo de vida",
            answer: "Para vivir de forma sencilla pero digna, calcula unos $500 - $700 USD mensuales (incluyendo renta en cama compartida, comida económica y transporte público). El Metro de Dubái es tu mejor aliado para ahorrar."
        },
        {
            question: "¿Qué sucede si vence el tiempo de turismo?",
            answer: "No debes quedarte ilegal. Las multas por 'overstay' son diarias y muy costosas (pueden superar los $15 USD por día). Además, esto te puede generar una deportación y prohibición de entrada de por vida. Si no has conseguido empleo, debes salir del país o renovar la visa de turista antes de que expire."
        },
        {
            question: "¿Cómo conseguir los 'papeles' de residencia?",
            answer: "En Dubái, la residencia está ligada al trabajo. Tú no compras la residencia; la empresa que te contrata la paga. Una vez que firmas un contrato, la empresa inicia el proceso de tu Emirates ID. Ellos deben cubrir los gastos del visado de trabajo por ley. Sin embargo: El Paquete de Residencia es la opción más inteligente y segura. Olvídate de la incertidumbre. Ventaja laboral: Las empresas te contratan más rápido porque ya tienes tus papeles listos para empezar."
        },
        {
            question: "¿Podré ayudar a mi familia?",
            answer: "Sí, pero con disciplina. Si ganas $1000 y gastas $500, puedes enviar $300 y ahorrar $200. Muchos cubanos y latinos lo logran enviando remesas mensuales. La clave es no caer en el consumismo de Dubái en los primeros meses."
        },
        {
            question: "Método de pago y sedes",
            answer: "Para facilitar las cosas a la comunidad en Cuba, aceptamos Moneda Nacional (tanto en efectivo como por transferencia). El proceso y los pagos se coordinan directamente en nuestras sedes de Holguín y La Habana. También aceptamos pagos mediante transferencias bancarias internacionales, PayPal o pagos a través de familiares en el exterior."
        },
        {
            question: "¿Por qué confiar en Dhahabi Agency?",
            answer: "Sabemos que emigrar es la decisión más importante de tu vida. Legalidad: Somos una agencia con todos los papeles en regla, operando bajo normativas que protegen al cliente. Nuestra mejor publicidad: No son los anuncios, son los clientes que ya están en Dubái trabajando y enviando ayuda a sus casas. Cada persona que ubicamos es un testimonio vivo de nuestro compromiso."
        },
        {
            question: "¿Tiempo del proceso?",
            answer: "Es rápido. Normalmente demora solo de una semana a 15 días."
        }
    ];

    return (
        <section id="faq" className="py-24 bg-cream">
            <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                <div className="text-center mb-16">
                    <p className="text-rose font-bold py-1 px-4 border border-rose/30 rounded-full inline-block text-xs uppercase tracking-widest mb-4">
                        Transparencia Radical
                    </p>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-plum">
                        Preguntas Frecuentes
                    </h2>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-sm shadow-sm border-t-4 border-plum">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} {...faq} />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-plum/60 italic font-serif">
                        ¿Tienes más dudas? No gestionamos empleo, pero si eres inversor, hablemos.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FAQ;

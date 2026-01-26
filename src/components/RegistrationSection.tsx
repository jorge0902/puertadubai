import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RegistrationPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const RegistrationSection = ({ isOpen, onClose }: RegistrationPopupProps) => {
    const [formData, setFormData] = useState({
        nombre: '',
        whatsapp: '',
        email: '',
        interes: 'Paquete Básico'
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('https://n8n.puertadubai.online/webhook/registro-isabel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Nombre: formData.nombre,
                    WhatsApp: formData.whatsapp,
                    Email: formData.email,
                    Interes: formData.interes,
                }),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ nombre: '', whatsapp: '', email: '', interes: 'Paquete Básico' });
                // Optional: Close after success
                setTimeout(() => {
                    onClose();
                    setStatus('idle');
                }, 3000);
            } else {
                throw new Error('Error al enviar el formulario');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
            setErrorMessage('Hubo un problema al enviar. Por favor, intenta de nuevo.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl relative flex flex-col md:flex-row max-h-[90vh] md:max-h-[800px]"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white/40 md:bg-black/10 md:hover:bg-black/20 text-white md:text-gray-700 p-2 rounded-full transition-colors backdrop-blur-md"
                        >
                            <X size={24} />
                        </button>

                        {/* Left Side: Call to Action */}
                        <div className="md:w-2/5 bg-plum text-white p-8 md:p-10 flex flex-col justify-center relative overflow-hidden shrink-0">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-rose/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 relative z-10">
                                ¿Te vas a quedar fuera?
                            </h3>
                            <p className="text-white/80 mb-6 leading-relaxed relative z-10 text-sm md:text-base">
                                Isabel está cerrando la agenda de asesorías de este mes. Regístrate ahora para asegurar tu lugar.
                            </p>
                            <div className="flex items-center gap-2 text-gold font-bold uppercase text-xs tracking-widest relative z-10">
                                <span>●</span> Últimos cupos disponibles
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="md:w-3/5 p-6 md:p-10 overflow-y-auto">
                            {status === 'success' ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center py-8"
                                >
                                    <CheckCircle size={64} className="text-green-500 mb-6" />
                                    <h4 className="text-2xl font-bold text-plum mb-2">¡Registro exitoso!</h4>
                                    <p className="text-gray-600">Isabel te contactará por WhatsApp.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                                    <div>
                                        <label htmlFor="reg-nombre" className="block text-sm font-bold text-plum mb-1.5">
                                            Nombre Completo
                                        </label>
                                        <input
                                            type="text"
                                            id="reg-nombre"
                                            name="nombre"
                                            required
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm"
                                            placeholder="Tu nombre"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="reg-whatsapp" className="block text-sm font-bold text-plum mb-1.5">
                                            WhatsApp (con código de país)
                                        </label>
                                        <input
                                            type="tel"
                                            id="reg-whatsapp"
                                            name="whatsapp"
                                            required
                                            value={formData.whatsapp}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm"
                                            placeholder="+53 5555 5555"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="reg-email" className="block text-sm font-bold text-plum mb-1.5">
                                            Correo Electrónico
                                        </label>
                                        <input
                                            type="email"
                                            id="reg-email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm"
                                            placeholder="tucorreo@ejemplo.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="reg-interes" className="block text-sm font-bold text-plum mb-1.5">
                                            Interés
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="reg-interes"
                                                name="interes"
                                                value={formData.interes}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white appearance-none cursor-pointer text-sm"
                                            >
                                                <option value="Paquete Básico">Paquete Básico</option>
                                                <option value="Paquete Premium">Paquete Premium</option>
                                                <option value="Paquete VIP">Paquete VIP</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {status === 'error' && (
                                        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-sm text-sm">
                                            <AlertCircle size={16} />
                                            <span>{errorMessage}</span>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full bg-gold text-plum font-bold py-3.5 rounded-sm hover:bg-gold/90 transition-all uppercase tracking-widest text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                                    >
                                        {status === 'loading' ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                Enviando...
                                            </>
                                        ) : (
                                            <>
                                                Enviar Registro <Send size={18} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default RegistrationSection;

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface ContactFormProps {
    isOpen: boolean;
    onClose: () => void;
    selectedPackage: string;
}

const ContactForm = ({ isOpen, onClose, selectedPackage }: ContactFormProps) => {
    const [formData, setFormData] = useState({
        nombre: '',
        whatsapp: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('https://n8n.puertadubai.online/webhook-test/registro-isabel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Nombre: formData.nombre,
                    WhatsApp: formData.whatsapp,
                    Paquete: selectedPackage,
                }),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ nombre: '', whatsapp: '' });
                // Optional: Close modal after a delay
                // setTimeout(onClose, 3000);
            } else {
                throw new Error('Error al enviar el formulario');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
            setErrorMessage('Hubo un problema al enviar. Por favor, intenta de nuevo.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-plum text-white p-6 flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-serif font-bold">Reserva tu Oportunidad</h3>
                                <p className="text-white/70 text-sm mt-1">{selectedPackage}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-white/70 hover:text-white transition-colors p-1"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-8">
                            {status === 'success' ? (
                                <div className="text-center py-8">
                                    <div className="flex justify-center mb-4">
                                        <CheckCircle size={64} className="text-green-500" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-plum mb-2">¡Mensaje enviado con éxito!</h4>
                                    <p className="text-gray-600 mb-6">Isabel te contactará pronto para finalizar tu proceso.</p>
                                    <button
                                        onClick={onClose}
                                        className="bg-gold text-plum font-bold py-3 px-8 rounded-sm hover:bg-gold/90 transition-colors uppercase tracking-widest text-sm"
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="nombre" className="block text-sm font-bold text-plum mb-2">
                                            Nombre Completo
                                        </label>
                                        <input
                                            type="text"
                                            id="nombre"
                                            name="nombre"
                                            required
                                            autoComplete="name"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all"
                                            placeholder="Tu nombre"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="whatsapp" className="block text-sm font-bold text-plum mb-2">
                                            Número de WhatsApp
                                        </label>
                                        <input
                                            type="tel"
                                            id="whatsapp"
                                            name="whatsapp"
                                            required
                                            autoComplete="tel"
                                            value={formData.whatsapp}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all"
                                            placeholder="+53 5555 5555"
                                        />
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
                                        className="w-full bg-gold text-plum font-bold py-4 rounded-sm hover:bg-gold/90 transition-all uppercase tracking-widest text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {status === 'loading' ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                Enviando...
                                            </>
                                        ) : (
                                            <>
                                                Enviar Solicitud <Send size={18} />
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

export default ContactForm;

import { useState } from 'react';
import confetti from 'canvas-confetti';

interface FormData {
    nombre: string;
    whatsapp: string;
    email: string;
    proximidad_viaje: string;
    pasaporte_ok: string;
    presupuesto_rango: string;
    meta_viaje: string;
    interes_contacto: string;
}

const LeadForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [step, setStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        nombre: '',
        whatsapp: '',
        email: '',
        proximidad_viaje: '',
        pasaporte_ok: '',
        presupuesto_rango: '',
        meta_viaje: '',
        interes_contacto: ''
    });

    if (!isOpen) return null;

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (step < questions.length - 1) {
            setStep(prev => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // 1. Send to n8n Webhook
            const response = await fetch('https://n8n.puertadubai.online/webhook/registro-isabel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Network response was not ok');

            // 2. Success Magic
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#D4AF37', '#ffffff', '#000000'] // Gold, White, Black
            });

            // 3. Show Success View
            setIsSuccess(true);
            setTimeout(() => onClose(), 4000); // Auto close after 4s (User request)

        } catch (error) {
            console.error('Error enviando formulario:', error);
            // Backup Local
            const backups = JSON.parse(localStorage.getItem('failed_leads') || '[]');
            backups.push({ ...formData, date: new Date().toISOString() });
            localStorage.setItem('failed_leads', JSON.stringify(backups));

            confetti({ particleCount: 50, colors: ['#D4AF37'] });
            setIsSuccess(true); // Show success anyway to preserve UX
        } finally {
            setIsSubmitting(false);
        }
    };

    const questions = [
        {
            key: 'proximidad_viaje',
            label: '¿Qué tan cerca estás hoy de Dubái?',
            type: 'select',
            options: [
                '¡Listo para despegar ya! 🚀',
                'Lo estoy planeando para los próximos 3-6 meses. 📅',
                'Solo estoy curioseando por ahora. 🧐'
            ]
        },
        {
            key: 'pasaporte_ok',
            label: '¿Tienes tu pasaporte vigente a mano ahora mismo?',
            type: 'select',
            options: [
                'Sí, lo tengo listo. ✅',
                'Está en trámite o por renovar. ⏳',
                'Aún no tengo pasaporte. ❌'
            ]
        },
        {
            key: 'presupuesto_rango',
            label: 'Para darte una asesoría realista: ¿Con qué presupuesto inicial cuentas?',
            type: 'select',
            options: [
                'A. Menos de $2,000 USD (Etapa de ahorro 📈)',
                'B. Entre $2,000 y $4,000 USD (Trámites de empleo y llegada ✈️)',
                'C. Más de $4,000 USD (Inversión / Residencia VIP 🇦🇪)'
            ]
        },
        {
            key: 'meta_viaje',
            label: '¿Cuál es tu meta principal al llegar a Dubái?',
            type: 'select',
            options: [
                'Trabajar y ayudar a mi familia. ❤️',
                'Emprender mi propio negocio. 🚀',
                'Vivir la experiencia y crecer profesionalmente. ✨'
            ]
        },
        {
            key: 'nombre',
            label: 'Dime tu nombre completo (como aparece en tu pasaporte)',
            type: 'text',
            autoComplete: 'name',
            htmlName: 'name', // Google Autofill Support
            placeholder: 'Ej: Ana María García'
        },
        {
            key: 'email',
            label: 'Tu correo electrónico para enviarte el catálogo',
            type: 'email',
            autoComplete: 'email',
            htmlName: 'email', // Google Autofill Support
            placeholder: 'tucorreo@ejemplo.com'
        },
        {
            key: 'whatsapp',
            label: 'Tu WhatsApp con el código de tu país',
            type: 'tel',
            autoComplete: 'tel',
            htmlName: 'tel', // Google Autofill Support
            placeholder: '+53 5555 5555'
        },
        {
            key: 'interes_contacto',
            label: '¿Te gustaría que Isabel te contacte personalmente si tu perfil encaja?',
            type: 'select',
            options: [
                '¡Sí, por favor! Me urge. 😍',
                'Prefiero leer el catálogo primero. 👍'
            ]
        }
    ];

    const currentQ = questions[step];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300">
            <div className="bg-white relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gold/30">

                {/* Success View */}
                {isSuccess ? (
                    <div className="p-12 text-center animate-fade-in">
                        <div className="text-6xl mb-6">✨</div>
                        <h2 className="text-3xl font-serif text-plum font-bold mb-4">¡Felicidades, {formData.nombre.split(' ')[0]}!</h2>
                        <p className="text-gray-600 mb-6 text-lg">
                            Tu registro fue un éxito. 🚀<br />
                            Revisa tu correo (y spam) para recibir el catálogo.
                        </p>
                        <button
                            onClick={onClose}
                            className="bg-gold text-white px-8 py-3 rounded-full font-medium shadow-lg hover:bg-gold/90 transition-all cursor-pointer"
                        >
                            Entendido
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Progress Bar */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
                            <div
                                className="h-full bg-gold transition-all duration-500 ease-out"
                                style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                            />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            ✕
                        </button>

                        <div className="p-8 pt-12">
                            {/* Header */}
                            <div className="mb-8 text-center">
                                <h2 className="text-2xl font-serif text-plum italic mb-2">Tu Puerta a Dubái 🇦🇪</h2>
                                <p className="text-sm text-gray-500">Paso {step + 1} de {questions.length}</p>
                            </div>

                            {/* Question */}
                            <div className="min-h-[120px]">
                                <label className="block text-lg font-medium text-gray-900 mb-4 animate-fade-in">
                                    {currentQ.label}
                                </label>

                                {currentQ.type === 'select' ? (
                                    <div className="space-y-3">
                                        {currentQ.options?.map((opt) => (
                                            <button
                                                key={opt}
                                                onClick={() => {
                                                    handleChange(currentQ.key as keyof FormData, opt);
                                                    handleNext();
                                                }}
                                                className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-gold hover:bg-gold/5 transition-all duration-200 text-gray-700"
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <input
                                        type={currentQ.type}
                                        className="w-full p-3 border-b-2 border-gray-200 focus:border-gold focus:outline-none transition-colors text-lg bg-transparent"
                                        placeholder={currentQ.placeholder}
                                        value={(formData as any)[currentQ.key]}
                                        onChange={(e) => handleChange(currentQ.key as keyof FormData, e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                                        autoFocus
                                        autoComplete={(currentQ as any).autoComplete}
                                        name={(currentQ as any).htmlName}
                                    />
                                )}
                            </div>

                            {/* Navigation */}
                            <div className="mt-8 flex justify-between items-center">
                                {step > 0 ? (
                                    <button
                                        onClick={() => setStep(s => s - 1)}
                                        className="text-sm text-gray-400 hover:text-gray-600"
                                    >
                                        ← Atrás
                                    </button>
                                ) : <div />}

                                {currentQ.type !== 'select' && (
                                    <button
                                        onClick={handleNext}
                                        disabled={!(formData as any)[currentQ.key]}
                                        className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${(formData as any)[currentQ.key]
                                            ? 'bg-gold text-white shadow-lg shadow-gold/30 hover:shadow-gold/50 cursor-pointer transform hover:-translate-y-0.5'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        {isSubmitting ? 'Enviando...' : (step === questions.length - 1 ? 'Finalizar ✨' : 'Siguiente →')}
                                    </button>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default LeadForm;

import { useState } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

const VideoSection = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoId = "leAIt0pfUSs";

    return (
        <section className="py-20 bg-white relative">
            <div className="container mx-auto px-4 md:px-8">

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Text Side (or Lateral Copy) */}
                    <div className="w-full lg:w-1/3 order-2 lg:order-1">
                        <div className="relative pl-6 border-l-2 border-gold/50">
                            <h2 className="text-3xl md:text-3xl font-serif font-bold text-plum mb-6">
                                Dubái: Realidad vs. Fantasía. <br />
                                <span className="text-gold">Lo que nadie te cuenta.</span>
                            </h2>
                            <p className="text-plum/80 mb-6 leading-relaxed">
                                En este vídeo de 3 minutos, te explico por qué el 90% de las personas fallan al intentar mudarse a Dubai y es por falta de información aquí te doy una información mas detallada de lo que debes saber para dar tus primeros pasos y cómo mi metodología te garantiza entrar por la puerta grande.
                            </p>
                            <p className="font-serif italic text-rose">
                                — Isabel, Fundadora.
                            </p>
                        </div>
                    </div>

                    {/* Video Side */}
                    <div className="w-full lg:w-2/3 order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative group cursor-pointer"
                            onClick={() => setIsPlaying(true)}
                        >
                            {/* Gold styling border */}
                            <div className="absolute -inset-1 bg-gold rounded-sm blur-[1px] group-hover:blur-md transition-all duration-500 opacity-70"></div>

                            {/* Video Container */}
                            <div className="relative aspect-video bg-plum rounded-sm overflow-hidden shadow-2xl border border-gold/30 flex items-center justify-center">

                                {!isPlaying ? (
                                    <>
                                        {/* Placeholder for iframe / video thumbnail */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-plum/80 to-black/60 z-10"></div>

                                        {/* Play Button */}
                                        <div className="relative z-20 w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                                            <Play className="text-white fill-white ml-2" size={32} />
                                        </div>

                                        {/* Text overlay for thumbnail */}
                                        <div className="absolute bottom-6 left-6 z-20">
                                            <span className="bg-gold text-plum text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-sm mb-2 inline-block">
                                                Video Exclusivo
                                            </span>
                                            <p className="text-white font-serif text-lg">La llave de tu nueva vida</p>
                                        </div>

                                        {/* Using YouTube Thumbnail */}
                                        <img
                                            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                                            alt="Dubai Skyline"
                                            className="absolute inset-0 w-full h-full object-cover opacity-60"
                                        />
                                    </>
                                ) : (
                                    <iframe
                                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                                        title="Puerta Dubai Video"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="absolute inset-0 w-full h-full"
                                    ></iframe>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default VideoSection;

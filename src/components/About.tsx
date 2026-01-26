

const About = () => {
    return (
        <section id="sobre-mi" className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row items-center gap-12">

                    {/* Image Side */}
                    <div className="w-full md:w-1/2">
                        <div className="relative">
                            <div className="absolute top-4 left-4 w-full h-full border-2 border-plum/20 z-0"></div>
                            <img
                                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2669&auto=format&fit=crop"
                                alt="Fundadora en oficina"
                                className="relative z-10 w-full h-auto shadow-xl grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </div>

                    {/* Text Side */}
                    <div className="w-full md:w-1/2">
                        <h2 className="text-4xl lg:text-5xl font-serif font-bold text-plum mb-8">
                            Del sueño a la <span className="text-gold">ejecución.</span>
                        </h2>

                        <div className="prose prose-lg text-plum/80 mb-8 font-light">
                            <p className="mb-4">
                                Entiendo tus miedos porque yo también busqué libertad y seguridad. Salir de Cuba no es solo un viaje físico, es un cambio de mentalidad.
                            </p>
                            <p className="mb-4">
                                Hoy, Dubái es mi hogar y el de mi familia. Pero el camino no fue fácil. Me enfrenté a la burocracia, a la información confusa y a "asesores" que solo querían venderme algo.
                            </p>
                            <p>
                                He fundado <strong>Puerta Dubai</strong> para que tú no tengas que cometer los errores que yo vi cometer a otros. Mi compromiso es tu tranquilidad y tu éxito legal en este país de oportunidades.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="h-px w-12 bg-gold"></span>
                            <span className="font-serif italic text-plum font-bold text-lg">Isabel</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;

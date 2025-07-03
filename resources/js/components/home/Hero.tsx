import { Link } from '@inertiajs/react';

export default function Hero() {
    return (
        <section
            className="relative w-full overflow-hidden bg-white px-6 sm:px-12 md:px-20 lg:px-36"
            style={{
                backgroundImage: 'url(/images/hero-bg.svg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
            }}
        >
            <img
                src="/images/hero-shape-2.png"
                alt="Decoración"
                className="pointer-events-none absolute top-0 right-0 z-0 w-[300px] select-none md:w-[400px] lg:w-[480px]"
            />

            <div className="relative z-10 mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-12 py-16 md:py-20 lg:flex-row">
                <div className="z-10 max-w-xl text-center lg:text-left">
                    <h1 className="text-3xl leading-tight font-black text-[#173759] sm:text-4xl lg:text-5xl">
                        Educación para todos: <br />
                        <span className="text-[#3694da]">Inscríbete hoy</span>
                    </h1>
                    <p className="mt-4 text-base text-[#1b1b18] sm:text-lg">¡Tu momento ha llegado!</p>
                    <Link
                        href={route('register')}
                        className="mt-6 inline-block rounded-md bg-[#136bb6] px-6 py-3 text-sm text-white transition hover:bg-blue-700 sm:text-base"
                    >
                        Haz clic aquí para inscribirte →
                    </Link>
                </div>

                <div className="relative z-10 w-full max-w-sm py-10 sm:max-w-md lg:max-w-lg">
                    <div className="absolute top-0 left-1/4 h-56 w-44 overflow-hidden rounded-tl-none rounded-tr-[50px] rounded-br-none rounded-bl-[50px] bg-white shadow-md">
                        <img src="/images/hero-banner-1.jpg" alt="Estudiante 1" className="h-full w-full object-cover" />
                    </div>

                    <div className="absolute right-0 bottom-0 h-56 w-44 overflow-hidden rounded-tl-[50px] rounded-tr-none rounded-br-[50px] rounded-bl-none bg-white shadow-md">
                        <img src="/images/hero-banner-2.jpg" alt="Estudiante 2" className="h-full w-full object-cover" />
                    </div>

                    <div className="invisible h-[300px] sm:h-[320px] md:h-[280px]"></div>
                </div>
            </div>
        </section>
    );
}

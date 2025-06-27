import Hero from '@/components/home/Hero';
import About from '@/components/home/about';
import Video from '@/components/home/videos';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen flex-col bg-white">
                <header className="relative flex items-center justify-between bg-white px-3 py-5 md:px-10">
                    <div className="text-2xl font-bold text-blue-700">
                        <img src="/Sinfondo.png" alt="Logo" className="h-8" />
                    </div>

                    <button className="z-10 text-gray-700 focus:outline-none md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            {menuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    <nav
                        className={`${
                            menuOpen ? 'flex' : 'hidden'
                        } absolute top-full left-0 z-30 w-full flex-col gap-4 bg-white p-6 md:static md:flex md:flex-row md:items-center md:justify-end md:gap-6 md:p-0`}
                    >
                        <Link href="#" className="text-black hover:underline">
                            Home
                        </Link>
                        <Link href="#" className="text-black hover:underline">
                            About
                        </Link>
                        <Link href="#" className="text-black hover:underline">
                            Courses
                        </Link>
                        <Link href="#" className="text-black hover:underline">
                            Blog
                        </Link>

                        {auth.user ? (
                            <Link href={route('dashboard')} className="font-medium text-gray-700 hover:text-blue-600">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-gray-700 hover:text-blue-600">
                                    Log in
                                </Link>
                                <Link href={route('register')} className="text-gray-700 hover:text-blue-600">
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <Hero />
                <About />
                <Video />
            </div>
        </>
    );
}

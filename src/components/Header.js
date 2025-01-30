// Header.js
'use client'
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/#about' },

        { name: 'Speakers', href: '/#speakers' },
        { name: 'Itinerary', href: '/#itinerary' },
        { name: 'Gallery', href: '/#gallery' },
        { name: 'Contact Us', href: '/#contact' },
        
        { name: 'Tickets', href: '/#tickets' },
    ];

    return (
        <header className="fixed  top-0 w-full z-50 bg-white  shadow-md">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">
                    {/* Left Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Image
                                src='/brandstorieslogo.png'
                                width={2000}
                                height={2000}
                                className="h-6 w-auto md:h-8"
                                alt="brand Stories"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation - Centered */}
                    <div className="hidden md:flex flex-1 justify-center">
                        <div className="flex items-center space-x-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-black hover:text-amber-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Logo - Desktop */}
                    <Image
                        src="/traderslogonew.png"
                        className="h-24 w-auto object-contain hidden md:block"
                        width={5000}
                        height={5000}
                        alt="Money Icon"
                        priority
                    />
                    {/* <div className="hidden md:block flex-shrink-0">
                        <Image 
                            src='/traderslogonew.png' 
                            width={2000} 
                            height={2000} 
                            className="w-auto h-12" 
                            alt="brand Stories" 
                        />
                    </div> */}

                    {/* Mobile menu button and Right Logo */}
                    <div className="md:hidden flex items-center space-x-2">

                        <Image
                            src="/traderslogonew.png"
                            className=" h-24 w-auto object-contain"
                            width={5000}
                            height={5000}
                            alt="Money Icon"
                            priority
                        />
                        {/* <Image 
                            src='/traderslogonew.png' 
                            width={2000} 
                            height={2000} 
                            className="w-28 h-auto" 
                            alt="brand Stories" 
                        /> */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-black hover:text-amber-500 p-2"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden bg-white">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-black hover:text-amber-500 block px-3 py-2 rounded-md text-base font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;
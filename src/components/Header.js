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
        { name: 'Contact', href: '/#contact' },
        { name: 'Tickets', href: '/#tickets' },
        { name: 'Speakers', href: '/#speakers' },
        { name: 'Itinerary', href: '/#itinerary' },
        { name: 'Gallery', href: '/#gallery' },
    ];

    return (
        <header className="fixed w-full z-50 bg-white backdrop-blur-sm">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between ">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" >
                            <Image src='/traders.png' width={2000} height={2000} className="w-32 h-auto" alt="brand Stories" />

                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-black hover:text-amber-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Image src='/money.png' width={2000} height={2000} className="w-32 h-auto" alt="brand Stories" />

                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex">
                    <Image src='/money.png' width={2000} height={2000} className="w-32 h-auto" alt="brand Stories" />
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
                    <div className="md:hidden">
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

export default Header

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { title: 'About', href: '#about' },
    { title: 'Speakers', href: '#speakers' },
    { title: 'Schedule', href: '#schedule' },
    { title: 'Gallery', href: '#gallery' },
    { title: 'Partners', href: '#partners' },
    { title: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <img 
              src="/api/placeholder/150/50" 
              alt="Logo" 
              className="h-12"
            />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className={`font-medium transition-colors ${
                    isScrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-green-400'
                  }`}
                >
                  {item.title}
                </a>
              ))}
              <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
                Register Now
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
            >
              {isMobileMenuOpen ? (
                <X className={isScrolled ? 'text-gray-700' : 'text-white'} />
              ) : (
                <Menu className={isScrolled ? 'text-gray-700' : 'text-white'} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="container mx-auto px-4 py-4">
                {navItems.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="block py-3 text-gray-700 hover:text-green-600 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.title}
                  </a>
                ))}
                <button 
                  className="w-full mt-4 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
    
    </>
  );
};

export default Header;
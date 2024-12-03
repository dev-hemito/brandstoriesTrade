'use client'
import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Footer from '@/components/FooterSingle';
import Link from 'next/link';
import AnimatedHeroSection from '@/components/GoldenAnimation';
export default function MotivationalEventPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ticketPlans = [
    {
      name: "Basic",
      price: 499,
      features: [
        "Event Admission",
        "Basic Event Material",
        "Standard Seating"
      ]
    },
    {
      name: "Premium",
      price: 999,
      features: [
        "Event Admission",
        "Exclusive Event Material",
        "Priority Seating",
        "Meet & Greet Opportunity"
      ],
      recommended: true
    },
    {
      name: "VIP",
      price: 1499,
      features: [
        "All Premium Features",
        "Backstage Access",
        "Personal Photo with Speaker",
        "Personalized Signed Book"
      ]
    }
  ];

  return (
    <div className="bg-black text-amber-400 min-h-screen font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-amber-400"><Image src='/main.png' alt='logo' width={300} height={300} /> </div>
          <div className="hidden md:flex space-x-6">
            <Link href="/evolve25" className="text-amber-400 hover:text-yellow-500 transition">Home</Link>
            <Link href="#speakers" className="text-amber-400 hover:text-yellow-500 transition">Speakers</Link>
            <Link href="#tickets" className="text-amber-400 hover:text-yellow-500 transition">Tickets</Link>
            <Link href="#contact" className="text-amber-400 hover:text-yellow-500 transition">Contact</Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="text-amber-400" /> : <Menu className="text-amber-400" />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 absolute top-full left-0 w-full py-4">
            <div className="flex flex-col items-center space-y-4">
              <a href="#home" className="text-amber-400 hover:text-yellow-500">Home</a>
              <a href="#speakers" className="text-amber-400 hover:text-yellow-500">Speakers</a>
              <a href="#tickets" className="text-amber-400 hover:text-yellow-500">Tickets</a>
              <a href="#contact" className="text-amber-400 hover:text-yellow-500">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
<AnimatedHeroSection/>

      {/* Speaker Section */}
      <section id="speakers" className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
            <div className="w-64 h-64 bg-amber-400 rounded-full overflow-hidden border-4 border-black">
              <img 
                src="/Shiv-Khera.png" 
                alt="Shiv Khera" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="max-w-xl text-left">
              <h1 className="text-5xl text-amber-400 mb-4 ">Shiv Khera</h1>
              <p className="text-white">
                Shiv Khera is an inspiring author, motivational speaker, and activist who has transformed countless lives through his powerful messages of success, positivity, and personal development.
              </p>
              <p className="text-amber-400 mb-10">
                "Success is not an accident, it's a choice."
              </p>
              <Link href='https://shivkhera.com/about/' className='bg-gray-900  p-3 rounded-md text-amber-400 border border-amber-400 hover:bg-gray-700' >Learn more about Shiv Khera</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ticket Section */}
      <section id="tickets" className="py-20 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-amber-400 mb-12">Event Tickets</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {ticketPlans.map((plan, index) => (
              <div 
                key={plan.name} 
                className={`
                  bg-gray-900 p-8 rounded-xl shadow-2xl transform transition 
                  ${plan.recommended ? 'border-4 border-gold scale-105' : 'hover:scale-105'}
                `}
              >
                <h3 className="text-2xl text-amber-400 mb-4">{plan.name}</h3>
                <p className="text-4xl text-white font-bold mb-6">₹{plan.price}</p>
                <ul className="text-white mb-8 space-y-2">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-center">
                      <ArrowRight className="text-amber-400 mr-2" size={20} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gold text-black py-3 rounded-full font-bold hover:bg-yellow-600 transition">
                  Select {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {/* <section id="contact" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto bg-black p-8 rounded-xl">
            <h2 className="text-4xl font-bold text-amber-400 text-center mb-8">Contact Us</h2>
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <textarea 
                placeholder="Your Message" 
                className="w-full p-3 bg-gray-800 text-white rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-gold"
              ></textarea>
              <button 
                className="w-full bg-gold text-black py-3 rounded-full font-bold hover:bg-yellow-600 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      {/* <footer className="bg-black py-8 text-center">
        <p className="text-amber-400">© 2024 Success Summit. All Rights Reserved.</p>
      </footer> */}
      <Footer/>
    </div>
  );
}
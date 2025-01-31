'use client'
import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  const [selectedImage, setSelectedImage] = useState(null);



  return (
    <>


      {/* Footer */}
      <footer className="relative overflow-hidden bg-gray-900 text-white" id="contact">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
            {/* Brand Section */}
            <div className="md:col-span-5 space-y-6">
              <div className="w-48">
                <Image
                  src="/main.png"
                  alt="Brand Stories"
                  width={200}
                  height={80}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-gray-400 text-lg leading-relaxed">
                Experience the future of trading at our innovative conference, where industry leaders and enthusiasts converge to share insights and opportunities.
              </p>
              <div className="pt-4">
                <a
                  href="/terms"
                  className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors duration-200"
                >
                  <span className="mr-2">Terms and Conditions</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="">
                <a
                  href="/refund"
                  className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors duration-200"
                >
                  <span className="mr-2">Refund</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>


            </div>

            {/* Navigation */}
            <nav className="md:col-span-3">
              <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {['Home', 'About', 'Tickets', 'Speakers', 'Itinerary', 'Gallery'].map((link) => (
                  <li key={link}>
                    <a
                      href={`/#${link.toLowerCase()}`}
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-amber-400 mr-0 group-hover:mr-2 transition-all duration-200" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact Info */}
            <div className="md:col-span-4">
              <h4 className="text-xl font-semibold mb-6">Get in Touch</h4>
              <div className="space-y-4">
                <a
                  href="mailto:info@thebrandstories.co.in"
                  className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-200 group"
                >
                  <Mail className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform duration-200" />
                  <span>info@thebrandstories.co.in</span>
                </a>
                <a
                  href="tel:+919746095931"
                  className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-200 group"
                >
                  <Phone className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform duration-200" />
                  <span>+91 9746095931</span>
                </a>
                <a
                  href="tel:+918129096038"
                  className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-200 group"
                >
                  <Phone className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform duration-200" />
                  <span>+91 8129096038</span>
                </a>

                <div className="flex items-start space-x-3 text-gray-400 group pt-2">
                  <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
                  <address className="not-italic text-sm leading-relaxed">
                    2/306, G2, 6th Floor, Technoplaza,<br />
                    Nr.Sarovaram BTH, Kannadikadu,<br />
                    Maradu PO, Cochin 682304
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-16 pt-8 border-t border-gray-800/50">
            <div className="text-center text-gray-400 text-sm">
              © {new Date().getFullYear()} Brand Stories. All rights reserved.
            </div>
          </div>
        </div>

        <a href="http://wa.me/+919746095931" className='fixed bottom-5 right-5 bg-green-600 p-4 rounded-full'><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
        </svg></a>
   
      </footer>
    </>
  );
};

export default Footer;
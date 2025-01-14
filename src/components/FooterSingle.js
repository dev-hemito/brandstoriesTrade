'use client'
import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      url: "/gallery/_AKH4977.JPG",
    },
    {
      url: "/gallery/_AKH5003.JPG",
    },
    {
      url: "/gallery/_AKH5024.JPG",
    },
    {
      url: "/gallery/_AKH5052.JPG",
    },
    {
      url: "/gallery/_AKH5198.JPG",
    },
    {
      url: "/gallery/_AKH5346.JPG",
    },
    {
      url: "/gallery/_AKH5353.JPG",
    },
    {
      url: "/gallery/_AKH5369.JPG",
    },
    {
      url: "/gallery/_AKH5398.JPG",
    },
    {
      url: "/gallery/_AKH5528.JPG",
    },
    {
      url: "/gallery/_AKH5531.JPG",
    },
    {
      url: "/gallery/_AKH5537.JPG",
    },
    {
      url: "/gallery/_AKH5538.JPG",
    },
    {
      url: "/gallery/_AKH5604.JPG",
    },
    {
      url: "/gallery/_AKH5619.JPG",
    },
    {
      url: "/gallery/_AKH5630.JPG",
    },
    {
      url: "/gallery/_AKH5639.JPG",
    },
    {
      url: "/gallery/_AKH5668.JPG",
    },
    {
      url: "/gallery/_AKH5693.JPG",
    },
    {
      url: "/gallery/_AKH5802.JPG",
    },
    {
      url: "/gallery/_AKH5865.JPG",
    },
    {
      url: "/gallery/_AKH5876.JPG",
    },
    {
      url: "/gallery/_AKH5903.JPG",
    },
    {
      url: "/gallery/_AKH5920.JPG",
    },
    {
      url: "/gallery/_AKH5922.JPG",
    },
    {
      url: "/gallery/_AKH5928.JPG",
    },
    {
      url: "/gallery/_AKH5936.JPG",
    },
    {
      url: "/gallery/_AKH5946.JPG",
    },
    {
      url: "/gallery/_AKH5953.JPG",
    },
    {
      url: "/gallery/_AKH5969.JPG",
    },
    {
      url: "/gallery/_AKH5985.JPG",
    },
    {
      url: "/gallery/_AKH5996.JPG",
    },
    {
      url: "/gallery/_AKH6006.JPG",
    },
    {
      url: "/gallery/_AKH6017.JPG",
    },
    {
      url: "/gallery/_AKH6092.JPG",
    },
    {
      url: "/gallery/_AKH6129.JPG",
    },
    {
      url: "/gallery/_AKH6164.JPG",
    },
    {
      url: "/gallery/_AKH6176.JPG",
    },
    {
      url: "/gallery/_AKH6242.JPG",
    },
    {
      url: "/gallery/_AKH6265.JPG",
    },
    {
      url: "/gallery/_AKH6274.JPG",
    },
    {
      url: "/gallery/_AKH6277.JPG",
    },
    {
      url: "/gallery/_AKH6293.JPG",
    },
    {
      url: "/gallery/_AKH6302.JPG",
    },
    {
      url: "/gallery/_AKH6416.JPG",
    },
    {
      url: "/gallery/_AKH6429.JPG",
    }
  ];

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
                {['Home', 'Tickets', 'Speakers'].map((link) => (
                  <li key={link}>
                    <a
                      href={`/evolve25#${link.toLowerCase()}`}
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
                  href="tel:+918129839102" 
                  className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-200 group"
                >
                  <Phone className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform duration-200" />
                  <span>+91 812 983 9102</span>
                </a>
                <a 
                  href="tel:+919995185190" 
                  className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-200 group"
                >
                  <Phone className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform duration-200" />
                  <span>+91 999 518 5190</span>
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
      </footer>
    </>
  );
};

export default Footer;

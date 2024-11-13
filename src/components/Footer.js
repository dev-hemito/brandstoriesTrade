'use client'
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Instagram, Twitter, Linkedin, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      url: "/speaker.jpg",
      title: "Keynote Session 2023",
      category: "Presentations"
    },
    {
      url: "/speaker.jpg",
      title: "Workshop Interaction",
      category: "Workshops"
    },
    {
      url: "/speaker.jpg",
      title: "Networking Event",
      category: "Networking"
    },
    {
      url: "/speaker.jpg",
      title: "Panel Discussion",
      category: "Panels"
    },
    {
      url: "/speaker.jpg",
      title: "Awards Ceremony",
      category: "Events"
    },
    {
      url: "/speaker.jpg",
      title: "Interactive Session",
      category: "Workshops"
    }
  ];

  const footerLinks = {
    company: [
      { label: "About Us", href: "#" },
      { label: "Our Team", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" }
    ],
    resources: [
      { label: "Blog", href: "#" },
      { label: "Research", href: "#" },
      { label: "Events", href: "#" },
      { label: "Webinars", href: "#" }
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Use", href: "#" },
      { label: "Cookie Policy", href: "#" }
    ]
  };

  return (
    <>
      {/* Gallery Section */}
      <section className="py-20 px-4 bg-white" id='gallery'>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-500 font-semibold tracking-wide uppercase text-sm">
              Event Highlights
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
              Gallery
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore moments from our previous events and get a glimpse of what to expect
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative cursor-pointer overflow-hidden rounded-xl"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-lg font-semibold">{image.title}</h3>
                      <p className="text-sm text-gray-300">{image.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative max-w-4xl w-full">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
                <p className="text-gray-300">{selectedImage.category}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white" id='contact'>
        {/* Main Footer */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold"><Image src='/main.png' alt='brandstories' width={200} height={200} /></h3>
              <p className="text-gray-400 text-sm">
                Join us for the most innovative trading conference, bringing together experts and enthusiasts from around the world.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Contact Us</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">contact@tradingconf.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm">123 Trading St, New York, NY 10001</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-gray-400">
                © {new Date().getFullYear()} Brand Stories. All rights reserved.
              </div>
              <div className="flex space-x-6">
                {footerLinks.legal.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
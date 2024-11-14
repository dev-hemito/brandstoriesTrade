'use client'
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Instagram, Twitter, Linkedin, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';
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
  const footerLinks = {
    company: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/#about' },
      { label: 'Contact', href: '/#contact' },
      { label: 'Tickets', href: '/#tickets' },
      { label: 'Speakers', href: '/#speakers' },
      { label: 'Itinerary', href: '/#itinerary' },
      { label: 'Gallery', href: '/#gallery' },
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
                  <Image
                    src={image.url}
                    width={300}
                    height={300}
                    alt={image.url}
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
                alt="gallery"
                className="w-full h-auto rounded-lg"
              />

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
              {/* <div className="flex space-x-4">
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
              </div> */}
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
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



            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Contact Us</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">brandstories21@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm">+91 812 983 9102, 999 518 5190</span>
                </div>
                <div className="flex ">

                  <span className="text-sm ">2/306, G2, 6th Floor, Technoplaza, Nr.Sarovaram BTH, Kannadikadu, Maradu PO, Cochin 682304</span>
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
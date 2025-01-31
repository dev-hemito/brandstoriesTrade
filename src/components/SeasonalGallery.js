import React, { useState } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

const SeasonalGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeSeason, setActiveSeason] = useState('season1');

  const galleryImages = {
    season1: [
      { url: "/gallery/_AKH4977.JPG" },
      { url: "/gallery/_AKH5003.JPG" },
      { url: "/gallery/_AKH5024.JPG" },
      { url: "/gallery/_AKH5052.JPG" },
      { url: "/gallery/_AKH5198.JPG" },
      { url: "/gallery/_AKH5346.JPG" },
      { url: "/gallery/_AKH5353.JPG" },
      { url: "/gallery/_AKH5369.JPG" },
      { url: "/gallery/_AKH5398.JPG" },
      { url: "/gallery/_AKH5528.JPG" },
      { url: "/gallery/_AKH5531.JPG" },
      { url: "/gallery/_AKH5537.JPG" },
  
    ],
    season2: [
      { url: "/gallery/s2/1.jpg" },
      { url: "/gallery/s2/2.jpg" },
      { url: "/gallery/s2/3.jpg" },
      { url: "/gallery/s2/4.jpg" },
      { url: "/gallery/s2/5.jpg" },
      { url: "/gallery/s2/8.jpg" },
      { url: "/gallery/s2/10.jpg" },
      { url: "/gallery/s2/13.jpg" },
      { url: "/gallery/s2/21.jpg" },
      { url: "/gallery/s2/30.jpg" },
      { url: "/gallery/s2/49.jpg" },
      { url: "/gallery/s2/50.jpg" },
      
    ]
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-gray-50" id="gallery">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-semibold tracking-wide uppercase text-sm">
            Captured Moments
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Event Gallery
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Experience the energy and insights from our previous events
          </p>
        </div>

        {/* Season Selection Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setActiveSeason('season1')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200
                ${activeSeason === 'season1' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'}`}
            >
              Kerala Traders Summit 2024
            </button>
            <button
              onClick={() => setActiveSeason('season2')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200
                ${activeSeason === 'season2' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'}`}
            >
             Traders & Investors Conclave 2025
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages[activeSeason].map((image, index) => (
            <div
              key={index}
              className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={image.url}
                  alt={`Gallery image from ${activeSeason}`}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3 bg-yellow-400/70 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                  {activeSeason === 'season1' ? 'Kerala Traders Summit 2024' : 'Traders & Investors Conclave 2025'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-5xl w-full">
            <img
              src={selectedImage.url}
              alt="Gallery preview"
              className="w-full h-auto rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default SeasonalGallery;
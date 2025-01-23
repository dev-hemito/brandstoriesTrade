'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';

const EventGallery = () => {
  const images = [
    { id: 1, url: '/api/placeholder/400/300', title: 'Live Trading Session' },
    { id: 2, url: '/api/placeholder/400/300', title: 'Panel Discussion' },
    { id: 3, url: '/api/placeholder/400/300', title: 'Networking Session' },
    { id: 4, url: '/api/placeholder/400/300', title: 'Expert Talk' },
    { id: 5, url: '/api/placeholder/400/300', title: 'Q&A Session' },
    { id: 6, url: '/api/placeholder/400/300', title: 'Audience Interaction' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Event Gallery</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the energy and insights from our previous events
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {images.map((image) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-black rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover transform transition-transform group-hover:scale-110 group-hover:opacity-75"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-center text-white">
                  <Maximize2 className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-lg font-medium">{image.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            View More Photos
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default EventGallery;
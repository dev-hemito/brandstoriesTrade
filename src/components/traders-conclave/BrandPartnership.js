import React from 'react';
import { motion } from 'framer-motion';

const BrandPartnership = () => {
  const brandLogos = [
    '/api/placeholder/150/50',
    '/api/placeholder/150/50',
    '/api/placeholder/150/50',
    '/api/placeholder/150/50',
    '/api/placeholder/150/50',
    '/api/placeholder/150/50',
    '/api/placeholder/150/50',
    '/api/placeholder/150/50'
  ];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Our Partners</h2>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
        
        <motion.div
          animate={{
            x: [0, -1920],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex gap-12 py-8"
        >
          {[...brandLogos, ...brandLogos].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[150px] h-[50px] bg-gray-100 rounded-lg overflow-hidden"
            >
              <img
                src={logo}
                alt={`Partner ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BrandPartnership;
import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const contentVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.8 } }
  };

  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative h-screen bg-gradient-to-r from-green-600 to-blue-600"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center">
          <motion.div 
            variants={contentVariants}
            className="max-w-4xl"
          >
            {/* Logo */}
            <div className="mb-8">
              <img 
                src="/api/placeholder/200/80"
                alt="Money Control Logo" 
                className="h-16 md:h-20"
              />
            </div>

            {/* Main Content */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              KERALA TRADERS & INVESTORS CONCLAVE 2025
            </h1>
            <div className="space-y-4 mb-8">
              <p className="text-xl md:text-2xl text-white">January 8-9, 2025</p>
              <p className="text-lg text-gray-200">
                A premier event for trading professionals and market experts
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors text-lg font-semibold">
                Register Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-green-600 transition-colors text-lg font-semibold">
                View Schedule
              </button>
            </div>

            {/* Animation Elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                transition: { duration: 2, repeat: Infinity }
              }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
            
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Optional: Background Pattern/Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
      </div>
    </motion.section>
  );
};

export default Hero;
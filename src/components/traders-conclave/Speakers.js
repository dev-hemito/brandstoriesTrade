'use client'
import React from 'react';
import { motion } from 'framer-motion';

const Speakers = ({ speakers }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
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
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Expert Insights: Meet Our Speakers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn from Industry experts who are shaping the future of trading and investment
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {speakers.map((speaker, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex justify-center space-x-4">
                        <button className="p-2 bg-white rounded-full hover:bg-green-500 hover:text-white transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {speaker.name}
                  </h3>
                  {speaker.role && (
                    <p className="text-green-600 font-medium mb-1">
                      {speaker.role}
                    </p>
                  )}
                  <p className="text-gray-600">
                    {speaker.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Speakers;
'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Users2, LineChart, Briefcase, BarChart4, Target, CoinsIcon } from 'lucide-react';

const typeIcons = {
  'PROFESSIONAL FUND MANAGERS': Users2,
  'STOCK MARKETS': LineChart,
  'FULL TIME AND PART-TIME TRADERS': Briefcase,
  'INVESTMENT ANALYSIS': BarChart4,
  'MARKET ENTHUSIASTS': Target,
  'COMMODITY TRADERS': CoinsIcon
};

const WhoShouldAttend = ({ types }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Who Should Attend?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our community of trading professionals and market experts
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {types.map((type, index) => {
            const Icon = typeIcons[type.title];
            
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-green-500 to-blue-500" />
                <div className="p-6 pl-8">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-green-100 p-3 mr-4">
                      {Icon && <Icon className="w-6 h-6 text-green-600" />}
                    </div>
                    <span className="text-2xl font-bold text-gray-700">0{index + 1}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    {type.title}
                  </h3>
                  
                  <p className="text-gray-600">
                    {type.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhoShouldAttend;
'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, MessageSquare, Network, GlassWater, Gift 
} from 'lucide-react';

const featureIcons = {
  'LIVE TRADING SESSIONS': TrendingUp,
  'POWERFUL SPEAKERS': Users,
  'PANEL DISCUSSIONS': MessageSquare,
  'NETWORK WITH TOP MENTORS': Network,
  'GALA DINNER': GlassWater,
  'GIFT & GOODIES': Gift,
};

const KeyFeatures = ({ features }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Key Features
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Experience a comprehensive trading and investment learning environment
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = featureIcons[feature.title];
              
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      {Icon && <Icon className="w-6 h-6 text-green-600" />}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button className="text-green-600 hover:text-green-700 font-medium flex items-center">
                      Learn more
                      <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default KeyFeatures;
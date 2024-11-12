'use client'
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Brain, ChartBar, LineChart, Coins } from 'lucide-react';

const AttendeesShowcase = () => {
  const attendees = [
    {
      title: "Professional Fund Managers",
      icon: <Users className="w-8 h-8" />,
      description: "Expert portfolio managers seeking advanced trading insights"
    },
    {
      title: "Full Time and Part-time Traders",
      icon: <TrendingUp className="w-8 h-8" />,
      description: "Active traders looking to enhance their trading strategies"
    },
    {
      title: "Market Enthusiasts",
      icon: <ChartBar className="w-8 h-8" />,
      description: "Passionate individuals diving deep into market dynamics"
    },
    {
      title: "Algo Traders",
      icon: <Brain className="w-8 h-8" />,
      description: "Algorithmic trading specialists and developers"
    },
    {
      title: "Investment Analysts",
      icon: <LineChart className="w-8 h-8" />,
      description: "Research professionals seeking market insights"
    },
    {
      title: "Commodity Traders",
      icon: <Coins className="w-8 h-8" />,
      description: "Specialists in commodities and futures markets"
    }
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Who Should Attend?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attendees.map((attendee, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                  {attendee.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">{attendee.title}</h3>
              </div>
              <p className="text-gray-400">{attendee.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendeesShowcase;
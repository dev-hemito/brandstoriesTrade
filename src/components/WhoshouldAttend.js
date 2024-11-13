'use client'
import React from 'react';
import { Users, TrendingUp, Brain, ChartBar, LineChart, Coins } from 'lucide-react';

const AttendeesShowcase = () => {
  const attendees = [
    {
      title: "Professional Fund Managers",
      icon: <Users className="w-6 h-6" />,
      description: "Expert portfolio managers seeking advanced trading insights"
    },
    {
      title: "Full Time and Part-time Traders",
      icon: <TrendingUp className="w-6 h-6" />,
      description: "Active traders looking to enhance their trading strategies"
    },
    {
      title: "Market Enthusiasts",
      icon: <ChartBar className="w-6 h-6" />,
      description: "Passionate individuals diving deep into market dynamics"
    },
    {
      title: "Algo Traders",
      icon: <Brain className="w-6 h-6" />,
      description: "Algorithmic trading specialists and developers"
    },
    {
      title: "Investment Analysts",
      icon: <LineChart className="w-6 h-6" />,
      description: "Research professionals seeking market insights"
    },
    {
      title: "Commodity Traders",
      icon: <Coins className="w-6 h-6" />,
      description: "Specialists in commodities and futures markets"
    }
  ];

  return (
    <div className=" px-4 ">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Who Should Attend?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our community of trading professionals and market experts
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attendees.map((attendee, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Decorative gradient blob */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    {attendee.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {attendee.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {attendee.description}
                    </p>
                  </div>
                </div>

                {/* Hover state line decoration */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendeesShowcase;
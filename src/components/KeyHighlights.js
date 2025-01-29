'use client'
import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Users,
  Mic2,
  Users2,
  Gift,
  GlassWater,
  ChevronDown
} from 'lucide-react';


const FeatureCard = ({ feature, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = feature.icon;

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`}
      />
      <div className="relative backdrop-blur-lg rounded-2xl p-4 md:p-8 border border-gray-700/50 transform transition-all duration-500 hover:scale-105 hover:border-gray-500/50">
        <div className="relative z-10">
          <div className={`p-4 md:p-6 rounded-full bg-gradient-to-br ${feature.color} transform transition-transform group-hover:scale-110 group-hover:rotate-3`}>
            <Icon size={24} className="md:w-8 md:h-8 text-white transform transition-transform group-hover:scale-110" />
          </div>
          <h3 className="mt-4 md:mt-6 text-xl md:text-2xl font-bold text-black ">
            {feature.title}
          </h3>
          <p className="mt-2 md:mt-4 text-sm md:text-base text-blac">
            {feature.description}
          </p>

          {isHovered && (
            <div className="absolute bottom-4 right-4 transition-opacity">
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 rounded-full bg-white animate-bounce"
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FeatureSection = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "Build Your Trading Network",
      description: "Expand your professional circle by connecting with seasoned traders, investors, and market enthusiasts. Forge valuable relationships that can open doors to collaborative opportunities and shared insights.",
      color: "from-blue-600 to-cyan-400"
    },
    {
      icon: Users,
      title: "Masterclasses with Industry Experts",
      description: "Learn from the best in the business through exclusive masterclasses. Gain actionable strategies, tips, and techniques directly from top traders who have mastered the art of navigating volatile markets.",
      color: "from-purple-600 to-pink-400"
    },
    {
      icon: Mic2,
      title: "Real-Time Market Analysis & Insights",
      description: "Stay ahead of the curve with live market analysis and expert insights. Understand market trends, identify opportunities, and make informed decisions with real-time guidance from professionals.",
      color: "from-amber-500 to-orange-400"
    },
    {
      icon: Users2,
      title: "Access to Career Opportunities in Trading",
      description: "Discover exciting career paths in trading and investment. Network with industry leaders and explore opportunities to kickstart or advance your career in the financial markets.",
      color: "from-green-500 to-emerald-400"
    },
  ];

  return (
    <div className="  overflow-hidden">

      <div className=" z-10">
        <div className="mt-32 flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center">
            <span className="block transform transition-transform hover:scale-110 hover:-rotate-2">
              <span className="bg-gradient-to-r from-amber-500 via-amber-200 to-amber-500 text-transparent bg-clip-text animate-gradient">
                Key
              </span>
            </span>
            <span className="block mt-2 transform transition-transform hover:scale-110 hover:rotate-2">
              <span className="bg-gradient-to-r from-amber-500 via-amber-200 to-amber-500 text-transparent bg-clip-text animate-gradient">
                Features
              </span>
            </span>
          </h1>
       
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientFlow 8s ease infinite;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default FeatureSection;
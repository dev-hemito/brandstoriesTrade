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

const GridBackground = () => {
  const [mounted, setMounted] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 grid grid-cols-12 grid-rows-12 opacity-20">
      {[...Array(144)].map((_, i) => (
        <div
          key={i}
          className="border border-white/10 backdrop-blur-sm transition-all duration-300"
          style={{
            transform: `scale(${1 + Math.sin(scrollPosition * 0.002 + i * 0.1) * 0.2})`,
            opacity: 0.1 + Math.sin(scrollPosition * 0.002 + i * 0.1) * 0.1
          }}
        />
      ))}
    </div>
  );
};


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
        className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl`}
      />
      <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 transform transition-all duration-500 hover:scale-105 hover:border-white/20">
        <div className="relative z-10">
          <div className={`p-6 rounded-full bg-gradient-to-br ${feature.color} transform transition-transform group-hover:scale-110 group-hover:rotate-3`}>
            <Icon size={32} className="text-white transform transition-transform group-hover:scale-110" />
          </div>
          <h3 className="mt-6 text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-400">
            {feature.title}
          </h3>
          <p className="mt-4 text-gray-400 group-hover:text-white transition-colors">
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
      title: "Live Trading Sessions",
      description: "Experience real-time market insights with professional traders guiding you through live market conditions",
      color: "from-blue-600 to-cyan-400"
    },
    {
      icon: Users,
      title: "Network with Top Mentors",
      description: "Connect directly with industry leaders who've achieved remarkable success in trading",
      color: "from-purple-600 to-pink-400"
    },
    {
      icon: Mic2,
      title: "Powerful Speakers",
      description: "Gain insights from thought leaders shaping the future of trading and investment",
      color: "from-amber-500 to-orange-400"
    },
    {
      icon: Users2,
      title: "Panel Discussions",
      description: "Engage in dynamic conversations addressing current market trends and opportunities",
      color: "from-green-500 to-emerald-400"
    },
    {
      icon: Gift,
      title: "Gift & Goodies",
      description: "Take home exclusive trading tools and premium resources to enhance your journey",
      color: "from-red-500 to-rose-400"
    },
    {
      icon: GlassWater,
      title: "Gala Dinner",
      description: "Network in luxury while building lasting connections with industry professionals",
      color: "from-indigo-600 to-blue-400"
    }
  ];

  return (
    <div className="bg-black min-h-screen relative overflow-hidden">


      <div className="relative z-10">
        <div className="h-screen flex flex-col items-center justify-center px-4">
          <h1 className="text-7xl md:text-9xl font-bold text-center">
            <span className="block transform transition-transform hover:scale-110 hover:-rotate-2">
              <span className="bg-gradient-to-r from-white via-blue-400 to-purple-500 text-transparent bg-clip-text">
                Key
              </span>
            </span>
            <span className="block mt-2 transform transition-transform hover:scale-110 hover:rotate-2">
              <span className="bg-gradient-to-r from-purple-500 via-blue-400 to-white text-transparent bg-clip-text">
                Features
              </span>
            </span>
          </h1>
          <div className="mt-12 animate-bounce">
            <ChevronDown size={48} className="text-white/50" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`

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
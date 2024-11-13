'use client'
import React from 'react';
import { Twitter, Linkedin, Globe } from 'lucide-react';

const SpeakersShowcase = () => {
  const speakers = [
    {
      name: "Sarah Anderson",
      role: "Chief Investment Strategist",
      company: "Global Markets Institute",
      image: "/speaker.jpg",
      expertise: "Market Analysis & Strategy",
      description: "15+ years experience in global market analysis and portfolio management",
      social: {
        twitter: "#",
        linkedin: "#",
        website: "#"
      }
    },
    {
      name: "Michael Chen",
      role: "Quantitative Trading Expert",
      company: "QuantEdge Capital",
      image: "/speaker.jpg",
      expertise: "Algorithmic Trading",
      description: "Pioneer in developing AI-driven trading strategies and risk management systems",
      social: {
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      name: "Dr. Elena Rodriguez",
      role: "Research Director",
      company: "Financial Research Labs",
      image: "/speaker.jpg",
      expertise: "Behavioral Finance",
      description: "Leading researcher in market psychology and behavioral economics",
      social: {
        linkedin: "#",
        website: "#"
      }
    },
    {
      name: "James Williams",
      role: "Senior Portfolio Manager",
      company: "Apex Asset Management",
      image: "/speaker.jpg",
      expertise: "Portfolio Optimization",
      description: "Specialist in alternative investments and portfolio diversification",
      social: {
        twitter: "#",
        linkedin: "#"
      }
    }
  ];

  return (
    <div className="py-20 px-4 bg-white" id='speakers'>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-semibold tracking-wide uppercase text-sm">
            Expert Insights
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
            Meet Our Speakers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn from industry leaders and experts who are shaping the future of trading and investment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {speakers.map((speaker, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Image Container */}
              <div className="relative mb-4 overflow-hidden rounded-2xl aspect-square">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                />
                {/* Social Links - Show on Hover */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {speaker.social.twitter && (
                    <a href={speaker.social.twitter} className="p-2 bg-white/90 rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-200">
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {speaker.social.linkedin && (
                    <a href={speaker.social.linkedin} className="p-2 bg-white/90 rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-200">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {speaker.social.website && (
                    <a href={speaker.social.website} className="p-2 bg-white/90 rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-200">
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Speaker Info */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">{speaker.name}</h3>
                <p className="text-blue-600 font-medium text-sm">{speaker.role}</p>
                <p className="text-gray-600 text-sm">{speaker.company}</p>
                <div className="pt-2">
                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                    {speaker.expertise}
                  </span>
                </div>
                <p className="text-gray-500 text-sm pt-2">{speaker.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      {/* <div className="mt-16 text-center">
        <a 
          href="#"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
        >
          View Full Schedule
        </a>
      </div> */}
    </div>
  );
};

export default SpeakersShowcase;
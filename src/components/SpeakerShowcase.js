'use client'
import React from 'react';
import { Twitter, Linkedin, Globe } from 'lucide-react';
import Image from 'next/image';

const SpeakersShowcase = () => {
  const speakers = [



    {
      name: "Sunil Mathai",
      role: "Founder",
      company: "TradeTalks",
      image: "/malabarSpeakers/sunil.jpg"
    },



    {
      name: "Siyad Ellickal",
      role: "Founder & CEO",
      company: "Bizmate Trading",
      image: "/malabarSpeakers/siyad.jpg"
    },
    {
      name: "Saketh Ramakrishna",
      role: "Co-founder & CIO",
      company: "Optionables Fintech LLP",
      image: "/malabarSpeakers/saketh.jpg"
    },
    {
      name: "Shijumon Antony",
      role: "Founder & CEO",
      company: "NSEIT",
      image: "/malabarSpeakers/shijumon.jpg"
    },
    {
      name: "Sharique Samsudheen",
      role: "Founder & CEO",
      company: "Marketfeed",
      image: "/malabarSpeakers/sharique.jpg"
    },




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
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  width={500}
                  height={500}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                />
                {/* Social Links - Show on Hover */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                </div>
              </div>

              {/* Speaker Info */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">{speaker.name}</h3>
                <p className="text-blue-600 font-medium text-sm">{speaker.role}</p>
                <p className="text-gray-600 text-sm">{speaker.company}</p>

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
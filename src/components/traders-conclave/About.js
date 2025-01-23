'use client'
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div {...fadeIn} className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            About the Event
          </h2>
          
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <motion.p 
              {...fadeIn}
              className="text-lg leading-relaxed"
            >
              In a first-of-its-kind initiative, stage has been set for the two-day long 
              Kerala Traders and Investors Conclave. Brand Stories, the organizer of 
              the event, aims to create investment-friendly communities 
              comprising regular stock traders, beginners as well as long-term 
              investors.
            </motion.p>

            <motion.p 
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="text-lg leading-relaxed"
            >
              The conclave will encompass live training, special classes, investment 
              mentoring sessions, seminars, discussions and training strategies. It 
              will also serve avenues for interactions with mentors from outside and 
              within Kerala, from whom stock enthusiasts as well as beginners can 
              have first-hand learning experience on major trading strategies.
            </motion.p>

            <motion.div 
              {...fadeIn}
              transition={{ delay: 0.3 }}
              className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded"
            >
              <p className="text-blue-700 font-medium">
                The event must be viewed as a prime opportunity for potential 
                investors to master the art of right investments from stock veterans 
                and experts.
              </p>
            </motion.div>

            {/* Key Highlights */}
            <motion.div 
              {...fadeIn}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
            >
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-700 mb-2">
                  For Beginners
                </h3>
                <p>Learn fundamentals and best practices from industry experts</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">
                  For Professionals
                </h3>
                <p>Advanced strategies and networking opportunities</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
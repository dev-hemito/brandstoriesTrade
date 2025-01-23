'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User } from 'lucide-react';

const Schedule = ({ day1, day2 }) => {
  const [activeDay, setActiveDay] = useState('day1');

  const ScheduleItem = ({ item }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-md p-6 mb-4"
    >
      <div className="flex flex-wrap gap-4 items-start justify-between">
        <div className="flex items-center space-x-3 text-blue-600">
          <Clock className="w-5 h-5" />
          <span className="font-medium">{item.time}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-500">
          <Calendar className="w-5 h-5" />
          <span>{item.duration}</span>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-800">{item.session}</h3>
        {item.speaker && (
          <div className="flex items-center mt-2 text-gray-600">
            <User className="w-4 h-4 mr-2" />
            <span>{item.speaker}</span>
          </div>
        )}
        {item.topic && (
          <p className="mt-2 text-gray-600 italic">{item.topic}</p>
        )}
      </div>
    </motion.div>
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Conference Schedule</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Two days packed with knowledge sharing and networking opportunities
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Day Selection Tabs */}
          <div className="flex mb-8 bg-white rounded-lg shadow-md p-2">
            <button 
              onClick={() => setActiveDay('day1')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                activeDay === 'day1' 
                  ? 'bg-green-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Day 1 - January 8th
            </button>
            <button 
              onClick={() => setActiveDay('day2')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                activeDay === 'day2' 
                  ? 'bg-green-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Day 2 - January 9th
            </button>
          </div>

          {/* Schedule Content */}
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {activeDay === 'day1' ? (
                <div className="space-y-4">
                  {day1.map((item, index) => (
                    <ScheduleItem key={index} item={item} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {day2.map((item, index) => (
                    <ScheduleItem key={index} item={item} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
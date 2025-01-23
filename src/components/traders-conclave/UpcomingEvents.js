'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Calendar } from 'lucide-react';

const UpcomingEvents = ({ events }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join us at our upcoming events across different locations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={event.image}
                  alt={event.location}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-500 text-white px-4 py-2 rounded-full font-medium">
                    {event.date}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="text-lg font-medium">{event.location}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-2" />
                    <span>{event.description}</span>
                  </div>
                </div>

                <button className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Save the Date
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
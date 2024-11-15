'use client'
import React, { useState } from 'react';
import { Clock, Coffee, Presentation, Users, MessageSquare, Award } from 'lucide-react';

const EventItinerary = () => {
  const [selectedDay, setSelectedDay] = useState('day1');

  const schedule = {
    day1: [
      {
        time: "09:00 AM",
        title: "Registration & Welcome Coffee",
        description: "Check-in and networking opportunity",
        duration: "60 min",
        icon: <Coffee className="w-5 h-5" />,
        type: "break"
      },
      {
        time: "10:00 AM",
        title: "Opening Keynote: Future of Trading",
        description: "Dr. Elena Rodriguez discusses emerging market trends",
        duration: "90 min",
        icon: <Presentation className="w-5 h-5" />,
        type: "keynote"
      },
      {
        time: "11:45 AM",
        title: "Panel Discussion: Market Dynamics",
        description: "Expert panel on global market influences",
        duration: "75 min",
        icon: <Users className="w-5 h-5" />,
        type: "panel"
      },
      {
        time: "01:00 PM",
        title: "Networking Lunch",
        description: "Catered lunch and networking session",
        duration: "60 min",
        icon: <Coffee className="w-5 h-5" />,
        type: "break"
      },
      {
        time: "02:00 PM",
        title: "Workshop: Trading Strategies",
        description: "Interactive session on advanced trading techniques",
        duration: "120 min",
        icon: <MessageSquare className="w-5 h-5" />,
        type: "workshop"
      },
      {
        time: "04:30 PM",
        title: "Closing Remarks & Awards",
        description: "Day 1 summary and excellence awards",
        duration: "45 min",
        icon: <Award className="w-5 h-5" />,
        type: "closing"
      }
    ],
    day2: [
      {
        time: "09:30 AM",
        title: "Day 2 Opening",
        description: "Brief overview of day's agenda",
        duration: "30 min",
        icon: <Coffee className="w-5 h-5" />,
        type: "break"
      },
      {
        time: "10:00 AM",
        title: "Algorithmic Trading Masterclass",
        description: "Deep dive into automated trading systems",
        duration: "120 min",
        icon: <Presentation className="w-5 h-5" />,
        type: "keynote"
      }
      // Add more day 2 events as needed
    ]
  };

  const getTypeStyles = (type) => {
    const baseStyles = "absolute top-0 left-0 w-1 h-full rounded-l-lg";
    switch(type) {
      case 'keynote':
        return `${baseStyles} bg-blue-500`;
      case 'panel':
        return `${baseStyles} bg-purple-500`;
      case 'workshop':
        return `${baseStyles} bg-green-500`;
      case 'break':
        return `${baseStyles} bg-orange-500`;
      case 'closing':
        return `${baseStyles} bg-red-500`;
      default:
        return `${baseStyles} bg-gray-500`;
    }
  };

  return (
    <div className="py-20 px-4 " id='itinerary'>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-amber-500 font-semibold tracking-wide uppercase text-sm">
            Event Schedule
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
            Conference Itinerary
          </h2>
          <p className="text-gray-600">
            Explore our carefully curated schedule of keynotes, workshops, and networking sessions
          </p>
        </div>

        {/* Day Selection */}
        <div className="flex justify-center gap-4 mb-12">
          {['day1', 'day2'].map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedDay === day
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Day {day.slice(-1)}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {schedule[selectedDay].map((event, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 pl-8"
            >
              {/* Timeline bar */}
              <div className={getTypeStyles(event.type)} />

              <div className="flex items-start gap-4">
                {/* Time Column */}
                <div className="flex-shrink-0 w-32">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">{event.time}</span>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    {event.duration}
                  </div>
                </div>

                {/* Content Column */}
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                      {event.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {event.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
};

export default EventItinerary;
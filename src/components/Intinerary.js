'use client'
import React, { useState } from 'react';
import { Clock, Coffee, Presentation, Users, MessageSquare, Award } from 'lucide-react';

const EventItinerary = () => {
  const [selectedDay, setSelectedDay] = useState('day1');

  const schedule = {
    day1: [
      {
        time: "08:00 AM - 10:00 AM",
        title: "Registration ",
        description: "",
        duration: "90 min",
        icon: '',
        type: "break"
      },
      {
        time: "10:00 AM - 10:30 AM",
        title: "Lightening the Lamp & Keynote Session ",
        description: "",
        duration: "30 min",
        icon: '',
        type: "keynote"
      },
      {
        time: "10:30 AM - 11:00 AM",
        title: "Welcome Speach",
        description: "Speaker: Mr. Sami K Haridas",
        duration: "30 min",
        icon: '',
        type: "panel"
      },
      {
        time: "11:00 AM - 12:00 PM",
        title: "Live Trading Session",
        description: "Speaker: Mr. Shijimon",
        duration: "60 min",
        icon: '',
        type: "break"
      },
      {
        time: "12:00 PM - 12:40 PM",
        title: "Strategy to Trading Stock option with 82% Accuracy, Algo Trading",
        description: "Speaker: Mr. Kushal Jain",
        duration: "40 min",
        icon: '',
        type: "panel"
      },
      {
        time: "12:40 PM - 01:20 PM",
        title: "Momentum Investing",
        description: "Speaker: Mr. Hariprasad",
        duration: "40 min",
        icon: '',
        type: "closing"
      },
      {
        time: "01:20 PM - 03:00 PM",
        title: "Lunch Break",
        description: "",
        duration: "",
        icon: '',
        type: "break"
      },
      {
        time: "03:00 PM - 03:20 PM",
        title: "Sponsor Session",
        description: "Title Sponsor",
        duration: "20 min",
        icon: '',
        type: "panel"
      },
          
      {
        time: "03:20 PM - 04:00 PM",
        title: "Oppurtunities & Challenges in Emerging Market Investing",
        description: "Speaker: Uthara Ramakrishnan",
        duration: "40 min",
        icon: '',
        type: "break"
      },
      {
        time: "04:00 PM - 05:00 PM",
        title: "Decoding the Indian Stock Market: Key Strategies for Sustainable Growth",
        description: "Panel Discussion",
        duration: "60 min",
        icon: '',
        type: "keynote"
      },
      {
        time: "05:00 PM - 05:20 PM",
        title: "Sponsor Session",
        description: "Powered by Sponsor",
        duration: "20 min",
        icon: '',
        type: "panel"
      },
      {
        time: "05:20 PM - 06:00 PM",
        title: "Navigating Global Economic Trends: Impact on Indian Markets",
        description: "Speaker: Mr. Milan Parik",
        duration: "40 min",
        icon: '',
        type: "break"
      },
      {
        time: "",
        title: "End of Day 1 with Cocktail Gala Dinner",
        description: "Guests, Mentors and VIP Pass Holders",
        duration: "",
        icon: '',
        type: "closing"
      }
    ],
    day2: [
      {
        time: "10:00 AM - 10:40 AM",
        title: "Options and Futures: Strategies for Hedging and Speculative Gains",
        description: "Speaker: Mr. Praful Kulkarni",
        duration: "40 min",
        icon: '',
        type: "break"
      },
      {
        time: "10:40 AM - 10:55 AM",
        title: "Sponsor Session",
        description: "Co-powered by",
        duration: "15 min",
        icon: '',
        type: "keynote"
      },
      {
        time: "11:00 AM - 11:30 AM",
        title: "Speaker Session",
        description: "Speaker: Mr. Nikhil Gopalakrishnan",
        duration: "30 min",
        icon: '',
        type: "panel"
      },
      {
        time: "11:30 AM - 12:00 PM",
        title: "Options adjustment in real time applications",
        description: "Speaker: Mr. Santhosh Pasi",
        duration: "30 min",
        icon: '',
        type: "break"
      },
      {
        time: "12:00 PM - 12:40 PM",
        title: "Speaker Session",
        description: "Speaker: Mr. Sunil Mathai",
        duration: "40 min",
        icon: '',
        type: "panel"
      },
      {
        time: "12:40 PM - 01:00 PM",
        title: "Sponsor Session",
        description: "Tradejini Financial Services",
        duration: "20 min",
        icon: '',
        type: "closing"
      },
      {
        time: "01:00 PM - 02:30 PM",
        title: "Lunch Break",
        description: "",
        duration: "",
        icon: '',
        type: "break"
      },
      {
        time: "02:30 PM - 03:30 PM",
        title: "Panel Session",
        description: "Sponsors and Speakers",
        duration: "60 min",
        icon: '',
        type: "panel"
      },
          
      {
        time: "03:30 PM - 04:00 PM",
        title: "Dividend Investing: Building Wealth with consistent Returns",
        description: "Speaker: Mr. Akshay Agarwal",
        duration: "30 min",
        icon: '',
        type: "break"
      },
      {
        time: "04:00 PM - 04:30 PM",
        title: "Speaker Session",
        description: "",
        duration: "30 min",
        icon: '',
        type: "keynote"
      },
      {
        time: "04:30 PM - 04:45 PM",
        title: "Windup with Vote of Thanks",
        description: "Speaker: Mr. Sujeesh K.S",
        duration: "15 min",
        icon: '',
        type: "panel"
      },
      {
        time: "",
        title: "End of Day 2 ",
        description: "",
        duration: "",
        icon: '',
        type: "closing"
      }
    ],
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
                <div className="flex-shrink-0 ">
                  <div className="flex items-center gap-2 text-gray-600">
                    {event.time?<><Clock className="w-4 h-4" /></>:''}
                    <span className="text-sm font-medium">{event.time}</span>
                  </div>
                  <div className="mt-1 flex justify-center text-xs text-gray-500">
                    {event.duration}
                  </div>
                </div>

                {/* Content Column */}
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-1">
                   
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
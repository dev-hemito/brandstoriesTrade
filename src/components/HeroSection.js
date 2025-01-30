import React, { useState } from 'react';
import { Play, X, Calendar, MapPin } from 'lucide-react';

const HeroSection = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="relative md:overflow-hidden  bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
      {/* Background with improved overlay */}
     

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center py-20">
        <div className="container mx-auto px-6 pt-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-4">
              {/* Sponsor Logo */}
              <div className="inline-block md:bg-white/10 md:p-4 pt-4 rounded-lg backdrop-blur-sm">
                <span className="text-sm font-medium mb-2 block text-blue-200">Title Sponsor</span>
                <img
                  src="/firstock.jpeg"
                  alt="Firstock Logo"
                  className="h-12 object-cover rounded"
                />
              </div>

              {/* Title with Animation */}
              <div className="space-y-4">
                <h2 className="text-blue-400 text-xl font-medium tracking-wide">
                  The Ultimate Trading Experience
                </h2>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Malabar Biggest
                  <span className="block bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                    Traders Conclave
                  </span>
                </h1>
              </div>

              {/* Event Details */}
              <div className="flex flex-wrap gap-8 text-lg">
                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-50">Feb 23, 2025</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-50">Calicut Trade Centre, Kerala</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xl text-blue-100 max-w-xl leading-relaxed">
                Join Kerala's premier trading summit for expert insights, strategies, and networking opportunities.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-6">
                <button
                  onClick={() => setShowVideo(true)}
                  className="group flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Play className="w-5 h-5" />
                  Watch Promo
                </button>
                <a
                  href="#tickets"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/30"
                >
                  Book Tickets
                </a>
              </div>
            </div>

            {/* Right Content - Featured Image/Stats */}
            <div className="relative mt-12 lg:mt-0">
              {/* Floating Stats Cards */}
              <div className="absolute z-10 md:-left-8 md:-top-10 -left-5 -top-14 bg-white/10 backdrop-blur-xl rounded-2xl p-8 transform hover:-translate-y-2 transition-transform duration-300 border border-white/20">
                <h3 className="text-5xl font-bold bg-gradient-to-r text-yellow-400 text-transparent bg-clip-text mb-2">1000+</h3>
                <p className="text-blue-100">Expected Attendees</p>
              </div>

              <div className="absolute z-10 md:-right-3 md:-bottom-10 -bottom-20 -right-5 bg-white/10 backdrop-blur-xl rounded-2xl p-8 transform hover:-translate-y-2 transition-transform duration-300 border border-white/20">
                <h3 className="text-5xl font-bold bg-gradient-to-r text-yellow-400 text-transparent bg-clip-text mb-2">10+</h3>
                <p className="text-blue-100">Expert Speakers</p>
              </div>

              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                <img
                  src="/back.jpg"
                  alt="Event Preview"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-xl">
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-6 right-6 bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
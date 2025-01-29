import React, { useState } from 'react';
import { Play, X, Calendar, MapPin } from 'lucide-react';

const HeroSection = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="relative bg-black text-white">
      {/* Background Video/Image with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="/api/placeholder/1920/1080" 
          alt="Background" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-4">
              {/* Sponsor Logo */}
              <div className="inline-block">
                <span className='text-sm'>Title Sponsor</span>
                <img 
                  src="/firstock.jpeg" 
                  alt="Firstock Logo" 
                  className="h-12 object-cover rounded"
                />
              </div>

              {/* Title with Animation */}
              <div className="space-y-4">
                <h2 className="text-amber-500 text-xl md:text-2xl font-medium">
                  The Ultimate Trading Experience
                </h2>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Malabar Biggest
                  <span className="block text-amber-500">
                    Traders Conclave
                  </span>
                </h1>
              </div>

              {/* Event Details */}
              <div className="flex flex-wrap gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-500" />
                  <span>March 15, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-500" />
                  <span>Calicut, Kerala</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xl text-gray-300 max-w-xl">
                Join Kerala's premier trading summit for expert insights, strategies, and networking opportunities.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setShowVideo(true)}
                  className="group flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-4 rounded-full transition-all duration-300"
                >
                  <Play className="w-5 h-5" />
                  Watch Promo
                </button>
                <a 
                  href="#tickets" 
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full backdrop-blur-sm transition-all duration-300"
                >
                  Book Tickets
                </a>
              </div>
            </div>

            {/* Right Content - Featured Image/Stats */}
            <div className="relative  lg:block">
              {/* Floating Stats Cards */}
              <div className="absolute md:-left-20 -left-3 z-10 -top-10 md:top-1/6 bg-white/10 backdrop-blur-3xl rounded-2xl p-6 w-64 transform hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-4xl font-bold text-amber-500 mb-2">500+</h3>
                <p className="text-gray-300">Expected Attendees</p>
              </div>
              
              <div className="absolute md:-right-5 -right-3 z-10 md:bottom-10 -bottom-10 bg-white/10 backdrop-blur-lg rounded-2xl p-6 w-64 transform hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-4xl font-bold text-amber-500 mb-2">10+</h3>
                <p className="text-gray-300">Expert Speakers</p>
              </div>

              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <img 
                  src="/back.jpg" 
                  alt="Event Preview" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button 
            onClick={() => setShowVideo(false)}
            className="absolute top-6 right-6 bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="w-full max-w-6xl aspect-video">
            <iframe
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1"
              className="w-full h-full rounded-2xl"
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
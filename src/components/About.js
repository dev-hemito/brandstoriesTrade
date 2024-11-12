import React from 'react';

const AboutSection = () => {
  return (
    <div className="w-ful text-white py-16 md:px-5 mx-auto">
      <div className="container mx-auto px-4">
        <h2 className="text-orange-400 text-center text-4xl mb-8 font-serif">About</h2>
        
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Video Preview Section */}
          <div className="w-full lg:w-1/2 aspect-video bg-gray-800 rounded-lg overflow-hidden">
            <video 
              className="w-full h-full object-cover"
              poster="/your-video-thumbnail.jpg"
              controls
            >
              <source src="/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 space-y-4 text-justify">
            <p className="text-gray-200 leading-relaxed">
              In a first-of-its-kind initiative, stage has been set for the 
              two-day long Kerala Traders and Investors Conclave.
            </p>
            
            <p className="text-gray-200 leading-relaxed">
              Brand Stories, the organizer of the event, aims to create 
              investment-friendly communities comprising regular 
              stock traders, beginners as well as long-term investors.
            </p>
            
            <p className="text-gray-200 leading-relaxed">
              The conclave will encompass live training, special 
              classes, investment mentoring sessions, seminars, 
              discussions and training strategies.
            </p>
            
            <p className="text-gray-200 leading-relaxed">
              It will also serve avenues for interactions with mentors 
              from outside and within Kerala, from whom stock 
              enthusiasts as well as beginners can have first-hand 
              learning experience on major trading strategies.
            </p>
            
            <p className="text-gray-200 leading-relaxed">
              The event must be viewed as a prime opportunity for 
              potential investors to master the art of right investments 
              from stock veterans and experts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
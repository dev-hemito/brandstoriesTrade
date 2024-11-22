import React from 'react';

const AboutSection = () => {
  return (
    <div className="w-ful text-white md:px-5 mx-auto" id='about'>
      <div className="container mx-auto px-4">
        <h2 className="text-orange-400 text-center text-4xl mb-8 font-serif">About</h2>

        <div className="flex flex-col lg:flex-row gap-8 items-center">


          {/* Content Section */}
          <div className="w-full space-y-4 text-center">
            <p className="text-black leading-relaxed">
              In a first-of-its-kind initiative, stage has been set for the
              two-day long Kerala Traders and Investors Conclave.
              Sens Promos Private Limited, Brand Stories, the organizer of the event, aims to create
              investment-friendly communities comprising regular
              stock traders, beginners as well as long-term investors.
              The conclave will encompass live training, special
              classes, investment mentoring sessions, seminars,
              discussions and training strategies.
              It will also serve avenues for interactions with mentors
              from outside and within Kerala, from whom stock
              enthusiasts as well as beginners can have first-hand
              learning experience on major trading strategies.
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
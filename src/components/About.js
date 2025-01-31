import React from 'react';

const AboutSection = () => {
  return (
    <div className="w-ful text-white md:px-5 mx-auto" id='about'>
      <div className="container mx-auto px-4">
        <h2 className="text-orange-400 text-center text-4xl mb-8 font-serif">About Traders Summit 2025</h2>

        <div className="flex flex-col lg:flex-row gap-8 items-center">


          {/* Content Section */}
          <div className="w-full space-y-4 text-center">
            <p className="text-black leading-relaxed">
            Malabar Biggest Traders Summit 2025 hosted by Brand Stories Business Magazine, is a transformative one-day event exclusively tailored for traders to unlock their potential and excel in the fast-paced world of stock trading. This thoughtfully curated platform offers expert-led sessions, strategy-focused seminars, and mentorship opportunities designed to equip participants with actionable insights into market dynamics, trading techniques, and risk management strategies. Whether you're a beginner looking to build a strong foundation or an experienced trader aiming to refine your approach, the Summit connects you with industry veterans and trading experts who will guide you toward smarter, more confident decisions. Take the next step in your trading journey and be part of this game-changing experience!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
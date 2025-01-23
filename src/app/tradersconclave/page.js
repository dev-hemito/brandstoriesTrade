'use client'
import React from 'react';
import Hero from '@/components/traders-conclave/Hero';
import About from '@/components/traders-conclave/About';
import KeyFeatures from '@/components/traders-conclave/KeyFeatures';
import WhoShouldAttend from '@/components/traders-conclave/WhoShouldAttend';
import Speakers from '@/components/traders-conclave/Speakers';
import Schedule from '@/components/traders-conclave/Schedule';
import BrandPartnership from '@/components/traders-conclave/BrandPartnership';
import EventGallery from '@/components/traders-conclave/EventGallery';
import UpcomingEvents from '@/components/traders-conclave/UpcomingEvents';
import Footer from '@/components/traders-conclave/Footer';

// Data imports
import { 
  speakers, 
  keyFeatures, 
  attendeeTypes, 
  brandPartnershipTiers,
  day1Schedule,
  day2Schedule,
  upcomingEvents 
} from '@/data/traders-conclave-data';
import Header from '@/components/traders-conclave/Header';

const TradersConclaveWebsite = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header/>
      <Hero />
      <BrandPartnership tiers={brandPartnershipTiers} />
      <About />
      <KeyFeatures features={keyFeatures} />
      <WhoShouldAttend types={attendeeTypes} />
      <Speakers speakers={speakers} />
      <Schedule day1={day1Schedule} day2={day2Schedule} />
      <EventGallery />
      <UpcomingEvents events={upcomingEvents} />
      <Footer />
    </div>
  );
};

export default TradersConclaveWebsite;
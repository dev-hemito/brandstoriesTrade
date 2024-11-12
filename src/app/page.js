import AboutSection from '@/components/About'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FeatureSection from '@/components/KeyHighlights'
import TicketPlans from '@/components/TicketPlans'
import AttendeesShowcase from '@/components/WhoshouldAttend'
import React from 'react'

const page = () => {
  return (
    <div>
      <Header />
      <div className="absolute w-full h-[300px] md:h-[600px] bg-amber-500/10 blur-3xl rounded-full opacity-50 md:opacity-100"></div>
      <Hero />
      <p className='md:text-7xl text-5xl text-amber-500 font-bold  max-w-6xl mx-auto text-center relative z-10 md:py-32 py-16'>
        South Indias Biggest Traders and Investors Conclave
      </p>
      <AboutSection />
      <FeatureSection/>
      <TicketPlans />
      <AttendeesShowcase/>
    </div>
  )
}

export default page

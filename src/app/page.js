'use client'

import AboutSection from '@/components/About'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FeatureSection from '@/components/KeyHighlights'
import TicketPlans from '@/components/TicketPlans'
import AttendeesShowcase from '@/components/WhoshouldAttend'
import React from 'react'
import { motion } from 'framer-motion'
import SpeakersShowcase from '@/components/SpeakerShowcase'
import EventItinerary from '@/components/Intinerary'
import Footer from '@/components/Footer'
import PlansPayments from '@/components/PlansPayment'

const Page = () => {
  const words = "South India's Biggest Traders and Investors Conclave".split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <div>
      <Hero />
      <motion.div
        className='overflow-hidden relative z-10 md:py-32 py-16'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={container}
      >
        <div className='max-w-6xl mx-auto text-center'>
          {words.map((word, index) => (
            <motion.span
              key={index}
              className="relative inline-block md:text-9xl text-5xl font-bold mx-2"
              variants={child}
            >
              <span className="absolute inset-0 text-amber-500 clip-text">
                {word}
              </span>
              <motion.span
                className="relative text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: index * 0.1 }}
              >
                {word}
              </motion.span>
            </motion.span>
          ))}
        </div>
      </motion.div>

      <style jsx global>{`
        .clip-text {
          clip-path: polygon(0 0, 200% 0, 100% 100%, 0% 100%);
        }
      `}</style>

      <AboutSection />
      <FeatureSection />
      <PlansPayments />
      <AttendeesShowcase />
      <SpeakersShowcase />
      <EventItinerary />
      <Footer />
    </div>
  )
}

export default Page
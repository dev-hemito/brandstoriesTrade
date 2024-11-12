'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ScrollText = () => {
  const containerRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const textElements = gsap.utils.toArray('.scroll-text')

    gsap.to(textElements, {
      xPercent: -100 * (textElements.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        snap: 1 / (textElements.length - 1),
        start: "top top",
        end: "+=300%"
      }
    })

    textElements.forEach((text) => {
      gsap.from(text, {
        opacity: 0,
        scale: 0.5,
        duration: 1,
        scrollTrigger: {
          trigger: text,
          containerAnimation: ScrollTrigger.getById("container"),
          start: "left center",
          toggleActions: "play none none reverse"
        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const words = [
    "South",
    "Indias",
    "Biggest",
    "Traders",
    "and",
    "Investors",
    "Conclave"
  ]

  return (
    <div 
      ref={containerRef} 
      className="relative overflow-hidden h-screen w-full"
    >
      <div  ref={textRef}  className="absolute flex items-center h-full"  >
        {words.map((word, index) => (
          <div
            key={index}
            className="scroll-text flex-shrink-0 w-full h-full flex items-center justify-center"
          >
            <span className="md:text-8xl text-6xl text-amber-500 font-bold">
              {word}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScrollText
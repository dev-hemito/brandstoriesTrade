import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const particles = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  delay: i * 0.2,
  duration: 3 + (i % 3) * 2,
  size: 10 + (i % 5) * 6,
  x: 10 + (i % 10) * 8,
  y: 10 + (i % 8) * 10
}));

const GoldenParticle = ({ delay, duration, size, x, y }) => {
  return (
    <motion.div
      className="absolute bg-amber-400 rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        top: `${y}%`
      }}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.3, 0.7, 0.3]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

const AnimatedHeroSection = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center text-center pt-16 bg-black relative overflow-hidden"
    >
      {/* Golden Particle Background */}
      {particles.map((particle) => (
        <GoldenParticle 
          key={particle.id}
          delay={particle.delay}
          duration={particle.duration}
          size={particle.size}
          x={particle.x}
          y={particle.y}
        />
      ))}

      {/* Golden Sparkle Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/3 w-16 h-16 bg-gold/30 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 360]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gold/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 2, 1],
            rotate: [0, -360]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image src='/evolveLogo.png' alt='logo' width={500} height={500} /> 
        </motion.div>
        
        <motion.p 
          className="text-xl md:text-2xl text-white mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          The Day of Transformation is not too far away
        </motion.p>
        
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <motion.a 
            href="#tickets" 
            className="bg-amber-400 text-black px-8 py-3 rounded-full font-bold hover:bg-amber-300 transition transform hover:scale-105"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Buy Tickets
          </motion.a>
          <motion.a 
            href="#speakers" 
            className="border-2 border-amber-400 text-amber-400 px-8 py-3 rounded-full font-bold hover:bg-amber-400 hover:text-black transition transform hover:scale-105"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Learn More
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default AnimatedHeroSection;
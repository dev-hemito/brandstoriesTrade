import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [currentVideoSrc, setCurrentVideoSrc] = useState("");

  const videoSources = {
    mobile: "/mobile.mp4",
    desktop: "/lap.mp4",
  };

  const handleResize = useCallback(() => {
    const mobile = window.innerWidth < 768; // Changed to standard Tailwind breakpoint
    setIsMobile(mobile);
    setCurrentVideoSrc(mobile ? videoSources.mobile : videoSources.desktop);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <section className="relative w-full overflow-hidden bg-black min-h-screen">
      {/* Video Background */}
      {currentVideoSrc && (
        <video
          key={currentVideoSrc}
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoadedData={() => setVideoLoaded(true)}
          poster="/video-poster.jpg"
        >
          <source src={currentVideoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Loading Spinner */}
      {!videoLoaded && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

      {/* Content Container */}
      <div className="relative min-h-screen flex items-end md:pb-32 pb-12 justify-center px-4">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:gap-8 px-4">
            {/* Left Logo */}
            <div className="md:w-1/3 transform hover:scale-105 transition-transform duration-300">
              <Image
                src="/main.png"
                className="h-16 md:h-24 w-auto object-contain"
                width={300}
                height={300}
                alt="Brand Stories"
                priority
              />
            </div>

            {/* Center Content */}
            <div className="md:w-1/3 text-center py-4 ">
              <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                Kerala Traders & Investors Conclave
              </h1>
              <div className="text-lg md:text-xl text-yellow-400 font-medium">
                Hotel Gokulam Park, Kochi
              </div>
              <div className="text-white text-lg">
                8th and 9th of January 2025
              </div>
            </div>

            {/* Right Logo */}
            <div className="md:w-1/3 transform hover:scale-105 transition-transform duration-300">
              <Image
                src="/money.png"
                className="h-16 md:h-24 w-auto object-contain"
                width={5000}
                height={5000}
                alt="Money Icon"
                priority
              />
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-5">
            <Link
              href="/#tickets"
              className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Hero = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);

    useEffect(() => {
        // Handle initial check and window resize
        const handleResize = () => {
            setIsMobile(window.innerWidth < 500);
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Video sources
    const videoSources = {
        mobile: "/mobile.mp4", // Your mobile-optimized video
        desktop: "/lap.mp4"
    };

    return (
        <div className="relative w-full overflow-hidden mt-24 bg-black" style={{ height: 'calc(100vh - 100px)' }}>
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                    videoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoadedData={() => setVideoLoaded(true)}
                poster="/video-poster.jpg" // Add a poster image for better loading experience
            >
                <source 
                    src={isMobile ? videoSources.mobile : videoSources.desktop}
                    type="video/mp4"
                />
            </video>

            {/* Loading state */}
            {!videoLoaded && (
                <div className="absolute inset-0 bg-black flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Hero Content */}
            <div className="relative min-h-[calc(100vh-6rem)] flex items-center justify-center px-4">
                <div className="w-full max-w-6xl absolute bottom-10 md:bottom-10 sm:bottom-5">
                    <div className="flex flex-col md:flex-row justify-center items-center md:items-end gap-4 px-2">
                        {/* Left Hotel Info - Hidden on mobile, shown from medium screens */}
                        <div className="hidden w-full md:flex bg-gradient-to-tr text-center text-base lg:text-xl from-amber-500/80 to-amber-400/80 text-white h-16 md:h-24 justify-center items-center p-3 md:p-5 rounded-md md:w-auto">
                            Hotel Gokulam Park. Kochi
                        </div>

                        {/* Center Content */}
                        <div className="md:w-1/3 text-white text-center">
                            <p className="mb-2 text-sm md:text-base">Edition 2</p>
                            <div className="relative w-full flex justify-center">
                                <Image 
                                    src='/traders.png' 
                                    className="md:h-auto h-24 w-auto"
                                    width={1000} 
                                    height={1000} 
                                    alt="brand stories"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Right Hotel Info - Hidden on mobile, shown from medium screens */}
                        <div className="hidden md:flex bg-gradient-to-tr text-center text-base lg:text-xl from-amber-500/80 to-amber-400/80 text-white h-16 md:h-24 justify-center items-center p-3 md:p-5 rounded-md w-full md:w-auto">
                            8th and 9th of January 2025
                        </div>

                        {/* Mobile Hotel Info - Shown only on mobile */}
                        <div className="md:hidden bg-gradient-to-tr text-center text-base from-amber-500/80 to-amber-400/80 text-white h-16 flex justify-center items-center p-3 rounded-md w-full">
                            Hotel Gokulam Park. Kochi <br/> 8th and 9th of January 2025
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="text-center mt-4 md:mt-5 mb-10">
                        <Link 
                            href="/#tickets" 
                            className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-6 md:px-8 rounded-full transition-colors text-sm md:text-base"
                        >
                            Join Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
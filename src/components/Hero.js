import Header from '@/components/Header';
import Image from 'next/image';
import React from 'react';

const Hero = () => {
    return (
        <div className="min-h-screen flex flex-col items-center relative overflow-hidden ">
            {/* Main Content */}
            <main className="flex flex-col items-center justify-center flex-1 text-center w-full md:scale-90 mt-20">
                {/* Radial gradient background */}

                {/* Content */}
                <div className="relative z-10 w-full hidden md:block ">
                    <h2 className="text-white md:text-2xl text-sm">Creating Successful</h2>
                    <h2 className="text-white md:text-2xl text-sm">Individual Entrepreneur Sagas</h2>

                    <div className="relative md:w-full w-screen border border-transparent  md:object-contain object-cover"
                        style={{
                            backgroundImage: "url('main.png')",
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',

                        }}>
                        {/* Brand Stories Text */}

                        {/* Summit Logo */}
                        <div className="w-full max-w-[200px] md:max-w-xs mx-auto mt-8 md:mt-16 lg:mt-24">
                            <div className="relative w-full aspect-square">
                                <Image
                                    src="/traders.png"
                                    fill
                                    alt="traders summit"
                                    className="object-contain mt-24"
                                />
                            </div>
                        </div>

                        {/* Venue & Date */}
                        <div className=" mt-7 mb-3 text-white">
                            <p className="text-base md:text-xl">Hotel Gokulam Park, Kochi</p>
                            <p className="text-sm md:text-base text-amber-500">On 8-9 January 2025</p>
                        </div>

                        {/* CTA Button */}
                        <button className="px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full text-black font-bold hover:from-amber-600 hover:to-yellow-600 transition-all text-sm md:text-base">
                            Join Now
                        </button>
                    </div>
                </div>
                <div className=' md:hidden'>
                    <p className='text-amber-500 text-sm'>Creating Successful</p>
                    <p className='text-amber-500 text-sm'>Individual Entrepreneur Sagas</p>
                    <Image src={'/main.png'} width={500} height={500} alt='brand stories' className='' />
                    <Image src={'/traders.png'} width={500} height={500} alt='traders summit' className='w-full max-w-[300px] md:max-w-xs mx-auto -mt-12  mb-0' />
                    <div className=" mt-7 mb-3 text-white ">
                        <p className="text-base md:text-xl">Hotel Gokulam Park, Kochi</p>
                        <p className="text-sm md:text-base text-amber-500">On 8-9 January 2025</p>
                    </div>

                    {/* CTA Button */}
                    <button className="px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full text-black font-bold hover:from-amber-600 hover:to-yellow-600 transition-all text-sm md:text-base">
                        Join Now
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Hero;
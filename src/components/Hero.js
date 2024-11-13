import Image from "next/image";
import Link from "next/link";

const Hero = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="/video.mp4" type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Hero Content */}

            <div className="relative h-full flex items-center justify-center px-4">
                <div className="max-w-6xl w-full  absolute bottom-10">
                    <div className="flex justify-center items-end gap-4">
                        <div className="bg-gradient-to-tr text-center text-xl from bg-amber-500/80 to-amber-400/80 text-white h-24 flex justify-center items-center p-5 rounded-md">
                            Hotel Gokulam Park. Kochi
                        </div>
                        <div className="w-2/3 text-white text-center">
                        <p className="mb-2">Edition 2</p>
                            <Image src='/main.png' className="w-full h-auto" width={1000} height={1000} alt="brand stories"/>
                        </div>
                        <div className="bg-gradient-to-tr text-center text-xl from bg-amber-500/80 to-amber-400/80 text-white h-24 flex justify-center items-center p-5 rounded-md">
                            Hotel Gokulam Park. Kochi
                        </div>
                    </div>
                    <div className="text-center mt-5">
                        <Link href="/#tickets" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-8 rounded-full transition-colors  mt-3">
                            Join Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
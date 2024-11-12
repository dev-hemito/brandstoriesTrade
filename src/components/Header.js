import React from 'react'

const Header = () => {
    return (
        <div className='fixed w-full z-50'>
            <nav className="w-full p-4">
                <ul className="flex flex-wrap justify-center gap-4 md:gap-28 text-white text-sm md:text-base">
                    <li className="hover:text-amber-400 cursor-pointer">Home</li>
                    <li className="hover:text-amber-400 cursor-pointer">About</li>
                    <li className="hover:text-amber-400 cursor-pointer">Contact</li>
                    <li className="hover:text-amber-400 cursor-pointer">Tickets</li>
                </ul>
            </nav>

        </div>
    )
}

export default Header

import React from 'react'

const page = () => {
    return (
        <div className='max-w-3xl mx-auto px-6 py-8  mt-24'>
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6 ">Return Policy</h1>
            <h3 className="text-lg text-center text-gray-600 mb-12">Effective Date: 21 November 2024</h3>

            <section className="mb-8">
                <p className="text-gray-700">
                    Sens Promos Private Limited and its product, Brand Stories, operate exclusively in the digital domain, providing services rather than physical products. Therefore, we do not offer returns.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                <p className="text-gray-700 mb-2">For clarification, contact us at:</p>
                <ul className="list-none pl-0 text-gray-700">
                    <li>Email: <a href="mailto:info@thebrandstories.co.in" className="text-blue-500 hover:underline">info@thebrandstories.co.in</a></li>
                    <li>Phone: +91 95621 31105</li>
                </ul>
            </section>
        </div>
    )
}

export default page

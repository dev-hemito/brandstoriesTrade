import React from 'react'

const Page = () => {
    return (
        <div className="max-w-3xl mx-auto px-6 py-8">

            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Shipping Policy</h1>
            <h3 className="text-lg text-center text-gray-600 mb-12">Effective Date: 21 November 2024</h3>

            <section className="mb-8">
                <p className="text-gray-700">
                    Sens Promos Private Limited and its product, Brand Stories, provide digital services only. No shipping or delivery of physical goods is involved.
                </p>
                <p className="text-gray-700 mt-4">
                    All deliverables are shared electronically via email or cloud-based platforms.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                <p className="text-gray-700 mb-2">For service delivery questions, contact us at:</p>
                <ul className="list-none pl-0 text-gray-700">
                    <li>Email: <a href="mailto:info@thebrandstories.co.in" className="text-blue-500 hover:underline">info@thebrandstories.co.in</a></li>
                    <li>Phone: +91 95621 31105</li>
                </ul>
            </section>
        </div>
    )
}

export default Page;

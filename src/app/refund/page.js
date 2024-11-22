import React from 'react'

const page = () => {
    return (
        <div  className='max-w-3xl mx-auto px-6 py-8  mt-24'>
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6 ">Refund Policy</h1>
            <h3 className="text-lg text-center text-gray-600 mb-12">Effective Date: 21 November 2024</h3>

            <section className="mb-8">
                <p className="text-gray-700">
                    All payments made to Sens Promos Private Limited and its product, Brand Stories, are final and non-refundable.
                </p>
                <p className="text-gray-700 mt-4">
                    <strong>Exceptions:</strong> There are no exceptions to this policy. Once the payment is made, it is non-refundable under any circumstances.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                <p className="text-gray-700 mb-2">For refund-related inquiries, contact us at:</p>
                <ul className="list-none pl-0 text-gray-700">
                    <li>Email: <a href="mailto:info@thebrandstories.co.in" className="text-blue-500 hover:underline">info@thebrandstories.co.in</a></li>
                    <li>Phone: +91 95621 31105</li>
                </ul>
            </section>
        </div>
    )
}

export default page

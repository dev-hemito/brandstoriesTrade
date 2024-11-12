'use client'
import { useState } from 'react';
import { ArrowLeft, Check, Package } from 'lucide-react';

const TicketPlans = () => {
    const packages = [
        {
            id: 'basic',
            name: 'Basic Pass',
            price: 999,
            features: ['Access to all sessions', 'Digital resources', 'Network access']
        },
        {
            id: 'premium',
            name: 'Premium Pass',
            price: 1999,
            features: ['Basic Pass features', 'VIP seating', 'One-on-one mentoring']
        },
        {
            id: 'vip',
            name: 'VIP Pass',
            price: 4999,
            features: ['Premium Pass features', 'Exclusive dinner', 'Lifetime community access']
        }
    ];

    const [selectedPackage, setSelectedPackage] = useState(null);
    const [step, setStep] = useState(1);
    const [verificationDatatickets, setVerificationData] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        company: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
        if (!formData.address) newErrors.address = 'Address is required';
        return newErrors;
    };

    const handlePackageSelect = (pkg) => {
        console.log('Selected package:', pkg);
        setSelectedPackage(pkg);
        setStep(2);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`Updating ${name} with value:`, value);
        setFormData({ ...formData, [name]: value });
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const checkDuplicate = async () => {
        console.log('Checking for duplicate registration...');
        try {
            const response = await fetch('/api/check-duplicate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    phone: formData.phone
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Duplicate check response:', data);
            return data.isDuplicate;
        } catch (error) {
            console.log('Error checking duplicate:', error);
            throw error;
        }
    };

    const createOrder = async () => {
        console.log('Creating Razorpay order...');
        try {
            const response = await fetch('/api/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: selectedPackage.price
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Order creation response:', data);
            return data;
        } catch (error) {
            console.log('Error creating order:', error);
            throw error;
        }
    };

    const verifyPayment = async (paymentData) => {
        console.log('Verifying payment...', paymentData);
        try {
            const response = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...paymentData,
                    userData: { ...formData, package: selectedPackage.name }
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Payment verification response:', data);
            return data;
        } catch (error) {
            console.log('Error verifying payment:', error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submission started...');

        // Reset errors
        setErrors({});

        // Validate form
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            console.log('Form validation failed:', newErrors);
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            // Check for duplicate registration
            const isDuplicate = await checkDuplicate();
            if (isDuplicate) {
                setErrors({ general: 'Email or phone number already registered' });
                setLoading(false);
                return;
            }

            // Create Razorpay order
            const orderData = await createOrder();

            // Initialize Razorpay payment
            const options = {
                key: process.env.NEXT_PUBLIC_NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: "INR",
                name: "Trading Summit",
                description: `${selectedPackage.name} Registration`,
                order_id: orderData.id,
                handler: async function (response) {
                    try {
                        const verificationData = await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        if (verificationData.success) {
                            setVerificationData(verificationData.ticketNumber);
                            alert(`Registration successful! Your ticket number is ${verificationData.ticketNumber}`);
                            setStep(3);
                        } else {
                            throw new Error('Payment verification failed');
                        }
                    } catch (error) {
                        console.log('Payment verification error:', error);
                        alert('Payment verification failed. Please try again.');
                        // Reset to step 1 on payment failure
                        setStep(1);
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone
                },
                modal: {
                    ondismiss: function () {
                        console.log('Payment modal dismissed');
                        setLoading(false);
                    }
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.log('Form submission error:', error);
            setErrors({ general: 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    // Rest of the component remains the same...
    return (
        <div className="min-h-screen bg-black">
            <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

            <main className="container mx-auto px-4 py-12">
                {/* Progress Steps */}
                <div className="mb-12">
                    <div className="flex justify-center items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-amber-500' : 'bg-gray-700'}`}>
                            <Package className="w-4 h-4 text-black" />
                        </div>
                        <div className={`h-1 w-24 ${step >= 2 ? 'bg-amber-500' : 'bg-gray-700'}`}></div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-amber-500' : 'bg-gray-700'}`}>
                            <span className="text-black">2</span>
                        </div>
                        <div className={`h-1 w-24 ${step >= 3 ? 'bg-amber-500' : 'bg-gray-700'}`}></div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-amber-500' : 'bg-gray-700'}`}>
                            <Check className="w-4 h-4 text-black" />
                        </div>
                    </div>
                </div>

                {step === 1 && (
                    <div className="grid md:grid-cols-3 gap-8">
                        {packages.map((pkg) => (
                            <div key={pkg.id}
                                className="rounded-lg bg-gray-900 border border-amber-500/20 hover:border-amber-500 transition-all duration-300 overflow-hidden">
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-amber-500">{pkg.name}</h3>
                                    <p className="text-4xl font-bold text-white mt-2">₹{pkg.price.toLocaleString()}</p>
                                    <ul className="space-y-4 mt-6">
                                        {pkg.features.map((feature, index) => (
                                            <li key={index} className="flex items-center text-gray-300">
                                                <Check className="w-5 h-5 mr-2 text-amber-500" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => handlePackageSelect(pkg)}
                                        className="w-full mt-6 bg-amber-500 text-black py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors duration-300"
                                    >
                                        Select Package
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {step === 2 && (
                    <div className="max-w-2xl mx-auto bg-gray-900 border border-amber-500/20 rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <button
                                    onClick={() => setStep(1)}
                                    className="flex items-center text-amber-500 hover:text-amber-400"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Change Package
                                </button>
                                <div className="text-right">
                                    <p className="text-amber-500">{selectedPackage?.name}</p>
                                    <p className="text-white text-xl font-bold">₹{selectedPackage?.price.toLocaleString()}</p>
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-6">Registration Details</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {['name', 'email', 'phone', 'address', 'company'].map((field) => (
                                    <div key={field}>
                                        <label className="block text-amber-500 mb-2 capitalize">
                                            {field} {field !== 'company' && '*'}
                                        </label>
                                        {field === 'address' ? (
                                            <textarea
                                                name={field}
                                                value={formData[field]}
                                                onChange={handleInputChange}
                                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                                                rows="3"
                                            />
                                        ) : (
                                            <input
                                                type={field === 'email' ? 'email' : 'text'}
                                                name={field}
                                                value={formData[field]}
                                                onChange={handleInputChange}
                                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                                            />
                                        )}
                                        {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                                    </div>
                                ))}

                                {errors.general && (
                                    <p className="text-red-500 text-center">{errors.general}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-amber-500 text-black py-3 rounded-lg font-semibold hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                                >
                                    {loading ? 'Processing...' : 'Proceed to Payment'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="max-w-2xl mx-auto bg-gray-900 border border-amber-500/20 rounded-lg">
                        <div className="text-center p-12">
                            <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check className="w-10 h-10 text-black" />
                            </div>
                            <h2 className="text-3xl font-bold text-amber-500 mb-4">Registration Successful!</h2>
                            <p className="text-gray-300 mb-4">
                                Thank you for registering for the Trading Summit! We have sent a confirmation email to your registered email address.
                                {verificationDatatickets} is your Booking Ticket Token
                            </p>
                            <p className="text-gray-300">
                                Please check your email for your ticket details and further instructions.
                            </p>
                            <button
                                onClick={() => setStep(1)}
                                className="mt-8 bg-amber-500 text-black py-3 px-8 rounded-lg font-semibold hover:bg-amber-400 transition-colors duration-300"
                            >
                                Register Another Ticket
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default TicketPlans;
import { useState } from 'react';
import { ArrowLeft, Check, Package, Loader, X, LucideTicket } from 'lucide-react';
import Link from 'next/link';

const TicketPlans = () => {
    const packages = [
        {
            id: 'silver',
            name: 'Silver Tickets',
            price: 5999,
            features: ['2 Days'],
            bgcolor: 'bg-gradient-to-br from-gray-50 to-gray-100',
            href:'https://rzp.io/rzp/4TFIoAnZ',
        },
        {
            id: 'golden',
            name: 'Golden Tickets',
            price: 8999,
            features: ['2 Days', '1 Night Stay', 'Double Occupancy'],
            bgcolor: 'bg-gradient-to-br from-amber-50 to-amber-100',
            href:'https://rzp.io/rzp/2YlYmRz',
        },
        {
            id: 'vip',
            name: 'VIP Tickets',
            price: 11999,
            features: ['2 Days', '1 Night Stay', 'Networking Gala Dinner', 'Single Occupancy'],
            bgcolor: 'bg-gradient-to-br from-amber-100 to-amber-200',
            href:'https://rzp.io/rzp/soVOoJY',
        },
    ];

    const [selectedPackage, setSelectedPackage] = useState(null);
    const [verificationDatatickets, setVerificationData] = useState(null);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [processingState, setProcessingState] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Existing validation and handler functions remain the same
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
        return newErrors;
    };

    const handlePackageSelect = (pkg) => {
        setSelectedPackage(pkg);
        setShowRegistrationModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const resetForm = () => {
        setFormData({ name: '', email: '', phone: '' });
        setErrors({});
        setProcessingState('');
        setLoading(false);
        setShowSuccessModal(false);
        setShowRegistrationModal(false);
        setSelectedPackage(null);
        setVerificationData(null);
    };

    // Existing API functions remain the same
    const checkDuplicate = async () => {
        setProcessingState('Checking registration status...');
        try {
            const response = await fetch('/api/check-duplicate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    phone: formData.phone
                })
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            return data.isDuplicate;
        } catch (error) {
            console.error('Error checking duplicate:', error);
            throw error;
        }
    };

    const createOrder = async () => {
        setProcessingState('Creating your order...');
        try {
            const response = await fetch('/api/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: selectedPackage.price
                })
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    };

    const verifyPayment = async (paymentData) => {
        setProcessingState('Verifying payment...');
        try {
            const response = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...paymentData,
                    userData: { ...formData, package: selectedPackage.name }
                })
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error verifying payment:', error);
            throw error;
        } finally {
            setProcessingState('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            const isDuplicate = await checkDuplicate();
            if (isDuplicate) {
                setErrors({ general: 'Email or phone number already registered' });
                setLoading(false);
                return;
            }

            const orderData = await createOrder();

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
                            setShowRegistrationModal(false);
                            setShowSuccessModal(true);
                        } else {
                            throw new Error('Payment verification failed');
                        }
                    } catch (error) {
                        alert('Payment verification failed. Please try again.');
                        resetForm();
                    } finally {
                        setProcessingState('');
                        setLoading(false);
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                        setProcessingState('');
                    }
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            setErrors({ general: 'Something went wrong. Please try again.' });
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen  py-16 px-4" id="tickets">
            <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
            
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-12">
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center gap-3">
                        <h1 className="text-4xl md:text-5xl font-bold text-amber-500 text-center">
                            Get Your Ticket Now
                        </h1>
                        <LucideTicket className="w-8 h-8 md:w-12 md:h-12 text-amber-500 hidden sm:block" />
                    </div>
                    <p className="text-gray-600 text-center max-w-2xl">
                        Join us for an incredible trading summit experience. Choose the package that best suits your needs.
                    </p>
                </div>
            </div>

            {/* Package Cards */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {packages.map((pkg) => (
                        <div
                            key={pkg.id}
                            className={`${pkg.bgcolor} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1`}
                        >
                            <div className="p-6 md:p-8 border">
                                <div className="flex items-center justify-between mb-6">
                                    <Package className="w-8 h-8 text-amber-500" />
                                    <span className="text-xs font-semibold px-3 py-1 bg-white text-amber-700 rounded-full">
                                        {pkg.id === 'vip' ? 'Most Popular' : ''}
                                    </span>
                                </div>
                                
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                                <p className="text-4xl font-bold text-amber-500 mb-6">
                                    ₹{pkg.price.toLocaleString()}
                                </p>
                                
                                <ul className="space-y-4 mb-8 md:min-h-36">
                                    {pkg.features.map((feature, index) => (
                                        <li key={index} className="flex items-center text-gray-600">
                                            <Check className="w-5 h-5 mr-3 text-amber-500 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                
                                {/* <button
                                    onClick={() => handlePackageSelect(pkg)}
                                    className="w-full py-4 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transform transition-all duration-300 hover:scale-[1.02] focus:ring-2 focus:ring-amber-300 focus:outline-none"
                                >
                                    Select Package
                                </button> */}
                                 <button onClick={()=>{window.location.href=pkg.href}}
                                   
                                    className=" w-full p-4 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transform transition-all duration-300 hover:scale-[1.02] focus:ring-2 focus:ring-amber-300 focus:outline-none"
                                >
                                    Select Package
                                </button >

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Registration Modal */}
            {showRegistrationModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="relative p-6 md:p-8">
                            <button
                                onClick={() => setShowRegistrationModal(false)}
                                className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-500" />
                            </button>

                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-4 border-b">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Complete Registration</h2>
                                    <p className="text-gray-500">Fill in your details to proceed</p>
                                </div>
                                <div className="mt-4 md:mt-0 text-right">
                                    <p className="text-amber-500 font-medium">{selectedPackage?.name}</p>
                                    <p className="text-2xl font-bold text-gray-800">₹{selectedPackage?.price.toLocaleString()}</p>
                                </div>
                            </div>

                            {processingState && (
                                <div className="mb-6 flex items-center justify-center text-amber-500 space-x-3 bg-amber-50 p-4 rounded-lg">
                                    <Loader className="w-5 h-5 animate-spin" />
                                    <span className="font-medium">{processingState}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {['name', 'email', 'phone'].map((field) => (
                                    <div key={field}>
                                        <label className="block text-gray-700 font-medium mb-2 capitalize">
                                            {field} <span className="text-amber-500">*</span>
                                        </label>
                                        <input
                                            type={field === 'email' ? 'email' : 'text'}
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleInputChange}
                                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                                            placeholder={`Enter your ${field}`}
                                        />
                                        {errors[field] && (
                                            <p className="text-red-500 text-sm mt-2 flex items-center">
                                                <X className="w-4 h-4 mr-1" />
                                                {errors[field]}
                                            </p>
                                        )}
                                    </div>
                                ))}

                                {errors.general && (
                                    <div className="p-4 bg-red-50 rounded-lg text-red-500 text-center">
                                        {errors.general}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus:ring-2 focus:ring-amber-300 focus:outline-none"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center space-x-2">
                                            <Loader className="w-5 h-5 animate-spin" />
                                            <span>Processing...</span>
                                        </span>
                                    ) : (
                                        'Proceed to Payment'
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-2xl w-full shadow-xl transform animate-fadeIn">
                        <div className="text-center p-8 md:p-12">
                            <div className="w-20 h-20 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                                <Check className="w-10 h-10 text-white" />
                            </div>
                            
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                Registration Successful!
                            </h2>
                            
                            <div className="space-y-4 mb-8">
                                <p className="text-gray-600">
                                    Thank you for registering for the Trading Summit! We have sent a confirmation email to your registered email address.
                                </p>
                                
                                {verificationDatatickets && (
                                    <div className="bg-amber-50 p-4 rounded-lg inline-block">
                                        <p className="text-amber-700 font-medium">
                                            Booking Ticket Token:
                                        </p>
                                        <p className="font-mono text-lg text-amber-800 mt-1">
                                            {verificationDatatickets}
                                        </p>
                                    </div>
                                )}
                                
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <p className="text-blue-700">
                                        Please check your email for your ticket details and further instructions.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={resetForm}
                                    className="px-8 py-4 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-all duration-300 focus:ring-2 focus:ring-amber-300 focus:outline-none transform hover:scale-[1.02]"
                                >
                                    Register Another Ticket
                                </button>
                                
                                <button
                                    onClick={() => window.location.href = '#tickets'}
                                    className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 focus:ring-2 focus:ring-gray-300 focus:outline-none"
                                >
                                    Back to Packages
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Processing Overlay */}
            {processingState && !showRegistrationModal && !showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 shadow-xl flex items-center space-x-4 transform animate-fadeIn">
                        <div className="relative">
                            <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-6 h-6 bg-white rounded-full"></div>
                            </div>
                        </div>
                        <span className="text-lg text-gray-700 font-medium">{processingState}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TicketPlans;
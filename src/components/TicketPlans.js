import { useState } from 'react';
import { ArrowLeft, Check, Package, Loader, X, LucideTicket } from 'lucide-react';

const TicketPlans = () => {
    const packages = [
        {
            id: 'basic',
            name: 'Basic Pass',
            price: 999,
            features: ['Access to all sessions', 'Digital resources', 'Network access'],
            bgcolor: 'bg-white'
        },
        {
            id: 'vip',
            name: 'VIP Pass',
            price: 4999,
            features: ['Premium Pass features', 'Exclusive dinner', 'Lifetime community access'],
            bgcolor: 'bg-amber-50'
        },
        {
            id: 'premium',
            name: 'Premium Pass',
            price: 1999,
            features: ['Basic Pass features', 'VIP seating', 'One-on-one mentoring'],
            bgcolor: 'bg-white'
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
        setFormData({
            name: '',
            email: '',
            phone: ''
        });
        setErrors({});
        setProcessingState('');
        setLoading(false);
        setShowSuccessModal(false);
        setShowRegistrationModal(false);
        setSelectedPackage(null);
        setVerificationData(null);
    };

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
        <div className=" mb-16" id='tickets'>
            <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
            <div className="flex justify-center gap-5 items-center">
                <h1 className='text-center text-5xl text-amber-500'>Get Your Ticket Now </h1>
                <LucideTicket  className='w-12 h-12 text-amber-500 hidden md:block'/>
            </div>
            <main className="max-w-7xl mx-auto px-4 py-12">
                {/* Package Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {packages.map((pkg) => (
                        <div key={pkg.id}
                            className={`${pkg.bgcolor} rounded-lg border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300`}>

                            <div className="p-6">
                                <Package />
                                <h3 className="text-2xl font-bold text-gray-800 flex item-center gap-2">{pkg.name}</h3>
                                <p className="text-4xl font-bold text-amber-500 mt-2">₹{pkg.price.toLocaleString()}</p>
                                <ul className="space-y-4 mt-6">
                                    {pkg.features.map((feature, index) => (
                                        <li key={index} className="flex items-center text-gray-600">
                                            <Check className="w-5 h-5 mr-2 text-amber-500" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => handlePackageSelect(pkg)}
                                    className="w-full mt-6 bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-300"
                                >
                                    Select Package
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Registration Modal */}
                {showRegistrationModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg max-w-2xl w-full mx-4 relative">
                            <button
                                onClick={() => setShowRegistrationModal(false)}
                                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6 border-b pb-4">
                                    <h2 className="text-2xl font-bold text-gray-800">Complete Registration</h2>
                                    <div className="text-right">
                                        <p className="text-amber-500">{selectedPackage?.name}</p>
                                        <p className="text-gray-800 text-xl font-bold">₹{selectedPackage?.price.toLocaleString()}</p>
                                    </div>
                                </div>

                                {processingState && (
                                    <div className="mb-6 flex items-center justify-center text-amber-500 space-x-2">
                                        <Loader className="w-5 h-5 animate-spin" />
                                        <span>{processingState}</span>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {['name', 'email', 'phone'].map((field) => (
                                        <div key={field}>
                                            <label className="block text-gray-700 mb-2 capitalize">
                                                {field} *
                                            </label>
                                            <input
                                                type={field === 'email' ? 'email' : 'text'}
                                                name={field}
                                                value={formData[field]}
                                                onChange={handleInputChange}
                                                className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                                            />
                                            {errors[field] && (
                                                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                                            )}
                                        </div>
                                    ))}

                                    {errors.general && (
                                        <p className="text-red-500 text-center">{errors.general}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                                    >
                                        {loading ? 'Processing...' : 'Proceed to Payment'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Success Modal */}
                {showSuccessModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
                            <div className="text-center p-12">
                                <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Check className="w-10 h-10 text-white" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">Registration Successful!</h2>
                                <p className="text-gray-600 mb-4">
                                    Thank you for registering for the Trading Summit! We have sent a confirmation email to your registered email address.
                                    {verificationDatatickets && (
                                        <span className="block mt-2 font-semibold">
                                            Booking Ticket Token: {verificationDatatickets}
                                        </span>
                                    )}
                                </p>
                                <p className="text-gray-600">
                                    Please check your email for your ticket details and further instructions.
                                </p>
                                <button
                                    onClick={resetForm}
                                    className="mt-8 bg-amber-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-300"
                                >
                                    Register Another Ticket
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Processing Overlay */}
                {processingState && !showRegistrationModal && !showSuccessModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 flex items-center space-x-4">
                            <Loader className="w-6 h-6 animate-spin text-amber-500" />
                            <span className="text-gray-800">{processingState}</span>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default TicketPlans;
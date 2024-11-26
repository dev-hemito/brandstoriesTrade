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
    },
    {
      id: 'golden',
      name: 'Golden Tickets',
      price: 8999,
      features: ['2 Days', '1 Night Stay', 'Double Occupancy'],
      bgcolor: 'bg-gradient-to-br from-amber-50 to-amber-100',
    },
    {
      id: 'vip',
      name: 'VIP Tickets',
      price: 11999,
      features: ['2 Days', '1 Night Stay', 'Networking Gala Dinner', 'Single Occupancy'],
      bgcolor: 'bg-gradient-to-br from-amber-100 to-amber-200',
    },
  ];

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [processingState, setProcessingState] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',

  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(null);

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
    setShowRegistrationModal(false);
    setSelectedPackage(null);
    setTicketNumber(null);
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
    setProcessingState('Checking registration status...');

    try {
      // Check registration first
      const checkResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/check-registration`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone
        })
      });

      if (!checkResponse.ok) {
        const errorData = await checkResponse.json();
        setErrors({ general: errorData.message || 'Already registered' });
        setLoading(false);
        return;
      }

      // Proceed with registration
      setProcessingState('Initiating registration...');
      const registrationResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amount: selectedPackage.price,
          packageType: selectedPackage.name
        })
      });

      const registrationData = await registrationResponse.json();

      if (registrationData.success) {
        // Redirect to payment URL
        setTicketNumber(registrationData.ticketNumber);
        window.location.href = registrationData.paymentUrl;
      } else {
        throw new Error(registrationData.message || 'Registration failed');
      }

    } catch (error) {
      console.log('Registration error:', error);
      setErrors({ general: error.message || 'Something went wrong. Please try again.' });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4" id="tickets">
      {/* Header Section (unchanged) */}
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

      {/* Package Cards (mostly unchanged) */}
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

                <button
                  onClick={() => handlePackageSelect(pkg)}
                  className="w-full py-4 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transform transition-all duration-300 hover:scale-[1.02] focus:ring-2 focus:ring-amber-300 focus:outline-none"
                >
                  Select Package
                </button>
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
              {errors.general && (
                <div className="p-4 bg-red-50 rounded-lg text-red-500 text-center">
                  {errors.general}
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

      {/* Processing Overlay */}
      {processingState && !showRegistrationModal && (
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
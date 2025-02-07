import { useState } from 'react';
import { ArrowLeft, Check, Package, Loader, X, LucideTicket, Clock, Users, Coffee } from 'lucide-react';

const TicketPlans = () => {
  const packages = [
    {
      id: 'base',
      name: 'Single Day Pass',
      price: 1200,
      originalPrice: 1500,
      features: [
        { icon: Clock, text: 'Full day access to all sessions' },
        { icon: Coffee, text: 'Lunch, Tea & Coffee included' },
        { icon: Users, text: 'Networking opportunities' }
      ],
      highlight: 'Early Bird Offer',
      bgcolor: 'bg-gradient-to-br from-amber-50 to-amber-100',
      borderColor: 'border-amber-200',
      soldOut: false
    }
  ];

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [processingState, setProcessingState] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
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
    if (pkg.soldOut) return;
    window.location.href = 'https://rzp.io/rzp/XiEC4GR8';
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
    <div className="min-h-screen py-16 px-4 bg-gradient-to-b from-white to-amber-50" id="tickets">
      {/* Enhanced Header Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="absolute -inset-1 bg-amber-500/30 blur-xl rounded-full"></div>
            <div className="relative flex items-center gap-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 text-center">
                Get Your Ticket
              </h1>
              <LucideTicket className="w-10 h-10 md:w-14 md:h-14 text-amber-500 hidden sm:block animate-pulse" />
            </div>
          </div>
          <p className="text-lg text-gray-600 text-center max-w-2xl">
            Secure your spot at the most anticipated trading summit of the year
          </p>
        </div>
      </div>

      {/* Enhanced Package Cards */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`transform transition-all duration-500 hover:scale-[1.02]`}
            >
              <div className={`${pkg.bgcolor} border-2 ${pkg.borderColor} rounded-2xl overflow-hidden shadow-lg`}>
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left side - Package Info */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Package className="w-10 h-10 text-amber-500" />
                        {pkg.highlight && (
                          <span className="px-4 py-1 bg-amber-500 text-white text-sm font-medium rounded-full">
                            {pkg.highlight}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-amber-500">₹{pkg.price.toLocaleString()}</span>
                        <span className="text-xl text-gray-500 line-through">₹{pkg.originalPrice.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Right side - Features & Button */}
                    <div className="space-y-6">
                      <ul className="space-y-4">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                              <feature.icon className="w-4 h-4 text-amber-600" />
                            </div>
                            <span className="text-gray-700">{feature.text}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {pkg.soldOut ? (
                        <div className="w-full py-4 bg-gray-300 text-gray-500 rounded-xl font-semibold text-center cursor-not-allowed">
                          Tickets Not Available
                        </div>
                      ) : (
                        <button
                          onClick={() => handlePackageSelect(pkg)}
                          className="w-full py-4 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 
                          transform transition-all duration-300 hover:shadow-lg focus:ring-2 focus:ring-amber-300 focus:outline-none"
                        >
                          Book Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
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
                  <div className="flex items-center justify-end gap-2">
                    <p className="text-2xl font-bold text-gray-800">₹{selectedPackage?.price.toLocaleString()}</p>
                    <p className="text-gray-500 line-through">₹{selectedPackage?.originalPrice.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {processingState && (
                <div className="mb-6 flex items-center justify-center text-amber-500 space-x-3 bg-amber-50 p-4 rounded-lg">
                  <Loader className="w-5 h-5 animate-spin" />
                  <span className="font-medium">{processingState}</span>
                </div>
              )}

              {errors.general && (
                <div className="p-4 bg-red-50 rounded-lg text-red-500 text-center mb-6">
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
          <div className="bg-white rounded-2xl p-8 shadow-xl flex items-center space-x-4">
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

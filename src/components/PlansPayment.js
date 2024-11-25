import { useState, useEffect } from 'react';
import { Check, Star, Crown, Loader2, AlertCircle } from 'lucide-react';

const plans = [
  {
    id: 1,
    name: 'Basic Package',
    amount: 1,
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    color: 'bg-white',
    scale: 'hover:scale-105',
    recommended: false,
    borderColor: 'border-gray-200'
  },
  {
    id: 2,
    name: 'Standard Package',
    amount: 200,
    features: ['All Basic Features', 'Feature 4', 'Feature 5'],
    color: 'bg-gradient-to-b from-amber-50 to-white',
    scale: 'hover:scale-105',
    recommended: false,
    borderColor: 'border-amber-200'
  },
  {
    id: 3,
    name: 'Premium Package',
    amount: 500,
    features: ['All Standard Features', 'Feature 6', 'Feature 7'],
    color: 'bg-gradient-to-b from-amber-100 to-white',
    scale: 'hover:scale-105 scale-105',
    recommended: true,
    borderColor: 'border-amber-300'
  }
];

export default function PlansPayments() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [registrationDetails, setRegistrationDetails] = useState(null);

  // Check for payment status on component mount
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const orderId = queryParams.get('orderId');
    
    if (orderId) {
      checkPaymentStatus(orderId);
    }
  }, []);

  const checkPaymentStatus = async (orderId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/check-payment-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });

      const data = await response.json();
      setPaymentStatus(data.status);
      setShowStatusModal(true);
      
      // Clear URL parameters
      window.history.replaceState({}, '', window.location.pathname);
      
      if (data.status === 'success') {
        setSuccess('Registration successful! Please check your email for details.');
        setRegistrationDetails(data.details);
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (error) {
      setError('Failed to verify payment status');
    }
  };

  const validateForm = () => {
    if (!formData.phone.match(/^\d{10}$/)) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowForm(true);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // First check if email/phone is already registered
      const checkResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/check-registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone,
        }),
      });

      const checkData = await checkResponse.json();
      
      if (!checkResponse.ok) {
        throw new Error(checkData.message || 'Registration check failed');
      }

      // If not registered, initialize payment
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/initialize-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          amount: selectedPlan.amount,
          package: selectedPlan.name
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Payment initialization failed');
      }

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        throw new Error('Payment URL not received');
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToPlans = () => {
    setShowForm(false);
    setSelectedPlan(null);
    setError('');
  };

  const StatusModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="text-center">
          {paymentStatus === 'success' ? (
            <div className="text-green-600 mb-4">
              <Check className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-bold">Registration Successful!</h3>
              <p className="mt-2">Please check your email for registration details.</p>
            </div>
          ) : (
            <div className="text-red-600 mb-4">
              <AlertCircle className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-bold">Payment Failed</h3>
              <p className="mt-2">Please try again or contact support.</p>
            </div>
          )}
          <button
            onClick={() => setShowStatusModal(false)}
            className="mt-4 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 py-12 px-4">
      {showStatusModal && <StatusModal />}
      
      <div className="max-w-6xl mx-auto">
        {/* Rest of your existing JSX remains the same */}
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Crown className="w-12 h-12 text-amber-500" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
            Trading Summit Registration
          </h1>
          <p className="text-lg text-gray-600">Elevate your trading journey with our premium packages</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="max-w-2xl mx-auto mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700">{success}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Plans Selection View */}
        {!showForm ? (
          <div className="grid md:grid-cols-3 gap-8 mx-auto max-w-5xl">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative ${plan.color} rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 ${plan.scale} border-2 ${plan.borderColor}`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 right-0 mt-4 mr-4">
                    <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-4 h-4 mr-1" /> Premium
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-extrabold text-amber-600">₹{plan.amount}</span>
                    <span className="ml-2 text-gray-500">/person</span>
                  </div>

                  <ul className="mb-8 space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <Check className="w-5 h-5 mr-3 text-amber-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handlePlanSelect(plan)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition duration-200 
                      ${plan.recommended
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:from-amber-600 hover:to-yellow-600 shadow-lg'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                  >
                    {plan.recommended ? 'Get Started Now' : 'Select Plan'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto border-2 border-amber-200">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-amber-700">Registration Form</h2>
              <button
                onClick={handleBackToPlans}
                className="flex items-center text-amber-600 hover:text-amber-700 font-medium"
              >
                ← Back to Plans
              </button>
            </div>

            <div className="mb-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="text-lg font-medium mb-2 text-amber-700">Selected Plan:</h3>
              <p className="text-amber-600 text-xl font-bold">{selectedPlan.name} - ₹{selectedPlan.amount}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter 10-digit phone number"
                  required
                  pattern="[0-9]{10}"
                  className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  placeholder="Enter your full address"
                  required
                  className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  rows="3"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-lg text-white font-semibold text-lg
                  ${loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 shadow-lg'
                  } transition duration-200`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Processing...
                  </span>
                ) : (
                  'Proceed to Payment'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
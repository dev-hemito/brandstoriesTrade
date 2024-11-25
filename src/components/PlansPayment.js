import { useState } from 'react';
import { Check, Star, Crown } from 'lucide-react';

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
  const [showForm, setShowForm] = useState(false);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowForm(true);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/register', {
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
        throw new Error(data.error || 'Something went wrong');
      }

      if (data.paymentUrl) {
        sessionStorage.setItem('ticketNumber', data.ticketNumber);
        sessionStorage.setItem('orderId', data.orderId);
        window.location.href = data.paymentUrl;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Crown className="w-12 h-12 text-amber-500" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
            Trading Summit Registration
          </h1>
          <p className="text-lg text-gray-600">Elevate your trading journey with our premium packages</p>
        </div>

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
                  className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
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
                  className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
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
                  placeholder="Enter your phone number"
                  required
                  className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
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
                  className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
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
                {loading ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </form>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg max-w-2xl mx-auto">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}


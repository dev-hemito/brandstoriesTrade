import { useState } from 'react';
import { XCircle } from 'lucide-react';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const packages = [
    { id: 1, name: 'Basic Package', amount: 1000, features: ['Basic Features', 'Email Support', 'Documentation'] },
    { id: 2, name: 'Standard Package', amount: 2000, features: ['All Basic Features', 'Phone Support', 'Live Sessions'] },
    { id: 3, name: 'Premium Package', amount: 5000, features: ['All Standard Features', '24/7 Support', 'VIP Access'] }
  ];

  const ErrorModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full relative">
        <button 
          onClick={() => setShowError(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <XCircle className="w-6 h-6" />
        </button>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-red-600 mb-2">Registration Error</h3>
          <p className="text-gray-600">{errorMessage}</p>
        </div>
      </div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPackage) {
      setErrorMessage('Please select a package');
      setShowError(true);
      return;
    }

    setLoading(true);
    try {
      // Check if already registered
      const checkResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/check-registration`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          phone: formData.phone
        })
      });

      const checkData = await checkResponse.json();
      
      if (!checkResponse.ok) {
        setErrorMessage(checkData.message || 'Already registered');
        setShowError(true);
        return;
      }

      // If not registered, proceed with registration and payment
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amount: selectedPackage.amount,
          packageType: selectedPackage.name
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Redirect to payment page
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }

    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong');
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {showError && <ErrorModal />}
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Trading Summit Registration</h2>
          <p className="mt-2 text-gray-600">Choose your package and complete registration</p>
        </div>

        {/* Package Selection */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg)}
              className={`${
                selectedPackage?.id === pkg.id
                  ? 'ring-2 ring-blue-500 bg-blue-50'
                  : 'bg-white hover:bg-gray-50'
              } cursor-pointer rounded-lg p-6 shadow-sm border transition-all duration-200`}
            >
              <h3 className="text-lg font-semibold text-gray-900">{pkg.name}</h3>
              <p className="mt-2 text-2xl font-bold text-gray-900">₹{pkg.amount}</p>
              <ul className="mt-4 space-y-2">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    • {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-8">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                required
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !selectedPackage}
              className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                loading || !selectedPackage
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } transition-colors duration-200`}
            >
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
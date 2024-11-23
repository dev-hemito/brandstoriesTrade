'use client'

import { Check, Mail } from 'lucide-react';

export default function RegistrationSuccess() {
  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-2">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 transform transition-all animate-fade-in">
        {/* Success Icon */}
        <div className=" flex justify-center">
          <div className="bg-green-100 p-2 rounded-full">
            <div className="bg-green-200 rounded-full p-2">
              <Check className="w-12 h-12 text-green-600" />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Welcome Aboard! 🎉
        </h1>
        
        <p className="text-center text-gray-600 mb-8">
          Your registration was successful! We're excited to have you join our community.
        </p>

        {/* Email Notice */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-blue-600 mr-2" />
            <span className="text-blue-600 font-semibold">Check Your Email</span>
          </div>
          <p className="text-sm text-gray-600 text-center">
            We've sent all the important details to your registered email address. Please check your inbox (and spam folder, just in case).
          </p>
        </div>

        {/* What to Expect Section */}
        {/* <div className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold text-gray-800">What's next?</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 mt-1.5 mr-2"></span>
              Verify your email address using the link we sent
            </p>
            <p className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mt-1.5 mr-2"></span>
              Complete your profile setup
            </p>
            <p className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mt-1.5 mr-2"></span>
              Explore our platform features
            </p>
          </div>
        </div> */}

        {/* Return to Home Button */}
        <button 
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg py-3 px-4 font-medium hover:opacity-90 transition-opacity"
          onClick={() => window.location.href = '/'}
        >
          Return to Homepage
        </button>
      </div>
    </div>
  );
}
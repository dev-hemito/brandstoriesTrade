'use client'

import { Check, Mail, Tag, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function RegistrationSuccess() {
  const searchParams = useSearchParams();
  const [isUpdating, setIsUpdating] = useState(true);
  const [error, setError] = useState(null);
  
  const orderId = searchParams.get('orderId');
  const ticketNumber = searchParams.get('ticketNumber');

  useEffect(() => {
    const updatePaymentStatus = async () => {
      try {
        if (!orderId) return;
        
        const response = await fetch('/api/update-payment-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId }),
        });

        if (!response.ok) {
          throw new Error('Failed to update payment status');
        }
        
      } catch (err) {
        console.error('Error updating payment status:', err);
        setError('Failed to update payment status');
      } finally {
        setIsUpdating(false);
      }
    };

    updatePaymentStatus();
  }, [orderId]);

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-2">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 transform transition-all animate-fade-in">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="bg-green-100 p-2 rounded-full">
            <div className="bg-green-200 rounded-full p-2">
              <Check className="w-12 h-12 text-green-600" />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Payment Successful! 🎉
        </h1>
        
        <p className="text-center text-gray-600 mb-8">
          Your registration and payment have been confirmed. Welcome to the Trading Summit!
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm text-gray-600">Order ID: <span className="font-semibold">{orderId}</span></span>
            </div>
            <div className="flex items-center">
              <Tag className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm text-gray-600">Ticket Number: <span className="font-semibold">{ticketNumber}</span></span>
            </div>
          </div>
        </div>

        {/* Email Notice */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-blue-600 mr-2" />
            <span className="text-blue-600 font-semibold">Check Your Email</span>
          </div>
          <p className="text-sm text-gray-600 text-center">
            We've sent your confirmation and ticket details to your registered email address. Please check your inbox (and spam folder, just in case).
          </p>
        </div>

        {/* Error Message if any */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

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
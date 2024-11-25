'use client'
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Check, AlertCircle, Loader2 } from 'lucide-react';

// Separate component that uses useSearchParams
function PaymentStatusContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        let orderId = null;

        // Safely check for form data
        if (typeof document !== 'undefined') {
          const form = document.querySelector('form');
          if (form) {
            const formData = new FormData(form);
            orderId = formData.get('merchantTransactionId');
          }
        }

        // Safely check URL params
        if (!orderId && searchParams) {
          orderId = searchParams.get('orderId');
        }

        if (!orderId) {
          setStatus('error');
          setError('No order ID found');
          return;
        }

        const response = await fetch('/api/payment-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Payment verification failed');
        }

        const data = await response.json();

        if (data.status === 'success') {
          setStatus('success');
          // Safely clear URL parameters
          if (typeof window !== 'undefined' && window.history.replaceState) {
            window.history.replaceState({}, '', window.location.pathname);
          }
        } else {
          setStatus('failed');
          setError(data.message || 'Payment verification failed');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setStatus('error');
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      }
    };

    // Only run verification if we're in the browser
    if (typeof window !== 'undefined') {
      verifyPayment();
    }
  }, [searchParams]);

  const handleContinue = () => {
    router.push('/');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
      {status === 'loading' && (
        <div className="text-center">
          <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-amber-500" />
          <h2 className="text-xl font-bold mb-2">Verifying Payment</h2>
          <p className="text-gray-600">Please wait while we verify your payment...</p>
        </div>
      )}

      {status === 'success' && (
        <div className="text-center">
          <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold mb-2 text-green-600">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your registration has been confirmed. Please check your email for the ticket details.
          </p>
          <button
            onClick={handleContinue}
            className="w-full py-3 px-6 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg font-semibold hover:from-amber-600 hover:to-yellow-600 transition duration-200"
          >
            Continue
          </button>
        </div>
      )}

      {(status === 'failed' || status === 'error') && (
        <div className="text-center">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold mb-2 text-red-600">Payment Failed</h2>
          <p className="text-gray-600 mb-2">
            {error || 'We could not process your payment. Please try again.'}
          </p>
          <p className="text-gray-600 mb-6">
            If you think this is a mistake, please contact support.
          </p>
          <button
            onClick={handleContinue}
            className="w-full py-3 px-6 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg font-semibold hover:from-amber-600 hover:to-yellow-600 transition duration-200"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
      <div className="text-center">
        <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-amber-500" />
        <h2 className="text-xl font-bold mb-2">Loading...</h2>
        <p className="text-gray-600">Please wait...</p>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function PaymentStatus() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 flex items-center justify-center p-4">
      <Suspense fallback={<LoadingFallback />}>
        <PaymentStatusContent />
      </Suspense>
    </div>
  );
}
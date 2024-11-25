// app/api/payment-status/route.js
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const headersList = headers();
    const origin = headersList.get('origin') || process.env.NEXT_PUBLIC_BASE_URL;
    
    // Only attempt to parse origin if it's a valid URL string
    let originDomain;
    try {
      if (origin && origin !== 'null') {
        originDomain = new URL(origin).host;
      }
    } catch (e) {
      console.warn('Invalid origin header:', origin);
    }

    const body = await request.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Make request to your payment verification endpoint
    const verificationResponse = await fetch(
      `${process.env.BACKEND_URL}/api/check-payment-status`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      }
    );

    const paymentData = await verificationResponse.json();

    return NextResponse.json(paymentData);
  } catch (error) {
    console.error('Payment status verification error:', error);
    return NextResponse.json(
      { error: 'Payment status verification failed', message: error.message },
      { status: 500 }
    );
  }
}

// Optional: Add middleware to handle CORS if needed
export const middleware = async (request) => {
  const response = NextResponse.next();
  
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );
  
  return response;
};

export const config = {
  matcher: '/api/payment-status',
};
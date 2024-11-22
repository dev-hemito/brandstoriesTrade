import { NextResponse } from 'next/server';
import crypto from 'crypto';

const MERCHANT_ID = process.env.NEXT_PUBLIC_PHONEPE_MERCHANT_ID;
const SALT_KEY = process.env.NEXT_PUBLIC_PHONEPE_SALT_KEY;
const SALT_INDEX = process.env.NEXT_PUBLIC_PHONEPE_SALT_INDEX;

// Simple rate limiting implementation
const rateLimiter = {
    requests: {},
    maxRequests: 100,  // Max requests per window
    windowMs: 15 * 60 * 1000,  // 15 minutes

    cleanup() {
        const now = Date.now();
        Object.keys(this.requests).forEach(key => {
            if (now - this.requests[key].timestamp > this.windowMs) {
                delete this.requests[key];
            }
        });
    },

    isRateLimited(ip) {
        this.cleanup();
        
        const now = Date.now();
        if (!this.requests[ip]) {
            this.requests[ip] = {
                count: 1,
                timestamp: now
            };
            return false;
        }

        // Reset if window has passed
        if (now - this.requests[ip].timestamp > this.windowMs) {
            this.requests[ip] = {
                count: 1,
                timestamp: now
            };
            return false;
        }

        // Increment count
        this.requests[ip].count++;
        return this.requests[ip].count > this.maxRequests;
    }
};

// Helper function to generate SHA-256 checksum
const generateChecksum = (string) => {
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    return `${sha256}###${SALT_INDEX}`;
};

// Helper function to add delay between retries
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to make PhonePe API request with retries
async function makePhonePeRequest(base64Payload, checksum, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch('https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-VERIFY': checksum,
                    accept: 'application/json'
                },
                body: JSON.stringify({
                    request: base64Payload
                })
            });

            const responseData = await response.json();

            if (response.status === 429 && attempt < retries) {
                const backoffTime = Math.pow(2, attempt) * 1000;
                console.log(`Rate limited, waiting ${backoffTime}ms before retry ${attempt + 1}`);
                await delay(backoffTime);
                continue;
            }

            return { response, responseData };
        } catch (error) {
            if (attempt === retries) throw error;
            const backoffTime = Math.pow(2, attempt) * 1000;
            await delay(backoffTime);
        }
    }
}

export async function POST(request) {
    try {
        // Get client IP from various headers
        const forwardedFor = request.headers.get('x-forwarded-for');
        const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 
                  request.headers.get('x-real-ip') || 
                  request.ip || 
                  '127.0.0.1';

        console.log('Request IP:', ip); // Debug log

        // Check rate limit
        if (rateLimiter.isRateLimited(ip)) {
            console.log('Rate limited IP:', ip, 'Current count:', rateLimiter.requests[ip]?.count); // Debug log
            return NextResponse.json({
                success: false,
                message: 'Too many requests. Please try again later.'
            }, { 
                status: 429,
                headers: {
                    'Retry-After': '900' // 15 minutes in seconds
                }
            });
        }

        const { amount, userData } = await request.json();
        console.log('Received request:', { amount, userData });

        // Validate input
        if (!amount || !userData || !userData.phone) {
            return NextResponse.json({
                success: false,
                message: 'Invalid request parameters'
            }, { status: 400 });
        }

        // Create a unique transaction ID with timestamp and random string
        const merchantTransactionId = `MT${Date.now()}${Math.random().toString(36).substring(2, 8)}`;
        
        // Create the payload object
        const payloadObject = {
            merchantId: MERCHANT_ID,
            merchantTransactionId: merchantTransactionId,
            merchantUserId: `MUID${Date.now()}`,
            amount: amount * 100,
            redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment-callback`,
            redirectMode: 'POST',
            callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment-callback`,
            mobileNumber: userData.phone,
            paymentInstrument: {
                type: 'PAY_PAGE'
            }
        };

        // Convert payload to base64
        const base64Payload = Buffer.from(JSON.stringify(payloadObject)).toString('base64');
        
        // Generate checksum
        const checksum = generateChecksum(`${base64Payload}/pg/v1/pay${SALT_KEY}`);

        console.log('Making request to PhonePe:', {
            merchantTransactionId,
            amount: amount * 100
        });

        // Make request to PhonePe with retry logic
        const { response, responseData } = await makePhonePeRequest(base64Payload, checksum);

        if (responseData.success) {
            return NextResponse.json({
                success: true,
                redirectUrl: responseData.data.instrumentResponse.redirectInfo.url,
                merchantTransactionId
            });
        } else {
            console.error('PhonePe error response:', responseData);
            
            const errorMessages = {
                'TOO_MANY_REQUESTS': 'Service is temporarily busy. Please try again in a few moments.',
                'INVALID_REQUEST': 'Invalid request. Please check your details and try again.',
                'SERVER_ERROR': 'An error occurred. Please try again later.'
            };

            return NextResponse.json({
                success: false,
                message: errorMessages[responseData.code] || responseData.message || 'Payment initiation failed',
                code: responseData.code
            }, { 
                status: responseData.code === 'TOO_MANY_REQUESTS' ? 429 : 400 
            });
        }
    } catch (error) {
        console.error('Payment creation error:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'An unexpected error occurred. Please try again later.', 
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}
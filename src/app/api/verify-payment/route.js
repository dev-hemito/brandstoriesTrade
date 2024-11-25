// api/verify-payment/route.js

import { NextResponse } from 'next/server';
import crypto from 'crypto';

class PhonePeClient {
  constructor() {
    this.merchantId = "M222SS2TMFN4X";
    this.saltKey = "a1412432-d03f-4913-be4c-60e00d78865e";
    this.saltIndex = 1;
    this.apiUrl = "https://api.phonepe.com/apis/hermes/pg/v1";
  }

  generateChecksum(payload, apiEndpoint) {
    try {
      const payloadString = typeof payload === 'string'
        ? payload
        : JSON.stringify(payload);

      const base64Payload = Buffer.from(payloadString).toString('base64');
      const string = `${base64Payload}${apiEndpoint}${this.saltKey}`;
      const sha256 = crypto.createHash('sha256').update(string).digest('hex');
      return `${sha256}###${this.saltIndex}`;
    } catch (error) {
      console.error('Checksum generation error:', error);
      throw new Error('Failed to generate checksum');
    }
  }
}

export async function POST(request) {
  try {
    const { orderId, transactionId } = await request.json();
    
    if (!orderId || !transactionId) {
      return NextResponse.json(
        { error: 'Order ID and transaction ID are required' },
        { status: 400 }
      );
    }

    const phonePe = new PhonePeClient();
    const merchantTransactionId = orderId.substring(0, 35);
    
    // Generate checksum for status check
    const checksum = phonePe.generateChecksum(
      merchantTransactionId,
      `/pg/v1/status/${phonePe.merchantId}/${merchantTransactionId}`
    );

    // Call PhonePe status API
    const response = await fetch(
      `${phonePe.apiUrl}/status/${phonePe.merchantId}/${merchantTransactionId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
          'X-MERCHANT-ID': phonePe.merchantId
        }
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Payment verification failed');
    }

    // Check the actual payment status
    const paymentStatus = data.code === 'PAYMENT_SUCCESS' ? 'success' : 'failed';

    return NextResponse.json({
      success: true,
      status: paymentStatus,
      details: data
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment status' },
      { status: 500 }
    );
  }
}
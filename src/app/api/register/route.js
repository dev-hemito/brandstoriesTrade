import nodemailer from 'nodemailer';
import { getSheet } from '../sheets';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

class PhonePeClient {
  constructor() {
    this.merchantId = "M222SS2TMFN4X";
    this.saltKey = "a1412432-d03f-4913-be4c-60e00d78865e";
    this.saltIndex = 1;
    this.apiUrl = "https://api.phonepe.com/apis/hermes/pg/v1";
    this.maxRetries = 3;
    this.baseDelay = 1000;
  }

  generateChecksum(payload, apiEndpoint) {
    try {
      // Ensure the payload is a string before base64 encoding
      const payloadString = typeof payload === 'string'
        ? payload
        : JSON.stringify(payload);

      const base64Payload = Buffer.from(payloadString).toString('base64');
      const string = `${base64Payload}${apiEndpoint}${this.saltKey}`;
      const sha256 = crypto.createHash('sha256').update(string).digest('hex');
      return `${sha256}###${this.saltIndex}`;
    } catch (error) {
      console.error('Checksum generation error:', error);
      console.log('Failed to generate checksum');
    }
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async makeRequest(url, options, retryCount = 0) {
    try {
      console.log('Making request to:', url);
      console.log('Request options:', JSON.stringify(options, null, 2));

      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const data = await response.json();
      console.log('Response data:', JSON.stringify(data, null, 2));

      if (!response.ok) {
        const errorMessage = data.message || 'API request failed';
        console.error('API Error:', errorMessage);

        if (response.status === 429 && retryCount < this.maxRetries) {
          const delayTime = this.baseDelay * Math.pow(2, retryCount);
          await this.delay(delayTime);
          return this.makeRequest(url, options, retryCount + 1);
        }
        console.log(errorMessage);
      }

      return data;
    } catch (error) {
      console.error('Request error:', error);
      if (retryCount < this.maxRetries) {
        const delayTime = this.baseDelay * Math.pow(2, retryCount);
        await this.delay(delayTime);
        return this.makeRequest(url, options, retryCount + 1);
      }
      throw error;
    }
  }

  async initiatePayment(paymentData) {
    try {
      // Validate required fields
      const requiredFields = ['orderId', 'email', 'amount', 'phone'];
      for (const field of requiredFields) {
        if (!paymentData[field]) {
          console.log(`Missing required field: ${field}`);
        }
      }

      // Ensure amount is a valid number and convert to paise
      const amountInPaise = Math.round(parseFloat(paymentData.amount) * 100);
      if (isNaN(amountInPaise) || amountInPaise <= 0) {
        console.log('Invalid amount');
      }

      // Validate phone number format
      const phoneNumber = paymentData.phone.replace(/\D/g, '');
      if (phoneNumber.length !== 10) {
        console.log('Invalid phone number format');
      }

      const payload = {
        merchantId: this.merchantId,
        merchantTransactionId: paymentData.orderId.substring(0, 35), // Ensure within length limit
        merchantUserId: paymentData.email.substring(0, 50), // Ensure within length limit
        amount: amountInPaise,
        redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
        redirectMode: "POST",
        callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment-webhook`,
        mobileNumber: phoneNumber,
        paymentInstrument: {
          type: "PAY_PAGE"
        }
      };

      console.log('Payment payload:', JSON.stringify(payload, null, 2));

      // Base64 encode the payload first
      const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
      const checksum = this.generateChecksum(payload, "/pg/v1/pay");

      const options = {
        method: "POST",
        headers: {
          'X-VERIFY': checksum
        },
        body: JSON.stringify({
          request: base64Payload
        })
      };

      const response = await this.makeRequest(`${this.apiUrl}/pay`, options);
      if (!response.success) {
        console.log(response.message || 'Payment initialization failed');
      }
      return response;
    } catch (error) {
      console.error('Payment initiation error:', error);
      throw error;
    }
  }
}
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, amount, address, package: packageType } = body;
    // Input validation
    if (!name || !email || !phone || !amount || !address || !packageType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    // Validate phone number
    if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }
    // Validate amount
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }
    const sheet = await getSheet();
    const rows = await sheet.getRows();
    const isDuplicate = rows.some(row =>
      row.get('email') === email || row.get('phone') === phone
    );
    if (isDuplicate) {
      return NextResponse.json(
        { error: 'Email or phone number already registered' },
        { status: 400 }
      );
    }
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const ticketNumber = `BSKTETC24${randomNum}`;
    const orderId = `ORDER_${Date.now()}_${randomNum}`;
    const phonePe = new PhonePeClient();
    const paymentResponse = await phonePe.initiatePayment({
      orderId,
      email,
      amount: numAmount,
      phone
    });
    await sheet.addRow({
      name,
      email,
      phone,
      address,
      package: packageType,
      paymentStatus: 'Pending',
      orderId,
      ticketNumber,
      timestamp: new Date().toISOString()
    });
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.in',
      port: 465,
      secure: true,
      auth: {
        user: process.env.NEXT_PUBLIC_SMTP_EMAIL?.trim(),
        pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD?.trim(),
      }
    });
    await transporter.sendMail({
      from: {
        name: 'The Brand Stories',
        address: process.env.NEXT_PUBLIC_SMTP_EMAIL
      },
      to: email,
      subject: 'Registration Initiated - Trading Summit',
      html: `
        <h1>Registration Initiated!</h1>
        <p>Dear ${name},</p>
        <p>Your registration for the Trading Summit is being processed.</p>
        <p>Your ticket number is: <strong>${ticketNumber}</strong></p>
        <p>Please complete the payment to confirm your registration.</p>
        <p>This ticket number will be activated after successful payment.</p>
      `
    });
    return NextResponse.json({
      success: true,
      paymentUrl: paymentResponse?.data?.instrumentResponse.redirectInfo.url,
      ticketNumber,
      orderId
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        error: 'Registration failed',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

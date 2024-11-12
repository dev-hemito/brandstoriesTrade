// /app/api/verify-payment/route.js
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { getSheet } from '../sheets';

// Initialize Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NEXT_PUBLIC_SMTP_EMAIL,
    pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
  },
});

export async function POST(request) {
    console.log('Verifying payment and saving registration...');
    try {
        const { 
            razorpay_order_id, 
            razorpay_payment_id, 
            razorpay_signature,
            userData
        } = await request.json();

        console.log('Payment verification data:', {
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            userData
        });

        // Verify payment signature
        const generatedSignature = crypto
            .createHmac('sha256', process.env.NEXT_PUBLIC_RAZORPAY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        const isAuthentic = generatedSignature === razorpay_signature;
        console.log('Payment verification result:', isAuthentic);

        if (!isAuthentic) {
            console.log('Payment verification failed');
            return NextResponse.json({
                success: false,
                message: 'Payment verification failed'
            });
        }

        // Generate ticket number
        const ticketNumber = `BSKTIC25${Math.floor(10000 + Math.random() * 90000)}`;

        // Save to Google Sheets
        const sheet = await getSheet();
        await sheet.addRow({
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            address: userData.address,
            package: userData.package,
            paymentStatus: 'Success',
            paymentId: razorpay_payment_id,
            ticketNumber: ticketNumber,
            timestamp: new Date().toISOString(),
        });

        console.log('Registration saved to sheets');

        // Send confirmation email
        try {
            await transporter.sendMail({
                from: process.env.NEXT_PUBLIC_SMTP_EMAIL,
                to: userData.email,
                subject: 'Registration Successful - Trading Summit',
                html: `
                    <h1>Registration Successful!</h1>
                    <p>Dear ${userData.name},</p>
                    <p>Thank you for registering for the Trading Summit.</p>
                    <p>Your ticket number is: <strong>${ticketNumber}</strong></p>
                    <p>Please keep this number for future reference.</p>
                `,
            });
            console.log('Confirmation email sent');
        } catch (emailError) {
            console.error('Error sending confirmation email:', emailError);
            // Continue with success response even if email fails
        }

        return NextResponse.json({
            success: true,
            ticketNumber
        });
    } catch (error) {
        console.error('Payment verification error:', error);
        return NextResponse.json(
            { success: false, message: 'Error processing payment verification', error: error.message }, 
            { status: 500 }
        );
    }
}
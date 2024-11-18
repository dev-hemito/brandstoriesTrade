// /app/api/verify-payment/route.js
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { getSheet } from '../sheets';

// Initialize Email Transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.in', // Changed to .in domain
    port: 465,
    secure: true,
    auth: {
        user: process.env.NEXT_PUBLIC_SMTP_EMAIL?.trim(), // Trim any whitespace
        pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD?.trim(), // Trim any whitespace
    },
    debug: true,
    logger: true
});


const testTransporter = async () => {
    try {
        const verified = await transporter.verify();
        console.log('SMTP connection verified:', verified);
        return verified;
    } catch (error) {
        console.error('SMTP verification failed:', {
            error: error.message,
            user: process.env.NEXT_PUBLIC_SMTP_EMAIL,
            // Don't log the actual password
            hasPassword: !!process.env.NEXT_PUBLIC_SMTP_PASSWORD
        });
        return false;
    }
};
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
            const mailOptions = {
                from: {
                    name: 'The Brand Stories',
                    address: process.env.NEXT_PUBLIC_SMTP_EMAIL
                },
                to: userData.email,
                subject: 'Registration Successful - Trading Summit',
                html: `
                    <h1>Registration Successful!</h1>
                    <p>Dear ${userData.name},</p>
                    <p>Thank you for registering for the Trading Summit.</p>
                    <p>Your ticket number is: <strong>${ticketNumber}</strong></p>
                    <p>Please keep this number for future reference.</p>
                `
            };

            console.log('Sending email with configuration:', {
                host: transporter.options.host,
                port: transporter.options.port,
                secure: transporter.options.secure,
                user: process.env.NEXT_PUBLIC_SMTP_EMAIL
            });

            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', info.messageId);
        } catch (emailError) {
            console.error('Email sending failed:', {
                error: emailError.message,
                code: emailError.code,
                response: emailError.response,
                command: emailError.command
            });
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
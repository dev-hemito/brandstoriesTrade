import { getSheet } from '../sheets';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { orderId, status } = await request.json();
    
    if (!orderId || !status) {
      return NextResponse.json(
        { error: 'Order ID and status are required' },
        { status: 400 }
      );
    }

    const sheet = await getSheet();
    const rows = await sheet.getRows();
    
    const orderRow = rows.find(row => row.get('orderId') === orderId);
    
    if (!orderRow) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Update payment status based on verification result
    const newStatus = status === 'success' ? 'Success' : 'Failed';
    orderRow.set('paymentStatus', newStatus);
    await orderRow.save();

    // If payment was successful, send confirmation email
    if (status === 'success') {
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
        to: orderRow.get('email'),
        subject: 'Registration Confirmed - Trading Summit',
        html: `
          <h1>Registration Confirmed!</h1>
          <p>Dear ${orderRow.get('name')},</p>
          <p>Your registration for the Trading Summit has been confirmed!</p>
          <p>Registration Details:</p>
          <ul>
            <li>Ticket Number: <strong>${orderRow.get('ticketNumber')}</strong></li>
            <li>Package: ${orderRow.get('package')}</li>
            <li>Order ID: ${orderId}</li>
          </ul>
          <p>Keep this ticket number safe as you'll need it for entry.</p>
          <p>We're excited to have you join us!</p>
        `
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Payment status updated successfully'
    });
  } catch (error) {
    console.error('Payment status update error:', error);
    return NextResponse.json(
      { error: 'Failed to update payment status' },
      { status: 500 }
    );
  }
}
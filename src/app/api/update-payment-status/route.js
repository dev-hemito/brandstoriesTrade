// File: app/api/update-payment-status/route.js
import { getSheet } from '../sheets';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { orderId } = await request.json();
    
    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
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

    // Update payment status
    orderRow.set('paymentStatus', 'Success');
    await orderRow.save();

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

import { NextResponse } from 'next/server';
import { getSheet } from '../sheets';
import crypto from 'crypto';

const SALT_KEY = process.env.NEXT_PUBLIC_PHONEPE_SALT_KEY;
const SALT_INDEX = process.env.NEXT_PUBLIC_PHONEPE_SALT_INDEX;

export async function POST(request) {
    try {
        const response = await request.json();
        console.log('Callback received:', response);
        
        // Verify the callback signature
        const string = `/pg/v1/status/${response.merchantId}/${response.merchantTransactionId}${SALT_KEY}`;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const xVerify = `${sha256}###${SALT_INDEX}`;

        // Verify payment status with PhonePe
        const statusResponse = await fetch(
            `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${response.merchantId}/${response.merchantTransactionId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-VERIFY': xVerify,
                    'X-MERCHANT-ID': response.merchantId
                }
            }
        );

        const statusData = await statusResponse.json();
        console.log('Status check response:', statusData);

        if (statusData.success && statusData.code === 'PAYMENT_SUCCESS') {
            // Save to Google Sheets
            try {
                const sheet = await getSheet();
                await sheet.addRow({
                    timestamp: new Date().toISOString(),
                    name: response.userData.name,
                    email: response.userData.email,
                    phone: response.userData.phone,
                    package: response.userData.package,
                    amount: response.amount / 100,
                    transaction_id: response.merchantTransactionId,
                    payment_id: statusData.data.transactionId,
                    status: 'SUCCESS'
                });
            } catch (error) {
                console.error('Error saving to sheets:', error);
            }

            // Redirect to success page
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_BASE_URL}/success?reference=${response.merchantTransactionId}`
            );
        } else {
            console.log('Payment verification failed:', statusData);
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_BASE_URL}/failure`
            );
        }
    } catch (error) {
        console.error('Payment callback error:', error);
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_BASE_URL}/failure`
        );
    }
}
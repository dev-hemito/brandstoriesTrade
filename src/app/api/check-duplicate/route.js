// /app/api/check-duplicate/route.js
import { NextResponse } from 'next/server';
import { getSheet } from '../sheets';

export async function POST(request) {
    console.log('Checking for duplicate registration...');
    try {
        const { email, phone } = await request.json();
        console.log('Checking for:', { email, phone });

        const sheet = await getSheet();
        const rows = await sheet.getRows();
        
        const isDuplicate = rows.some(row => 
            row.get('email') === email || row.get('phone') === phone
        );

        console.log('Duplicate check result:', isDuplicate);
        return NextResponse.json({ isDuplicate });
    } catch (error) {
        console.error('Duplicate check error:', error);
        return NextResponse.json(
            { message: 'Error checking duplicate registration', error: error.message }, 
            { status: 500 }
        );
    }
}


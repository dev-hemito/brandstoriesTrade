// /app/api/sheets.js - Create a utility file for Google Sheets setup
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_SHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_PRIVATE_KEY;

export async function getSheet() {
  try {
    const serviceAccountAuth = new JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file',
      ],
    });

    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    return doc.sheetsByIndex[0];
  } catch (error) {
    console.error('Error accessing Google Sheet:', error);
    throw new Error(`Failed to access Google Sheet: ${error.message}`);
  }
}


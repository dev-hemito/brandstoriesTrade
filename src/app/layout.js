import localFont from "next/font/local";
import { Besley } from 'next/font/google';
import "./globals.css";

const besley = Besley({ subsets: ['latin'] });


export const metadata = {
  title: "Brand Stories - Kerala Traders Investors Conclave 2025",
  description: "South Indias biggest Traders and Investors Conclave. The conclave will encompass live training, special classes, investment mentoring sessions, seminars, discussions and training strategies.",
  keywords: '',
  openGraph: {
    title: 'Brand Stories - Kerala Traders Investors Conclave 2025',
    description: 'South Indias biggest Traders and Investors Conclave. The conclave will encompass live training, special classes, investment mentoring sessions, seminars, discussions and training strategies.',
    // url: 'https://register.flynetwork.in/',
    images: [
      {
        url: '/traders.png',
        alt: 'Brand Stories - Kerala Traders Investors Conclave 2025',
      },
    ],
    siteName: 'Brand Stories - Kerala Traders Investors Conclave 2025',
  },
  icons: {
    icon: '/traders.png',
    shortcut: '/traders.png',
    apple: '/traders.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/traders.png',
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${besley.className} bg-white text-black`}
      >
        {children}
      </body>
    </html>
  );
}

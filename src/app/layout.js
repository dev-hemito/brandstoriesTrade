import localFont from "next/font/local";
import { Besley } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";
import Header from "@/components/Header";

// Initialize Besley font with display swap for better performance
const besley = Besley({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-besley'
});

export const metadata = {
  title: "Brand Stories - Kerala Traders Investors Conclave 2025",
  description: "South India's biggest Traders and Investors Conclave. The conclave will encompass live training, special classes, investment mentoring sessions, seminars, discussions and training strategies.",
  keywords: 'traders conclave, investors meet, kerala trading, investment strategies, financial training, south india trading',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    title: 'Brand Stories - Kerala Traders Investors Conclave 2025',
    description: 'South India\'s biggest Traders and Investors Conclave. The conclave will encompass live training, special classes, investment mentoring sessions, seminars, discussions and training strategies.',
    images: [
      {
        url: '/traders.png',
        width: 1200,
        height: 630,
        alt: 'Brand Stories - Kerala Traders Investors Conclave 2025',
      },
    ],
    siteName: 'Brand Stories - Kerala Traders Investors Conclave 2025',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brand Stories - Kerala Traders Investors Conclave 2025',
    description: 'South India\'s biggest Traders and Investors Conclave',
    images: ['/traders.png'],
  },
  icons: {
    icon: [
      { url: '/traders.png', type: 'image/png', sizes: '32x32' },
      { url: '/traders.png', type: 'image/png', sizes: '16x16' }
    ],
    apple: [
      { url: '/traders.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/traders.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={besley.variable}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-P9Q8NS89');`
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className={`${besley.className} bg-white text-black min-h-screen flex flex-col`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-P9Q8NS89"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
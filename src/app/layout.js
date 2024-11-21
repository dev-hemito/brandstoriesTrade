import React from 'react';
import { Besley } from 'next/font/google';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';
import Header from "@/components/Header";
import "./globals.css";

// Initialize Besley font with display swap for better performance
const besley = Besley({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-besley'
});

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className={besley.variable}>
      <head>
        {/* Google Tag Manager Script */}
        <script 
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','G-ZRDBET9NRY');`
          }}
        />

        {/* Meta Pixel Code */}
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1784318859004862');
              fbq('track', 'PageView');
            `
          }}
        />
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

        {/* Meta Pixel Code (noscript) */}
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1784318859004862&ev=PageView&noscript=1"
          />
        </noscript>

        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;

// Metadata (typically in a separate file or exported separately)
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
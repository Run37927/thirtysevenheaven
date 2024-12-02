import { Mulish } from 'next/font/google'
import "./globals.css";
import { cn, constructMetadata } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import Providers from '@/components/Providers';
import { Analytics } from "@vercel/analytics/react"

const mulish = Mulish({ subsets: ['latin'] });

export const metadata = constructMetadata();

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='light'>
      <head>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="80c57619-1418-4553-b438-c2a7387cceb5"></script>
      </head>
      <body className={cn('min-h-screen font-sans antialiased', mulish.className)}>
        <Providers>
          <Toaster />
          <Navbar />
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}

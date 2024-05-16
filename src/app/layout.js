import { Mulish } from 'next/font/google'
import "./globals.css";
import { cn, constructMetadata } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import Providers from '@/components/Providers';

const mulish = Mulish({ subsets: ['latin'] });

export const metadata = constructMetadata();

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='light'>
      <head>
        <script defer src="https://analytics.us.umami.is/script.js" data-website-id="023582fe-04a1-444d-875d-37bd7c2b547c"></script>
      </head>
      <body className={cn('min-h-screen font-sans antialiased', mulish.className)}>
        <Providers>
          <Toaster />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

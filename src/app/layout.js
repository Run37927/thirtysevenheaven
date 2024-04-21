import { Mulish } from 'next/font/google'
import "./globals.css";
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';

const mulish = Mulish({ subsets: ['latin'] });

export const metadata = {
  title: "37 Heaven - A collection of all things 37",
  description: "A collection of all things 37",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='light'>
      <body className={cn('min-h-screen font-sans antialiased', mulish.className)}>
        <Toaster />
        <Navbar />
        {children}
      </body>
    </html>
  );
}

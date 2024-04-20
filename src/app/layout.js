import { Mulish } from 'next/font/google'
import "./globals.css";
import { cn } from '@/lib/utils';

const mulish = Mulish({ subsets: ['latin'] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='light'>
      <body className={cn('min-h-screen font-sans antialiased', mulish.className)}>

        {children}
      </body>
    </html>
  );
}

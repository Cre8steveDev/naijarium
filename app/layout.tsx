import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
// import Footer from './components/Footer';
import LeftSideBarDesktop from './components/LeftSideBarDesktop';
import RightSideBarDesktop from './components/RightSideBarDesktop';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Naijarium | Forum for well thinking patriotic Nigerians',
  description:
    'Naijarium is a free forum build for Nigerians who interested in having a social platform free from the usual social media noise and vileness of tribalism/hate speech.',
};

// Define the root layout here

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/images/logo.png" type="image/png" />
      <body className={inter.className + ' bg-gray-100 overflow-hidden'}>
        {/* Header Component  */}
        <Header />

        {/* Container holding body and side bars */}
        <div className="grid grid-cols-8 w-full max-w-[1440px] mx-auto bg-gray-100 h-screen mt-4">
          {/* Left Side Bar */}
          <LeftSideBarDesktop />

          {/* Main Center Content */}
          <div className="col-span-4 overflow-y-scroll">{children}</div>

          {/* Right Side Bar */}
          <RightSideBarDesktop />
        </div>
        {/* <Footer /> */}
      </body>
    </html>
  );
}

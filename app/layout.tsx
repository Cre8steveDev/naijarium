import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
// import Footer from './components/Footer';
import LeftSideBarDesktop from '../components/LeftSideBarDesktop';
import RightSideBarDesktop from '../components/RightSideBarDesktop';
import AuthProvider from '@/lib/SessionProvider';
import { ThemeProvider } from '@/contexts/ThemeProvider';

// Import Stylesheets
import './globals.css';
import './prism.css';
import { generateMetadata } from '@/components/seo/PageSEO';

// Instantiate the Font for the body
const inter = Inter({ subsets: ['latin'] });

// Define Metadata for the general site layout
export const metadata: Metadata = generateMetadata({
  title: 'Naijarium | Social Media Forum for Nigerians',
});

// Define the root layout here

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/images/logo.png" type="image/png" />
      <body
        className={
          inter.className + ' bg-gray-100 dark:bg-slate-800 relative h-full'
        }
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              var savedTheme = localStorage.getItem('theme') || 'light';
              document.documentElement.classList.toggle('dark', savedTheme === 'dark');
            })();
          `,
          }}
        />

        {/* Auth Provider Wrapper */}
        <AuthProvider>
          <ThemeProvider>
            {/* Header Component  */}
            <Header />

            {/* Container holding body and side bars */}
            <div className="grid grid-cols-8 w-full max-w-[1440px] mx-auto bg-slate-100 dark:bg-slate-800 mt-[100px] md:mt-0 h-[calc(100vh-100px)]">
              {/* Left Side Bar */}
              <LeftSideBarDesktop />

              {/* Main Center Content */}
              <div className="col-span-8  md:col-span-6 lg:col-span-4 overflow-y-scroll overflow-x-hidden -mt-4 sm:mt-0">
                {children}
              </div>

              {/* Right Side Bar */}
              <RightSideBarDesktop />
            </div>
            {/* <Footer /> */}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

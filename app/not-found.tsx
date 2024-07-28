'use client';
import Link from 'next/link';
import Image from 'next/image';
import NotFoundImage from '@/public/images/404-not-found.svg';
import { usePathname } from 'next/navigation';

// Define the Not found component
export default function NotFound() {
  const pathName = usePathname();
  return (
    <div className="flex flex-col items-center justify-center px-5 text-center cursor-pointer">
      <Image
        src={NotFoundImage}
        width={800}
        height={60}
        alt="Page Not Found."
        unselectable="on"
      />

      <p className="text-xs font-bold -mt-8 sm:text-xl mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <div className="rounded-md p-2 bg-red-600 w-fit -mt-4 mb-4 px-8">
        <p className="text-xs sm:text-base text-white">
          {`naijarium.vercel.app${pathName}`}
        </p>
      </div>

      <div>
        <Link
          href="/"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 rounded text-xs sm:text-base"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}

import React from 'react';
import MinionNotFound from '@/public/images/minion-not-found.png';
import Image from 'next/image';
import Link from 'next/link';

const ContentNotFound = ({ text }: { text: string }) => {
  return (
    <div className="w-full h-full justify-center items-center flex flex-col gap-3 bg-white cursor-default">
      <Image
        src={MinionNotFound}
        width={150}
        height={300}
        quality={1}
        alt="Loader..."
        className="w-full max-w-[200px]"
      />
      <p className="text-xs sm:text-base font-bold">{text}</p>
      <Link href={'/'}>
        <button className="p-2 bg-orange-600 text-white rounded-lg text-sm sm:text-base hover:bg-opacity-50 transition-all ease-in-out">
          Back To Home Page
        </button>
      </Link>
    </div>
  );
};

export default ContentNotFound;

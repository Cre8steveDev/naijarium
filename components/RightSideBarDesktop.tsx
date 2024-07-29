'use client';

import { FaFireAlt } from 'react-icons/fa';
import LaptopSideAd from './ui/LaptopSideAd';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';
import getGreeting from '@/lib/getCurrentGreeting';

const RightSideBarDesktop = () => {
  // Get SignedIn user Data
  const { data: session, status } = useSession();
  const user: User & any = session?.user;

  return (
    <div className="top-10 sticky lg:flex flex-col gap-10 hidden col-span-2 px-5 py-8">
      {/* Select Topics Panel */}
      <aside className="bg-white dark:bg-slate-600 p-3 rounded-lg w-full">
        <div>
          <h3 className="flex items-center gap-2">
            <FaFireAlt className="hover:text-orange-600 transition ease-in" />{' '}
            Top Rated Posts!
          </h3>
        </div>
      </aside>

      {/* Mini User Dashboard */}
      <aside className="bg-white dark:bg-slate-600 p-3 rounded-lg w-full">
        <div>
          <h3 className="flex items-center gap-2  text-xl">{`${getGreeting()}`}</h3>
          <p className="font-black lg:text-3xl text-xl">
            {user ? `@${user.username}` : ''}
          </p>
        </div>
      </aside>

      <LaptopSideAd />
    </div>
  );
};

export default RightSideBarDesktop;

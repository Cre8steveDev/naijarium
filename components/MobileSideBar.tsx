'use client';
/**
 * Mobile Side Bar Navigation
 * With Navigation to Popular Tags
 * Might Change its position for sm to md
 */

import Link from 'next/link';
import Image from 'next/image';
import { User } from 'next-auth';
import SignOutButton from './ui/SignOutButton';
import SignUpIcon from '@/public/images/login.png';
import SideBarNavigation from './ui/SideBarNavigation';

import MobileUserPersonalNavigation from './ui/MobileUserPersonalNavigation';
import { useState } from 'react';

// import { auth } from '@/auth';

type SideMenuCompProp = {
  user: User | undefined;
  setShowMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showMobileMenu: boolean;
};

const MobileSideMenu = ({
  user,
  setShowMobileMenu,
  showMobileMenu,
}: SideMenuCompProp) => {
  // const session = await auth();

  const [selectOpen, setSelectOpen] = useState(false);
  return (
    <div
      className={`md:block absolute left-0 sm:hidden h-screen w-[83%] top-[0px] bg-white dark:bg-slate-800 bg-opacity-75 backdrop-blur-lg p-3 z-[15] transition-all ease-in-out duration-700 ${
        showMobileMenu
          ? 'translate-x-0 opacity-100'
          : '-translate-x-full opacity-0'
      }`}
    >
      <aside className="p-3 rounded-md w-full">
        <SideBarNavigation
          setShowMobileMenu={setShowMobileMenu}
          setSelectOpen={setSelectOpen}
        />

        <ul
          className={`${
            !selectOpen
              ? 'translate-x-0 opacity-100'
              : '-translate-x-full opacity-0'
          } transition-all ease-in-out duration-300`}
        >
          {/* User Navigation  */}

          {user && (
            <MobileUserPersonalNavigation
              user={user as User & any}
              setShowMobileMenu={setShowMobileMenu}
            />
          )}

          {/* Unsigned In User  */}
          {!user && (
            <>
              <Link href={'/login'} onClick={() => setShowMobileMenu(false)}>
                <li className="flex justify-center gap-2 bg-green-800 dark:bg-slate-500 hover:bg-opacity-70 text-xs p-3 rounded-md font-bold text-slate-100 transition-colors ease-in w-full mt-3">
                  <p>Sign In</p>
                </li>
              </Link>

              <Link href={'/register'} onClick={() => setShowMobileMenu(false)}>
                <li className="flex justify-center gap-2 bg-orange-400 dark:bg-slate-700 hover:bg-opacity-70 text-xs p-3 rounded-md font-bold text-slate-100 transition-colors ease-in w-full mt-3">
                  <Image
                    src={SignUpIcon}
                    alt="Login"
                    className="w-[22px] h-[22px] hidden sm:block"
                    // width={22}
                    // height={15}
                  />
                  <p>Sign Up</p>
                </li>
              </Link>
            </>
          )}
          <SignOutButton />
        </ul>
      </aside>
    </div>
  );
};

export default MobileSideMenu;

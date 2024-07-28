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

// import { auth } from '@/auth';

type SideMenuCompProp = {
  user: User | undefined;
  setShowMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileSideMenu = ({ user, setShowMobileMenu }: SideMenuCompProp) => {
  // const session = await auth();
  return (
    <div className="md:block absolute left-0 sm:hidden h-screen w-[80%] top-[0px] bg-white bg-opacity-75 backdrop-blur-lg p-3 z-[15]">
      <aside className="p-3 rounded-md w-full">
        <ul>
          <SideBarNavigation setShowMobileMenu={setShowMobileMenu} />

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
                <li className="flex justify-center gap-2 bg-green-800 hover:bg-opacity-70 text-xs p-3 rounded-md font-bold text-slate-100 transition-colors ease-in w-full mt-3">
                  <p>Sign In</p>
                </li>
              </Link>

              <Link href={'/register'} onClick={() => setShowMobileMenu(false)}>
                <li className="flex justify-center gap-2 bg-orange-400 hover:bg-opacity-70 text-xs p-3 rounded-md font-bold text-slate-100 transition-colors ease-in w-full mt-3">
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

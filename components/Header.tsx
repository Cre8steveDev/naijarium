'use client';
// Header Component For PC or Mobile
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

// Import default images
import CreatePostIcon from '@/public/images/create-post.png';

import LogoIcon from '@/public/images/logo.png';
import { FiMenu } from 'react-icons/fi';
import MobileSideMenu from './MobileSideBar';
import { IoClose } from 'react-icons/io5';
import SignUpIcon from '@/public/images/login.png';

const Header = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="top-0 z-[30] fixed md:sticky bg-white shadow-md shadow-slate-100 px-5 py-2 md:px-5 md:py-5 w-screen ">
      <div className="flex justify-between items-center mx-auto w-full max-w-[1440px]">
        <Link href={'/'}>
          <section className="flex items-center gap-3">
            <Image src={LogoIcon} alt="Logo" width={50} height={50} priority />
            <h2 className="font-extrabold text-xl md:text-4xl text-green-800">
              Naijarium
            </h2>
          </section>
        </Link>

        <nav className="">
          <ul className="flex justify-between items-center gap-2 md:gap-6 pr-2">
            {!user && (
              <>
                <Link href={'/login'} className="hidden sm:block">
                  <li className="flex justify-center gap-2 bg-green-800 hover:bg-opacity-70 text-xs sm:text-lg w-[60px] p-1 md:p-3 rounded-lg md:w-[130px] font-bold text-slate-100 transition-colors ease-in">
                    <p>Sign In</p>
                  </li>
                </Link>

                <Link href={'/register'} className="hidden sm:block">
                  <li className="flex justify-center gap-2 bg-orange-600 hover:bg-opacity-70 text-xs sm:text-lg w-[70px] p-1 md:p-3 rounded-lg md:w-[130px] font-bold text-slate-100 transition-colors ease-in">
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

            {user && (
              <>
                <Link href={'/create-post'}>
                  <li className="flex justify-center gap-2 bg-orange-600 active:bg-green-900 hover:bg-opacity-85 p-2 sm:p-3 rounded-lg font-bold text-slate-100 transition-colors ease-in">
                    <Image
                      src={CreatePostIcon}
                      alt="Create Post"
                      className="sm:w-[25px] sm:h-[25px] w-[15px] h-[15px]"
                    />
                    <p className="text-[10px] sm:text-base">Create Post</p>
                  </li>
                </Link>

                <li className="relative hidden sm:block">
                  <div className="-top-1 right-0 absolute bg-red-600 rounded-full w-4 h-4 text-center text-white text-xs">
                    {0}
                  </div>
                  <Image
                    src={'/images/bell.png'}
                    alt="Notification"
                    width={30}
                    height={30}
                  />
                </li>

                <Link href={'/dashboard'} className="hidden md:block">
                  <li>
                    <Image
                      src={user?.image! || '/images/profile-icon.jpg'}
                      alt="Profile"
                      width={50}
                      height={50}
                      className="border-2 border-green-lighten rounded-full"
                    />
                  </li>
                </Link>
              </>
            )}

            {/* Mobile Navigation Trigger and Component  */}

            <li
              className="sm:hidden bg-green-700 p-1 rounded-md translate-x-1 hover:bg-orange-700 transition-colors ease-in-out duration-300"
              onClick={() => setShowMobileMenu((prev) => !prev)}
            >
              {!showMobileMenu && <FiMenu color="white" size={24} />}
              {showMobileMenu && <IoClose color="white" size={24} />}
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu Side Bar  */}
      <MobileSideMenu
        user={user}
        setShowMobileMenu={setShowMobileMenu}
        showMobileMenu={showMobileMenu}
      />
      {/* {showMobileMenu && (
      )} */}
    </header>
  );
};

export default Header;

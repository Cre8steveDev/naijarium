'use client';
// Header Component For PC or Mobile
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

// Import default images
import CreatePostIcon from '@/public/images/create-post.png';
import SignUpIcon from '@/public/images/login.png';
import LogoIcon from '@/public/images/logo.png';

const Header = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  // if (user) console.log(user);

  return (
    <header className="top-0 z-10 sticky bg-white shadow-md shadow-slate-100 p-5 w-screen">
      <div className="flex justify-between mx-auto w-full max-w-[1440px]">
        <Link href={'/'}>
          <section className="flex items-center gap-3">
            <Image src={LogoIcon} alt="Logo" width={50} height={50} />
            <h2 className="font-extrabold text-4xl text-green-800">
              Naijarium
            </h2>
          </section>
        </Link>

        <nav className="">
          <ul className="flex justify-between items-center gap-6">
            {!user && (
              <>
                <Link href={'/login'}>
                  <li className="flex justify-center gap-2 bg-green-800 hover:bg-opacity-70 p-3 rounded-lg w-[130px] font-bold text-slate-100 transition-colors ease-in">
                    <p>Sign In</p>
                  </li>
                </Link>

                <Link href={'/register'}>
                  <li className="flex justify-center gap-2 bg-orange-600 hover:bg-opacity-70 p-3 rounded-lg w-[130px] font-bold text-slate-100 transition-colors ease-in">
                    <Image
                      src={SignUpIcon}
                      alt="Login"
                      className="w-[22px] h-[22px]"
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
                      className="w-[25px] h-[25px]"
                    />
                    <p className="sm:block hidden">Create Post</p>
                  </li>
                </Link>

                <li className="relative">
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

                <Link href={'/dashboard'}>
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
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

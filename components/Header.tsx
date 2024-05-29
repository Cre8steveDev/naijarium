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
    <header className="w-screen p-5 bg-white shadow-md shadow-slate-100 sticky top-0 z-10">
      <div className="w-full max-w-[1440px] mx-auto flex justify-between">
        <Link href={'/'}>
          <section className="flex items-center gap-3">
            <Image src={LogoIcon} alt="Logo" width={50} height={50} />
            <h2 className=" text-4xl font-extrabold text-green-800">
              Naijarium
            </h2>
          </section>
        </Link>

        <nav className="">
          <ul className="flex justify-between gap-6 items-center">
            {!user && (
              <>
                <Link href={'/login'}>
                  <li className="flex gap-2 w-[130px] rounded-lg bg-green-800 p-3 text-slate-100 font-bold justify-center hover:bg-opacity-70 transition-colors ease-in">
                    <p>Sign In</p>
                  </li>
                </Link>

                <Link href={'/register'}>
                  <li className="flex gap-2 w-[130px] rounded-lg bg-orange-600 p-3 text-slate-100 font-bold justify-center hover:bg-opacity-70 transition-colors ease-in">
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
                  <li className="flex gap-2 rounded-lg bg-orange-600 p-3 text-slate-100 font-bold justify-center hover:bg-opacity-85 transition-colors ease-in active:bg-green-900">
                    <Image
                      src={CreatePostIcon}
                      alt="Create Post"
                      className="w-[25px] h-[25px]"
                      // width={auto}
                      // height={auto}
                    />
                    <p>Create Post</p>
                  </li>
                </Link>

                <li className="relative">
                  <div className="rounded-full absolute -top-1 right-0 bg-red-600 w-4 h-4 text-xs text-center text-white">
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
                      className="rounded-full border-2 border-green-lighten"
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

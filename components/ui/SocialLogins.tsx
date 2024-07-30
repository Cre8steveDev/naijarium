'use client';
/**Social Login UI Component  */

import Image from 'next/image';
import { handleSocialSignIn } from '@/actions/authActions';
import googleLogo from '@/public/images/google.webp';
import githubLogo from '@/public/images/github.png';
import toast from 'react-hot-toast';

// import { usePathname } from 'next/navigation';

const SocialLogins = () => {
  // Return JSX

  //
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();

        return toast.error('Feature coming soon... 😉');
      }}
      // action={handleSocialSignIn}
      className="flex w-full flex-col items-center gap-4 text-center text-xs sm:items-start sm:text-left sm:text-sm"
    >
      <hr className="border-1 border-gray-300" />
      <p>Login with your Social Accounts</p>

      <div className="-mt-4 flex w-[60%] max-w-[400px]">
        <button
          type="submit"
          name="auth"
          value="google"
          className="rounded-lg p-2 font-semibold text-white transition ease-in hover:scale-90 hover:bg-opacity-75 hover:opacity-80"
        >
          <Image
            src={googleLogo}
            alt="Login Photo"
            className="w-[80%] object-cover active:scale-90"
          />
        </button>

        <button
          type="submit"
          name="auth"
          value="google"
          className="rounded-lg p-2 font-semibold text-white transition ease-in hover:scale-90 hover:bg-opacity-75 hover:opacity-80"
        >
          <Image
            src={githubLogo}
            alt="Login Photo"
            className="w-full object-cover active:scale-90"
          />
        </button>
      </div>
    </form>
  );
};

export default SocialLogins;

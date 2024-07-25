/**Social Login UI Component  */

import Image from 'next/image';
import { handleSocialSignIn } from '@/actions/authActions';
import googleLogo from '@/public/images/google.webp';
import githubLogo from '@/public/images/github.png';

// import { usePathname } from 'next/navigation';

const SocialLogins = () => {
  // Return JSX
  return (
    <form
      action={handleSocialSignIn}
      className="flex flex-col gap-4 w-full text-xs text-center sm:text-left sm:text-sm items-center sm:items-start"
    >
      <hr className="border-1 border-gray-300" />
      <p>Login with your Social Accounts</p>

      <div className="flex -mt-4 w-[60%] max-w-[400px]">
        <button
          type="submit"
          name="auth"
          value="google"
          className="hover:bg-opacity-75 hover:opacity-80 p-2 rounded-lg font-semibold text-white transition ease-in hover:scale-90"
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
          className="hover:bg-opacity-75 hover:opacity-80 p-2 rounded-lg font-semibold text-white transition ease-in hover:scale-90"
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

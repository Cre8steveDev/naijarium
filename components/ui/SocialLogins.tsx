/**Social Login UI Component  */

import Image from 'next/image';
import { handleSocialSignIn } from '@/actions/authActions';
import googleLogo from '@/public/images/google.webp';
import githubLogo from '@/public/images/github.png';

// import { usePathname } from 'next/navigation';

const SocialLogins = () => {
  // const pathname = usePathname();

  return (
    <form
      action={handleSocialSignIn}
      className="flex flex-col gap-4 w-full  mt-4 text-xs"
    >
      {/* {pathname === '/login' && (
        <a href="/register">
          <p className="text-green-700 font-medium cursor-pointer mb-2 hover:opacity-85 transition ease-in-out">
            NEW USER? Sign Up For a New Account.
          </p>
          <hr className="border-1 border-gray-300" />
        </a>
      )}

      {pathname === '/register' && (
        <a href="/login">
          <p className="text-green-800 font-medium cursor-pointer mb-2 hover:opacity-85 transition ease-in-out">
            Already Have an Account? SIGN IN HERE.
          </p>
          <hr className="border-1 border-gray-300" />
        </a>
      )} */}

      <hr className="border-1 border-gray-300" />
      <p>Login with your Social Accounts</p>

      <div className="flex  max-w-[400px] w-[60%]  -mt-4">
        <button
          type="submit"
          name="auth"
          value="google"
          className="p-2 text-white font-semibold rounded-lg hover:bg-opacity-75 transition ease-in hover:scale-90 hover:opacity-80"
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
          className="p-2 text-white font-semibold rounded-lg hover:bg-opacity-75 transition ease-in hover:scale-90 hover:opacity-80"
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

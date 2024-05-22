/** Login Page for the application
 *
 */

import Image from 'next/image';
import imageSide from '@/public/images/login_img.jpg';
import googleLogo from '@/public/images/google.webp';
import githubLogo from '@/public/images/github.png';

import { handleSocialSignIn } from '@/actions/authActions';

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen p-8">
      <div className="w-full">
        <Image
          src={imageSide}
          alt="Login Photo"
          //   You don't have to specify width and height if the image
          // is directly imported into the project
          //   width={1000}
          //   height={0}
          //   objectFit="cover"
          className="w-full object-cover min-h-full"
        />
      </div>

      {/* Start Login Definition form from here */}
      <div className="w-full p-5">
        <h2 className="text-2xl font-bold mb-6 text-green-800">
          Sign In To Gain Access to Top Features in our Community!
        </h2>

        {/* Credentials Sign In Form */}
        <form></form>

        {/* Social Login Sign In Trigger  */}
        <form action={handleSocialSignIn} className="flex flex-col gap-4">
          <p>Login with your Social Accounts</p>

          <div className="flex gap-3">
            <button
              type="submit"
              name="auth"
              value="google"
              className="p-2 text-white font-semibold rounded-lg hover:bg-opacity-75 transition ease-in"
            >
              <Image
                src={googleLogo}
                alt="Login Photo"
                className="w-[80%] object-cover mx-auto active:scale-90"
              />
            </button>

            <button
              type="submit"
              name="auth"
              value="google"
              className="p-2 text-white font-semibold rounded-lg hover:bg-opacity-75 transition ease-in"
            >
              <Image
                src={githubLogo}
                alt="Login Photo"
                className="w-full object-cover active:scale-90"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

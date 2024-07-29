'use client';

/** Login Page for the application
 *
 */

import Image from 'next/image';
import { useRouter } from 'next/navigation';

// import { signIn } from '@/auth';
import { signIn } from 'next-auth/react';

import React, { useState } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

import { TLoginForm } from '@/types/types';

import imageSide from '@/public/images/login_girl.jpg';
import SocialLogins from '@/components/ui/SocialLogins';
import Link from 'next/link';

// import { handleSocialSignIn } from '@/actions/authActions';

const LoginPage: React.FC = () => {
  const [formLoading, setFormLoading] = useState(false);
  const router = useRouter();

  // Destructure values from useForm Hook
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TLoginForm>();

  const handleFormSubmit = async (data: TLoginForm) => {
    event?.preventDefault();

    // Send request to the backend
    setFormLoading(true);

    try {
      const response = await signIn('credentials', {
        username: data.email,
        password: data.password,
        redirect: false,
      });

      // Navigate to the Home Page on successful Login
      if (response?.ok && response?.error === null) {
        router.push('/');
        router.refresh();
        return;
      }

      if (response?.error === 'CredentialsSignin')
        throw new Error('Invalid Credentials. 😊');

      throw new Error('Something went wrong. Try again.');
      //  Catch Error appropriately
    } catch (error: any) {
      toast.error(error.message);

      // Block that's finally run to stop form loading interaction
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormErrors: SubmitErrorHandler<TLoginForm> = (error) => {
    if (error.email) return toast.error('Please enter your email address.');

    if (error.password)
      return toast.error('Password Field Cannot be empty. 😊');
  };

  return (
    <div className="flex flex-col gap-5 md:flex-row justify-center items-center p-4 px-6 sm:p-12 w-full max-w-[1100px] mx-auto bg-gray-200 dark:bg-slate-800  md:rounded-2xl cursor-default shadow-inner shadow-slate-300 dark:shadow-slate-800 -mt-[130px] sm:mt-8 relative h-full sm:h-fit sm:max-h-[750px]">
      {/* Close Button on Desktop */}

      <Link
        href={'/'}
        className="absolute top-5 right-5 bg-red-700 padding-2 rounded-full w-[40px] h-[40px] justify-center items-center text-center pt-2 font-bold text-white hover:opacity-80 cursor-pointer hidden sm:block"
      >
        <p>X</p>
      </Link>

      <div className="w-full sm:w-[80%] md:w-full">
        <Image
          src={imageSide}
          alt="Login Photo"
          className="w-full object-cover md:aspect-[2/3] object-[20%] rounded-2xl hover:scale-95 transition ease-in"
        />
      </div>

      {/* Start Login Definition form from here */}
      <div className="w-full md:p-12 md:pl-8 ">
        <h2 className="flex flex-col mb-4 text-3xl font-bold text-green-800">
          <span className="w-full text-lg">Oya na! Awa Happy Place</span>
          <span className="w-full text-orange-400 text-2xl">
            Premium Gists and Convo.
          </span>
        </h2>

        <p className="text-sm w-full max-w-[400px]">
          Login to your account to connect with the trybe.
        </p>

        {/* User Registration Form */}
        <form
          className="flex flex-col w-full gap-2 md:gap-5 md:mt-6 mt-2"
          onSubmit={handleSubmit(handleFormSubmit, handleFormErrors)}
        >
          <input
            type="email"
            minLength={10}
            maxLength={40}
            autoComplete="off"
            {...register('email', { required: true })}
            placeholder="Email Address"
            className="w-full p-3 rounded-lg text-[16px] focus:outline-green-100 invalid:border-red-600 dark:text-slate-800"
          />

          <input
            type="password"
            minLength={6}
            autoComplete="off"
            {...register('password', { required: true })}
            placeholder="Enter your Password"
            className="w-full p-3 rounded-lg text-[16px] valid:outline-green-100 invalid:outline-red-600 dark:text-slate-800"
          />

          {/* Submit Button */}
          <button
            className={`w-full p-4 font-bold text-white bg-green-600 hover:bg-opacity-85 transition ease-in rounded-lg disabled:bg-slate-700 disabled:cursor-not-allowed ${
              formLoading && 'animate-pulse'
            }`}
            type="submit"
            disabled={formLoading}
          >
            <p> {formLoading ? 'Logging In. 😉' : 'Login In!'}</p>
          </button>
        </form>

        {/* Redirect to Registration Page */}
        <div>
          <Link href={'/register'}>
            <p className="text-center sm:text-left font-bold mt-5 text-slate-600 text-sm hidden sm:block">
              Don't have an account yet?{' '}
              <span className="text-green-600">Sign Up Now</span>
            </p>
          </Link>
        </div>

        {/* Social Login */}
        <SocialLogins />
      </div>

      <Toaster />
    </div>
  );
};

export default LoginPage;

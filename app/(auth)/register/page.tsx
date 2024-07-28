'use client';

/** Login Page for the application
 *
 */

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import React, { useState, useRef } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

import { TRegisterForm } from '@/types/types';

import imageSide from '@/public/images/login_img.jpg';
import SocialLogins from '@/components/ui/SocialLogins';
import Link from 'next/link';

// import { handleSocialSignIn } from '@/actions/authActions';

const RegisterPage: React.FC = () => {
  const [formLoading, setFormLoading] = useState(false);
  const router = useRouter();

  // Form Ref
  const formRef = useRef<HTMLFormElement>(null);

  // Destructure values from useForm Hook
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TRegisterForm>();

  const handleFormSubmit = async (data: TRegisterForm) => {
    event?.preventDefault();

    // Check that Passwords match
    if (data.password !== data.confirm_password)
      return toast.error(
        'Sorry, your password does not match with the confirm password field'
      );

    // Send request to the backend

    try {
      setFormLoading(true);
      const response = await axios({
        method: 'post',
        url: '/api/auth/register',
        withCredentials: true,
        data: data,
      });

      // Check response status and toast the error
      if (response.status === 409)
        throw new Error('Sorry. Credentials May already exist.');

      if (response.status === 500)
        throw new Error(
          'There was an completing the registration. Try again later.'
        );

      const message: string = response.data.message;
      toast.success(message);

      // Navigate to the login page
      router.push('/login');

      //  Catch Error appropriately
    } catch (error: any) {
      toast.error(error.message);

      // Block that's finally run to stop form loading interaction
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormErrors: SubmitErrorHandler<TRegisterForm> = (error) => {
    if (error.confirm_password)
      return toast.error(
        'Please enter a valid title for your post. Must be greater than 15 characters'
      );

    if (error.email)
      return toast.error('Please select a category for your post');

    if (error.username)
      return toast.error('Please, the content field is required. 😊');
  };

  return (
    <div className="flex flex-col gap-5 md:flex-row justify-center items-center p-4 px-6 sm:p-12 w-full max-w-[1100px] mx-auto bg-gray-200 md:rounded-2xl cursor-default shadow-inner shadow-slate-300 mt-0 sm:mt-0 relative">
      {/* Close Button on Desktop */}

      <Link
        href={'/'}
        className="absolute top-5 right-5 bg-red-700 padding-2 rounded-full w-[40px] h-[40px] justify-center items-center text-center pt-2 font-bold text-white hover:opacity-80 cursor-pointer hidden sm:block"
      >
        <p>X</p>
      </Link>

      {/* Form Body Container */}
      <div className="w-full sm:w-[80%] md:w-full">
        <Image
          src={imageSide}
          alt="Login Photo"
          className="w-full object-cover md:aspect-[2/3] object-[20%] rounded-2xl hover:scale-95 transition ease-in"
        />
      </div>

      {/* Start Login Definition form from here */}
      <div className="w-full md:p-12 md:pl-8 ">
        <h2 className="flex flex-col sm:mb-4 sm:text-3xl font-bold text-green-800">
          <span className="w-full text-center sm:text-left">
            Welcome to Naijarium!
          </span>
          <span className="w-full text-orange-400 text-3xl font-black sm:text-2xl text-center sm:text-left">
            The New Trybe.
          </span>
        </h2>

        <p className="text-xs sm:text-sm  sm:text-left text-center w-full max-w-[400px]">
          Please fill out the information to get a user account and explore all
          the features of the hood.
        </p>

        {/* User Registration Form */}
        <form
          className="flex flex-col w-full gap-2 md:gap-5 md:mt-6 mt-2"
          onSubmit={handleSubmit(handleFormSubmit, handleFormErrors)}
        >
          <input
            type="text"
            minLength={6}
            maxLength={20}
            autoComplete="off"
            {...register('username', { required: true })}
            placeholder="Enter your Preferred Username"
            className="w-full p-3 rounded-lg text-[16px] focus:outline-green-100 invalid:outline-red-600"
          />

          <input
            type="email"
            minLength={10}
            maxLength={40}
            autoComplete="off"
            {...register('email', { required: true })}
            placeholder="Enter your Email Address"
            className="w-full p-3 rounded-lg text-[16px] focus:outline-green-100 invalid:border-red-600"
          />

          <input
            type="password"
            minLength={6}
            autoComplete="off"
            {...register('password', { required: true })}
            placeholder="Choose a Secure password"
            // onChange={checkPasswordStrength}
            className="w-full p-3 rounded-lg text-[16px] valid:outline-green-100 invalid:outline-red-600"
          />

          <input
            type="password"
            autoComplete="off"
            placeholder="Confirm Chosen Password"
            {...register('confirm_password', { required: true })}
            className="w-full p-3 rounded-lg text-[16px] valid:outline-green-100 invalid:outline-red-600"
          />

          <div className="flex items-center gap-4">
            <p className="font-semibold">Gender: </p>
            <div>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                required
                className="mr-3 scale-[120%] sm:scale-[150%] cursor-pointer"
                onChange={() => setValue('gender', 'male')}
              />
              <label htmlFor="male" className="text-[16px] -mt-2">
                Male
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                name="gender"
                required
                value="female"
                className="mr-3 scale-[120%] sm:scale-[150%] cursor-pointer"
                onChange={() => setValue('gender', 'female')}
              />
              <label htmlFor="female" className="text-[16px] -mt-2">
                Female
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            className={`w-full p-4 font-bold text-white bg-orange-600 hover:bg-opacity-85 transition ease-in rounded-lg disabled:bg-slate-700 disabled:cursor-not-allowed ${
              formLoading && 'animate-pulse'
            }`}
            type="submit"
            disabled={formLoading}
          >
            <p> {formLoading ? 'Creating Your Account. 😉' : 'Sign Up Now!'}</p>
          </button>
        </form>

        {/* Redirect to Sign In Page */}
        <div>
          <Link href={'/login'}>
            <p className="text-center sm:text-left font-bold mt-2 text-slate-600 text-sm hidden sm:block">
              Already have an account? Sign In
            </p>
          </Link>
        </div>

        {/* Social Logins */}
        <SocialLogins />
      </div>

      <Toaster />
    </div>
  );
};

export default RegisterPage;

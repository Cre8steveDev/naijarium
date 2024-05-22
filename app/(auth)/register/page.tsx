'use client';

/** Login Page for the application
 *
 */

import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

import { TRegisterForm } from '@/types/types';

import imageSide from '@/public/images/login_img.jpg';

// import { handleSocialSignIn } from '@/actions/authActions';

const RegisterPage: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TRegisterForm>();

  const handleFormSubmit = async (data: TRegisterForm) => {
    event?.preventDefault();
    console.log(data);

    // Send request to the backend
    const response = await fetch('/api/auth/register', {
      method: 'post',
      credentials: 'include',
      headers: {
        Sender: 'Stephen Omoregie Testing',
      },
      body: JSON.stringify(data),
    });

    // get the response and print
    const data_api = await response.json();
    console.log(data_api);
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
    <div className="flex flex-col gap-5 md:flex-row justify-center items-center p-4 sm:p-12 max-w-[1100px] mx-auto bg-gray-200 md:rounded-2xl cursor-default shadow-inner shadow-slate-300 overflow-y-scroll h-full md:h-fit">
      <div className="w-[80%] md:w-full ">
        <Image
          src={imageSide}
          alt="Login Photo"
          className="w-full object-cover md:aspect-[2/3] object-[20%] rounded-2xl hover:scale-95 transition ease-in"
        />
      </div>

      {/* Start Login Definition form from here */}
      <div className="w-full p-12 pl-8 ">
        <h2 className="flex flex-col mb-4 text-3xl font-bold text-green-800">
          <span className="w-full">Welcome to Naijarium!</span>
          <span className="w-full">The New Trybe.</span>
        </h2>

        <p className="text-sm   w-full max-w-[400px]">
          Please fill out the information to get an user account and explore all
          the features of the hood.
        </p>

        {/* User Registration Form */}
        <form
          className="flex flex-col w-full gap-5 mt-6"
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
                className="mr-3 scale-[150%] cursor-pointer"
                onChange={() => setValue('gender', 'male')}
              />
              <label htmlFor="male" className="text-[16px]">
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
                className="mr-3 scale-[150%] cursor-pointer"
                onChange={() => setValue('gender', 'female')}
              />
              <label htmlFor="female" className="text-[16px]">
                Female
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="w-full p-4 font-bold text-white bg-orange-600 rounded-lg"
            type="submit"
          >
            Sign Up Now!
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default RegisterPage;

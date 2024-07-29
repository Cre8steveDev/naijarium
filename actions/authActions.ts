'use server';

import { signIn } from '@/auth';

export const handleSocialSignIn = async (formData: any) => {
  const socialAuthType = formData.get('auth') as string;
  console.log('Form Received from Google Signin: ', formData);
  //   Call the function that triggers the next auth handler
  if (socialAuthType) await signIn(socialAuthType);
};

'use client';
/**
 * Sign Out button to trigger Logout from backend
 * and clear cookies on the front end.
 * Might update it to clear auth state later
 * from context or redux.
 */

import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const SignOutButton = () => {
  const { data: session, status } = useSession();

  if (!session?.user) return '';

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const response = await signOut();
      }}
    >
      <button
        className="bg-red-500 hover:bg-opacity-85 mx-auto mt-5 p-2 rounded-lg w-full text-center text-sm text-white transition ease-in-out"
        type="submit"
      >
        Sign Out
      </button>
    </form>
  );
};

export default SignOutButton;

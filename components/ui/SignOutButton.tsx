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
        console.log(response);
      }}
    >
      <button
        className="mx-auto text-center bg-red-600 text-white p-2 rounded-lg mt-5 text-sm hover:bg-opacity-85 transition ease-in-out"
        type="submit"
      >
        Sign Out
      </button>
    </form>
  );
};

export default SignOutButton;

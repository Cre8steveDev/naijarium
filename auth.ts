//import GithubProvider from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import NextAuth, { Session } from 'next-auth';

import connectDB from './database/connection';
import bcrypt from 'bcryptjs';
import { User } from './database/models';
import { IUser } from './database/models.types';
import { AuthUser } from './types/types';

// Auth handlers
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt', maxAge: 24 * 60 * 60 },
  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {},
      },

      async authorize(credentials) {
        const username = credentials.username as string;
        const password = credentials.password as string;

        try {
          await connectDB();

          //@ts-ignore
          const _user = await User.findOne({ email: username });

          //   Check if user with the email exists
          if (!_user) throw new Error('Wrong credentials');

          const findUser = _user as IUser;
          // Check if provided password matches what's stored in DB
          //@ts-ignore
          const isCorrect = bcrypt.compareSync(password, findUser.password);

          //   If not correct throw new error. else, return the user
          if (!isCorrect) throw new Error('Wrong credentials');

          //   Filter data to store on auth
          const { username: name, _id, email, profile_photo } = findUser;

          return { username: name, _id, email, profile_photo } as AuthUser;

          // Catch other errors
        } catch (err) {
          return null;
        }
      },
    }),
    Google,
  ],
  callbacks: {
    async session({ session, token, user }) {
      //@ts-ignore
      session.user = token.user as AuthUser;
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
      }

      if (trigger === 'update' && session) {
        token = { ...token, user: session };
        return token;
      }

      return token;
    },
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isOnProtected = request.nextUrl.pathname.startsWith('/create-post');

      if (isOnProtected && !isLoggedIn) {
        return Response.redirect(new URL('/login', request.nextUrl));
      }
      return true;
    },
  },
});

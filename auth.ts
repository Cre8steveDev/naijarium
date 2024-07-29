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
    // Google Signin
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          await connectDB();

          //  @ts-ignore
          let dbUser = await User.findOne({ email: user.email });

          if (!dbUser) {
            // Create a new user if they don't exist
            // @ts-ignore
            dbUser = await User.create({
              email: user.email,
              username: user.name?.replaceAll(' ', ''),
              profile_photo: user.image,
              password: Date.now(),
              gender: 'N/A',
            });
          }

          // Update user object with database fields
          // @ts-ignore
          user._id = dbUser._id;
          // @ts-ignore
          user.username = dbUser.username;
          user.email = dbUser.email;
          // @ts-ignore
          user.profile_photo = dbUser.profile_photo;

          return true;
        } catch (error) {
          console.error('Error in Google sign in:', error);
          return false;
        }
      }
      return true;
    },
    // Session Implementation
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

/**
 * 
 import { User } from './database/models';
import connectDB from './database/connection';

export const { handlers, signIn, signOut, auth } = NextAuth({
  // ... your existing configuration ...

  callbacks: {
    // ... your existing callbacks ...

    async signIn({ user, account, profile, credentials }) {
      // For Credentials provider
      if (account.provider === 'credentials') {
        // The user object here is already verified by your authorize function
        // You don't need to do anything extra here for Credentials
        return true;
      }

      // For Google provider
      if (account.provider === 'google') {
        try {
          await connectDB();

          // Check if the user already exists in your database
          let dbUser = await User.findOne({ email: user.email });

          if (!dbUser) {
            // If the user doesn't exist, create a new user
            dbUser = await User.create({
              email: user.email,
              username: user.name,
              profile_photo: user.image,
              // Add any other fields you want to store
            });
          } else {
            // If the user exists, you might want to update their information
            dbUser.username = user.name;
            dbUser.profile_photo = user.image;
            await dbUser.save();
          }

          // You can add the database user id to the user object if needed
          user.dbId = dbUser._id;

          return true;
        } catch (error) {
          console.error('Error saving user to database:', error);
          return false;
        }
      }

      // For any other providers you might add in the future
      return true;
    },

    // ... other callbacks ...
  },
});
 */

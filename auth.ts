//import GithubProvider from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import NextAuth from 'next-auth';

import connectDB from './database/connection';
import bcrypt from 'bcryptjs';
import { User } from './database/models';

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
          const findUser = await User.findOne({ email: username });

          //   Check if user with the email exists
          if (!findUser) throw new Error('Wrong credentials');

          // Check if provided password matches what's stored in DB
          //@ts-ignore
          const isCorrect = bcrypt.compareSync(password, findUser.password);

          console.log(`The State of the password comparison: ${isCorrect}`);

          //   If not correct throw new error. else, return the user
          if (!isCorrect) throw new Error('Wrong credentials');

          //   Filter data to store on auth
          const { name, _id, email } = findUser;

          return { name, _id, email };

          // Catch other errors
        } catch (err) {
          return null;
        }
      },
    }),
    Google,
  ],
});

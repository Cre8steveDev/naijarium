// //import GithubProvider from 'next-auth/providers/github';
// import Google from 'next-auth/providers/google';
// import CredentialsProvider from 'next-auth/providers/credentials';

// import NextAuth from 'next-auth';

// import { User } from './database/models';
// import connectDB from './database/connection';
// import bcrypt from 'bcryptjs';

// /**Login Handler to be passed into the authorized function
//  * in the Credentials provider
//  *
//  * @param credentials
//  * @returns
//  */
// const loginHandler = async (credentials: Partial<Record<never, unknown>>) => {
//   try {
//     connectDB();
//     //@ts-ignore
//     const user = await User.findOne({ email: credentials.email });

//     // Check if user with the email exists
//     if (!user) throw new Error('Wrong credentials');

//     // Check if provided password matches what's stored in DB
//     //@ts-ignore
//     const isCorrect = await bcrypt.compare(credentials.password, user.password);

//     // If not correct throw new error. else, return the user
//     if (!isCorrect) throw new Error('Wrong credentials');
//     return user;

//     // Catch other errors
//   } catch (err) {
//     throw new Error('Something went wrong');
//   }
// };

// // Auth handlers
// export const { handlers, signIn, signOut, auth } = NextAuth({
//   // Configure one or more authentication providers
//   pages: { signIn: '/', error: '/login' },
//   providers: [
//     // Credentials Auth Manager
//     CredentialsProvider({
//       name: 'credentials',
//       credentials: {},

//       async authorize(credentials) {
//         try {
//           console.log(credentials);
//           console.log('=========================');
//           const user = await loginHandler(credentials);
//           return user;
//         } catch (error) {
//           throw new Error('Failed to Login!');
//         }
//       },
//     }),
//     // Google Provider
//     Google,
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.username = user.email;
//         //@ts-ignore
//         token.id = user._id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         //@ts-ignore
//         session.user.username = token.username;
//         //@ts-ignore
//         session.user.id = token.id;
//       }

//       return session;
//     },
//   },
// });

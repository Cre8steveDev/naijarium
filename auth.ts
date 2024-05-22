//import GithubProvider from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import NextAuth from 'next-auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Configure one or more authentication providers
  providers: [
    Google,

    // GithubProvider({
    //   clientId: process.env.GITHUB_APP_CLIENT_ID as string,
    //   clientSecret: process.env.GITHUB_APP_CLIENT_SECRET as string,
    // }),
  ],
});

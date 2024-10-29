import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { baseURL } from '@/baseURL';
import axios from 'axios';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(`${baseURL}/admin/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          });
          if (response.status(200)) {
            return { user: { email: credentials.email } };
          } else {
            return null;
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET_KEY,
});
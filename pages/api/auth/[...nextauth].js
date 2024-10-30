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
          if (response.status === 200) {
           return {
              id: "admin",
              email: credentials.email,
              role: "admin"
            };
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
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET_KEY,
});
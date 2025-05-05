import { extendShape } from './node_modules/zod/lib/helpers/util.d';
import { validationErrors } from './validations/auth';
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60,   // 24 hours
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const res = await login({
          email: credentials.email,
          password: credentials.password,
        });

        if (res.status === 200 && res.user) {
          return {
            id: res.user.id,
            email: res.user.email,
          };
        } else {
          throw new Error(
            JSON.stringify({
              responseError: "Invalid email or password",
              validationErrors: res?.errors || [],
            })
          );
        }
      },
    }),
  ],
  pages: {
    signIn: "/LogIn",
  },
});

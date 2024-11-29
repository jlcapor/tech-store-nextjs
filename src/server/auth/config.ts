import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import { type Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";


import { db } from "@/server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/server/db/schema";
import { env } from "@/env";
import bcrypt from 'bcrypt';
import { loginSchema } from "@/lib/validations/auth";


export type UserRoleType = 'ADMIN' | 'USER';

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRoleType;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    // ...other properties
    // role: UserRole;
    role: UserRoleType;
  }
}


export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        const { data, success } = loginSchema.safeParse(credentials);
        if (!success) {
          throw new Error("Invalid credentials");
        }

        const user = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.email, String(data.email)),
        });

        if (!user || !user?.password) { 
          throw new Error("No se encontró ningún usuario");
        }

        const isCorrectPassword = await bcrypt.compare(data.password,user.password);

        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }

        return user
      }
    })
    
  ],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as Adapter,
  callbacks: {
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role;
      }
      return session;
    },
    jwt({ user, token }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
      }
      return token;
    }
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

import { type User } from "next-auth";
import { type JWT } from "next-auth/jwt";

export type UserRoleType = 'ADMIN' | 'USER';

export type ExtendedUser = User & {
  id: string;
  role: UserRoleType;
};

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRoleType;
  }
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
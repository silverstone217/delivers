import { User } from "@prisma/client"; // adapte le chemin selon ton projet

export type UserType = Omit<User, "password">;

export type roleUserType = "USER" | "ADMIN" | "other";

export type User = {
  id: string;
  email: string | null;
  name: string | null;
  token?: string | null;
  role: roleUserType;
  tel: string;
  address: string;
  image: string | null;
  isBanned: boolean;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string | null;
    name: string | null;
    token?: string | null;
    role: roleUserType;
    tel: string;
    address: string;
    image: string | null;
    isBanned: boolean;
    emailVerified: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }

  interface Session {
    user: {
      id: string;
      email: string | null;
      name: string | null;
      token?: string | null;
      role: roleUserType;
      tel: string;
      address: string;
      image: string | null;
      isBanned: boolean;
      emailVerified: Date | null;
      createdAt: Date;
      updatedAt: Date;
    };
    token: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      id: any;
      sub?: string;
      email?: string | null;
      name?: string | null;
      picture?: string | null;
      role?: roleUserType;
      tel?: string;
      address?: string;
      emailVerified?: Date | null;
      createdAt?: Date;
      updatedAt?: Date;
    };
  }
}

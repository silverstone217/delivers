export const dynamic = "force-dynamic";

import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import { AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./lib/env";
import NextAuth from "next-auth";

import { prisma } from "@/lib/prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    verifyRequest: "/verif-email-sent",
    signIn: "/",
  },
  secret: AUTH_SECRET!,
  trustHost: true,
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ token, session }) {
      if (token && session.user) {
        const tokenId = token.sub;
        if (tokenId) {
          const user = await prisma.user.findUnique({
            where: { id: tokenId },
            select: {
              id: true,
              email: true,
              name: true,
              emailVerified: true,
              image: true,
              role: true,
              tel: true,
              address: true,
              createdAt: true,
              updatedAt: true,
              isBanned: true,
            },
          });
          if (user) {
            session.user = {
              id: user.id,
              name: user.name,
              email: user.email ? user.email : "",
              emailVerified: user.emailVerified,
              image: user.image,
              // role: user.role as roleUserType,
              // tel: user.tel || "",
              // address: user.address || "",
              // createdAt: user.createdAt,
              // updatedAt: user.updatedAt,
              // isBanned: user.isBanned,
            };
          }
        }
      }
      return session;
    },
  },
});

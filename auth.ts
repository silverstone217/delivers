import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import { AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./lib/env";
import NextAuth from "next-auth";
import { roleUserType } from "./types/auth";
import { prisma } from "@/lib/prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    // signIn: "/connexion",
    verifyRequest: "/verif-email-sent",
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
            where: {
              id: tokenId,
            },
            omit: { password: true },
          });
          if (user) {
            session.user = {
              id: user.id,
              email: user.email ? user.email : "",
              name: user.name ? user.name : "",
              emailVerified: user.emailVerified,
              image: user.image,
              role: user.role as roleUserType,
              tel: user.tel || "",
              address: user.address || "",
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
              isBanned: user.isBanned,
            };
          }
        }
      }
      return session;
    },
  },
});

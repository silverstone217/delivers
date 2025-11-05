import { getUser } from "@/actions/authAction";
import AsideBarNavigation from "@/components/admin/AsideBarNavigation";
import HeaderNavigation from "@/components/admin/HeaderNavigation";
import AuthForm from "@/components/auth/AuthForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { roboto } from "@/lib/fonts";
import { ADMIN_ROLES } from "@/utils/admin";
import Link from "next/link";
import React from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

async function AdminLayout({ children }: AdminLayoutProps) {
  const user = await getUser();

  if (!user) {
    return (
      <div
        className="min-h-dvh flex items-center justify-center 
      bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 
      dark:to-gray-950 p-4"
      >
        <Card
          className="w-full max-w-md rounded-2xl border border-gray-100 
          dark:border-gray-800 
          bg-white/80 dark:bg-gray-900/70 backdrop-blur-sm shadow-lg 
          transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
        >
          <CardHeader className="text-center space-y-1">
            <CardTitle
              className={`text-3xl font-semibold text-gray-900 dark:text-gray-100 ${roboto.className}`}
            >
              Connexion requise
            </CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">
              Connectez-vous pour accéder à votre profil et à vos services.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <AuthForm />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!ADMIN_ROLES.includes(user.role)) {
    return (
      <div className="min-h-svh flex items-center justify-center">
        <div
          className="max-w-lg mx-auto min-h-96 flex 
      flex-col items-center justify-center py-12 px-4
      bg-secondary/30 border gap-3 w-full rounded-lg shadow-md
      "
        >
          <p className={`${roboto.className} text-3xl text-center font-bold `}>
            Acces refuse
          </p>
          <Link href={"/"}>
            <Button>Retour a l&apos;accueil</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* HEADER SMALL SCREEN */}
      <HeaderNavigation />

      {/* ASIDE BIG SCREEN */}
      <AsideBarNavigation />

      <main
        className=" md:pl-[214px]
        p-4 md:pt-4 pt-16"
      >
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;

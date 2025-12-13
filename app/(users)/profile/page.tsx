import { getUser } from "@/actions/authAction";
import AuthForm from "@/components/auth/AuthForm";
import LogoutBtn from "@/components/auth/LogoutBtn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { roboto } from "@/lib/fonts";
import { ADMIN_ROLES } from "@/utils/admin";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
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

  if (ADMIN_ROLES.includes(user.role)) {
    redirect("/admin/services");
  }

  return (
    <div
      className="min-h-dvh items-center justify-center bg-linear-to-br 
    from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950
    flex flex-col gap-4
    "
    >
      <LogoutBtn />

      <h2 className="text-2xl font-medium text-gray-800 dark:text-gray-200">
        Bonjour, {user.name} 👋
      </h2>
    </div>
  );
}

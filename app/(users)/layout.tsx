import { getUser } from "@/actions/authAction";
import AuthForm from "@/components/auth/AuthForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { roboto } from "@/lib/fonts";
import React from "react";

interface UsersLayoutProps {
  children: React.ReactNode;
}

async function UsersLayout({ children }: UsersLayoutProps) {
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

  return <div>{children}</div>;
}

export default UsersLayout;

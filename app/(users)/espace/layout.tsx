import { getUser } from "@/actions/authAction";
import { getDeliveryCompany } from "@/actions/services";
import AuthForm from "@/components/auth/AuthForm";
import AsideBarNavigation from "@/components/services/AsideBarNavigation";
import HeaderNavigation from "@/components/services/HeaderNavigation";
import NoServiceFound from "@/components/services/NoServiceFound";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { roboto } from "@/lib/fonts";
import { ADMIN_ROLES } from "@/utils/admin";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

type EspaceLayoutProps = {
  children: ReactNode;
};

async function EspaceLayout({ children }: EspaceLayoutProps) {
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

  const companies = await getDeliveryCompany();

  //   NO companies found

  if (!companies || companies.length < 1) {
    return <NoServiceFound />;
  }

  // COMPANIES EXIST

  const company = companies[0];

  if (company.ownerId !== user.id) {
    return <div>Non authorise!</div>;
  }

  return (
    <div className="relative w-full">
      {/* HEADER SMALL SCREEN */}
      <HeaderNavigation company={company} />

      {/* ASIDE BIG SCREEN */}
      <AsideBarNavigation company={company} />
      <main
        className=" md:pl-[214px]
      p-4 md:pt-4 pt-16
      "
      >
        {children}
      </main>
    </div>
  );
}

export default EspaceLayout;

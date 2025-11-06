// app/integration/page.tsx
import { roboto } from "@/lib/fonts";
import { redirect } from "next/navigation";

export default function IntegrationPage() {
  return redirect("/integration/credentials");

  return (
    <div>
      <h2 className={`${roboto.className} text-2xl font-bold mb-4`}>
        Bienvenue dans la section API
      </h2>
      <p className="text-muted-foreground">
        Ici vous pouvez récupérer vos identifiants API, consulter la
        documentation et voir des exemples de requêtes.
      </p>
    </div>
  );
}

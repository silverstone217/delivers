"use client";

import { roboto } from "@/lib/fonts";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function DocumentationPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className={`${roboto.className} text-4xl font-bold text-center`}>
        Documentation API & Intégrations
      </h1>

      {/* INTRODUCTION */}
      <Card className="shadow-sm border border-muted/30 rounded-2xl">
        <CardHeader>
          <CardTitle>Introduction</CardTitle>
          <CardDescription>
            Cette documentation explique comment intégrer notre API pour obtenir
            les tarifs de livraison selon l&apos;origine, la destination et les
            dimensions du colis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            L’API utilise des clés d’API individuelles pour chaque utilisateur.
            Vous pouvez récupérer votre clé dans votre tableau de bord.
          </p>
        </CardContent>
      </Card>

      {/* ENDPOINTS */}
      <Card className="shadow-sm border border-muted/30 rounded-2xl">
        <CardHeader>
          <CardTitle>Endpoints</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="get-pricing">
            <TabsList className="w-full border-b mb-4">
              <TabsTrigger value="get-pricing">
                GET /api/get-pricing
              </TabsTrigger>
              <TabsTrigger value="auth">Authentification</TabsTrigger>
            </TabsList>

            <TabsContent value="get-pricing">
              <h3 className="text-lg font-semibold mb-2">Obtenir les tarifs</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Envoie l&apos;adresse d&apos;origine, de destination et les
                dimensions du colis pour obtenir la liste des compagnies et
                tarifs disponibles.
              </p>

              <Badge variant="secondary" className="mb-2">
                Méthode POST
              </Badge>
              <pre className="bg-muted/20 p-4 rounded-lg overflow-x-auto">
                {`POST /api/get-pricing
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY`}
              </pre>

              <h4 className="font-medium mt-4">
                Format des données d&apos;entrée
              </h4>
              <pre className="bg-muted/20 p-4 rounded-lg overflow-x-auto">
                {`{
  "origin": {
    "commune": "Kasa-Vubu",
    "quartier": "Anciens Combattants"
  },
  "destination": {
    "commune": "Gombe",
    "quartier": "Commerce"
  },
  "parcel": {
    "weight": 2.5,
    "width": 20,
    "length": 35
  }
}`}
              </pre>

              <h4 className="font-medium mt-4">Exemple de réponse</h4>
              <pre className="bg-muted/20 p-4 rounded-lg overflow-x-auto">
                {`[
  {
    "tarifId": "cuid123",
    "name": "Standard",
    "price": 15.5,
    "express": false,
    "company": {
      "id": "cuid456",
      "name": "FastDelivery",
      "logo": "https://logo.url/logo.png"
    },
    "senderZone": "Kasa-Vubu",
    "receiverZone": "Gombe",
    "estimatedDelivery": "Standard"
  },
  {
    "tarifId": "cuid789",
    "name": "Express",
    "price": 25.0,
    "express": true,
    "company": {
      "id": "cuid456",
      "name": "FastDelivery",
      "logo": "https://logo.url/logo.png"
    },
    "senderZone": "Kasa-Vubu",
    "receiverZone": "Gombe",
    "estimatedDelivery": "Express"
  }
]`}
              </pre>

              <h4 className="font-medium mt-4">Types d&apos;erreurs</h4>
              <pre className="bg-muted/20 p-4 rounded-lg overflow-x-auto">
                {`{
  "error": "Invalid API Key"
}

{
  "error": "Zone not supported"
}

{
  "error": "Server error, please retry"
}`}
              </pre>
            </TabsContent>

            <TabsContent value="auth">
              <h3 className="text-lg font-semibold mb-2">Authentification</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Toutes les requêtes doivent inclure votre clé API dans
                l&apos;entête Authorization.
              </p>
              <pre className="bg-muted/20 p-4 rounded-lg overflow-x-auto">
                {`Authorization: Bearer YOUR_API_KEY`}
              </pre>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* CONSEILS */}
      <Card className="shadow-sm border border-muted/30 rounded-2xl">
        <CardHeader>
          <CardTitle>Conseils et bonnes pratiques</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
            <li>
              Vérifiez toujours que la commune et le quartier existent dans
              notre base de données.
            </li>
            <li>
              Si une dimension du colis n’est pas fournie, elle sera considérée
              comme 0.
            </li>
            <li>
              Les tarifs express sont prioritaires si la même compagnie propose
              plusieurs options.
            </li>
            <li>
              Gardez votre clé API secrète et ne la partagez pas publiquement.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

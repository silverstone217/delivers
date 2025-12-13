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
            Cette API permet d’obtenir les tarifs de livraison entre deux zones,
            en fonction de l’origine, la destination, les dimensions du colis et
            le mode d’expédition (Express ou Standard).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Toutes les requêtes nécessitent une clé API.
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
              <TabsTrigger value="get-pricing" className="line-clamp-1">
                POST /api/get-pricing
              </TabsTrigger>
              <TabsTrigger value="auth" className="line-clamp-1">
                Authentification
              </TabsTrigger>
            </TabsList>

            <TabsContent value="get-pricing">
              <h3 className="text-lg font-semibold mb-2">Obtenir les tarifs</h3>

              <Badge variant="secondary" className="mb-3">
                Méthode POST
              </Badge>

              <pre className="bg-muted/20 p-4 rounded-lg overflow-x-auto">
                {`POST https://delivers.vercel.app/api/get-pricing
Content-Type: application/json
x-api-key: YOUR_API_KEY`}
              </pre>

              <h4 className="font-medium mt-4">
                Données d’entrée (toutes obligatoires)
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
 "parcel" :{
    "weight": 2.5,
    "length": 35,
    "width": 20,
  },
  "express": true
}`}
              </pre>

              <h4 className="font-medium mt-4">Exemple de réponse</h4>
              <pre className="bg-muted/20 p-4 rounded-lg overflow-x-auto text-xs">
                {`[
  {
    "tarifId": "cmhnd4ala006ltkgwbvbpvsrj",
    "name": "A_C",
    "price": 15000,
    "express": true,
    "company": {
      "id": "cmhm4vvxv0001tk68i7iayunb",
      "name": "shadunk express",
      "logo": "https://.../logo.png",
      "contact": {
        "email": "shadunk@express.com",
        "phone": "835647896",
        "address": "17, isiro, gombe, kinshasa",
        "facebook": null,
        "whatsapp": null,
        "website": null
      }
    },
    "senderZoneId": "cmhnc0yhp0003tkgwyr012sot",
    "receiverZoneId": "cmhnca46q003vtkgwgb4eir69",
    "estimatedDelivery": "Express"
  }
]`}
              </pre>

              <h4 className="font-medium mt-4">Notes</h4>
              <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                <li>
                  <b>weight(Poids)</b>, <b>length(Longueur)</b> et{" "}
                  <b>width(Largeur)</b> doivent être fournis.
                </li>
                <li>
                  <b>express</b> = `true` {"=>"} recherche uniquement express.
                </li>
                <li>
                  Les champs obligatoires dans `company.contact` sont:{" "}
                  <b>email</b>, <b>phone</b>, <b>address</b>.
                </li>
              </ul>

              <h4 className="font-medium mt-4">Types d’erreurs possibles</h4>
              <pre className="bg-muted/20 p-4 rounded-lg overflow-x-auto text-sm">
                {`{ "error": "Invalid API Key" }
{ "error": "Zone not supported" }
{ "error": "No pricing available" }
{ "error": "Server error, please retry" }`}
              </pre>
            </TabsContent>

            <TabsContent value="auth">
              <h3 className="text-lg font-semibold mb-2">Authentification</h3>
              <pre className="bg-muted/20 p-4 rounded-lg overflow-x-auto">
                {`x-api-key: YOUR_API_KEY`}
              </pre>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

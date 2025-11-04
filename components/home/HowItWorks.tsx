"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, MapPin, DollarSign } from "lucide-react";
import { roboto } from "@/lib/fonts";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 1,
    title: "1. Entrez vos informations",
    description:
      "Indiquez votre adresse d’envoi et de réception, ainsi que les dimensions de votre colis (poids, longueur, largeur).",
    icon: <MapPin className="w-8 h-8 text-primary" />,
  },
  {
    id: 2,
    title: "2. Comparez les tarifs",
    description:
      "Nous trouvons automatiquement les compagnies de livraison disponibles et leurs tarifs selon vos critères.",
    icon: <DollarSign className="w-8 h-8 text-green-600" />,
  },
  {
    id: 3,
    title: "3. Choisissez votre compagnie",
    description:
      "Consultez les détails, les contacts ou le site web de la compagnie qui vous convient le mieux.",
    icon: <Truck className="w-8 h-8 text-orange-500" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full bg-linear-to-b from-white via-gray-50 to-gray-100 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Title */}
        <h2
          className={cn(
            "text-3xl md:text-4xl font-bold mb-4 text-gray-900",
            roboto.className
          )}
        >
          🚀 Comment ça marche ?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          En quelques étapes simples, trouvez le tarif de livraison idéal selon
          vos besoins et comparez les meilleures compagnies du Congo.
        </p>

        {/* Steps */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <Card
              key={step.id}
              className="group relative overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white"
            >
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-gray-100 rounded-full group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </CardContent>

              {/* Accent color hover effect */}
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

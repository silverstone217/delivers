"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Users, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { roboto } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";

const benefits = [
  {
    id: 1,
    title: "Augmentez votre visibilité",
    description:
      "Votre compagnie apparaît directement aux clients qui cherchent des services de livraison dans vos zones.",
    icon: <Globe className="w-8 h-8 text-primary" />,
  },
  {
    id: 2,
    title: "Gérez vos tarifs facilement",
    description:
      "Ajoutez et modifiez vos tarifs entre différentes zones en quelques clics.",
    icon: <Truck className="w-8 h-8 text-green-600" />,
  },
  {
    id: 3,
    title: "Attirez plus de clients",
    description:
      "Les utilisateurs peuvent consulter vos tarifs et vous contacter directement via vos coordonnées ou votre site web.",
    icon: <Users className="w-8 h-8 text-orange-500" />,
  },
];

const ForCompanies = () => {
  return (
    <section className="w-full bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <h2
          className={cn(
            "text-3xl md:text-4xl font-bold mb-4 text-gray-900",
            roboto.className
          )}
        >
          📦 Pour les compagnies de livraison
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Inscrivez votre service et atteignez plus de clients rapidement. Gérez
          vos tarifs et zones facilement depuis notre plateforme.
        </p>

        {/* Benefits */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {benefits.map((benefit) => (
            <Card
              key={benefit.id}
              className="group relative overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white"
            >
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-gray-100 rounded-full group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Button */}
        <Link href="/espace">
          <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 group md:min-w-56">
            Inscrivez votre compagnie{" "}
            <ArrowRight className="group-hover:translate-x-2 transition-all duration-300 ease-in transform" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ForCompanies;

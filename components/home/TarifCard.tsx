// components/TarifCard.tsx (À mettre dans votre dossier de composants)
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  DollarSign,
  MapPin,
  Mail,
  Phone,
  Globe,
  MessageCircle,
  //   Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaFacebook } from "react-icons/fa6";
import { capitaliseFirstLetter } from "@/utils/function";

// Définition de types pour la clarté
type Contact = {
  email: string;
  phone: string;
  facebook: string | null;
  whatsapp: string | null;
  website: string | null;
  address: string;
};

type Tarif = {
  companyId: string;
  companyName: string;
  companyLogo: string | null;
  price: number;
  express: boolean;
  tarifId: string;
  contacts: Contact | null;
};

type TarifCardProps = {
  tarif: Tarif;
};

const TarifCard = ({ tarif }: TarifCardProps) => {
  const { companyName, companyLogo, price, express, contacts } = tarif;

  // Fonction utilitaire pour le rendu des icônes de contact
  const renderContactButton = (
    icon: React.ReactNode,
    href: string | null | undefined,
    label: string
  ) => {
    if (!href) return null;

    // Ajout du protocole si manquant pour le site web
    let url = href;
    if (label === "Site Web" && !url.startsWith("http")) {
      url = `https://${url}`;
    }

    return (
      <Button
        asChild
        variant="outline"
        size="icon"
        title={label}
        className="shrink-0 w-8 h-8 p-1"
      >
        <Link href={url} target="_blank" rel="noopener noreferrer">
          {icon}
        </Link>
      </Button>
    );
  };

  return (
    <Card className="p-4 border rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-3 border-b pb-3">
        {/* 1. LOGO & NOM DE LA COMPAGNIE */}
        <div className="flex items-center gap-3">
          {companyLogo ? (
            <Image
              src={companyLogo}
              alt={`${companyName} Logo`}
              width={40}
              height={40}
              className="rounded-full object-cover border"
            />
          ) : (
            <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full text-gray-500 font-bold text-sm">
              {companyName.charAt(0)}
            </div>
          )}
          <h3 className="font-bold text-xl text-gray-800">
            {capitaliseFirstLetter(companyName)}
          </h3>
        </div>

        {/* 2. ÉTIQUETTE EXPRESS/STANDARD */}
        <span
          className={cn(
            "px-3 py-1 text-[10px] lg:text-xs font-semibold rounded-full text-center",
            express
              ? "bg-orange-100 text-orange-700 border border-orange-300"
              : "bg-blue-100 text-blue-700 border border-blue-300"
          )}
        >
          {express ? "Livraison Express" : "Livraison Standard"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
        {/* 3. PRIX */}
        <div className="flex flex-col items-start gap-1">
          <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
            <DollarSign className="w-4 h-4" /> Prix Estimé
          </p>
          <p className="text-3xl font-extrabold text-green-600">
            {price.toLocaleString()} FC
          </p>
        </div>

        {/* 4. CONTACTS (au centre) */}
        <div className="md:border-x md:px-4 flex flex-col items-center justify-center py-2 md:py-0">
          {/* <p className="text-sm font-medium text-gray-500 mb-2">
            Contacter la compagnie
          </p> */}
          <div className="flex flex-wrap gap-2">
            {contacts && (
              <>
                {renderContactButton(
                  <Phone className="w-4 h-4" />,
                  `tel:${contacts.phone}`,
                  "Téléphone"
                )}
                {renderContactButton(
                  <MessageCircle className="w-4 h-4 text-green-500" />,
                  `https://wa.me/${contacts.whatsapp}`,
                  "WhatsApp"
                )}
                {renderContactButton(
                  <Mail className="w-4 h-4" />,
                  `mailto:${contacts.email}`,
                  "Email"
                )}
                {renderContactButton(
                  <Globe className="w-4 h-4" />,
                  contacts.website,
                  "Site Web"
                )}
                {renderContactButton(
                  <FaFacebook className="w-4 h-4 text-blue-600" />,
                  contacts.facebook,
                  "Facebook"
                )}
                {renderContactButton(
                  <MapPin className="w-4 h-4" />,
                  `/map?address=${contacts.address}`,
                  "Adresse"
                )}
              </>
            )}
            {!contacts && (
              <p className="text-xs text-gray-400">Contacts non fournis.</p>
            )}
          </div>
        </div>

        {/* 5. BOUTON D'ACTION (à droite) */}
        <div className="md:text-right">
          <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 mt-3 md:mt-0">
            <Phone className="shrink-0" /> Contacter la compagnie
          </Button>
          {contacts?.address && (
            <p className="text-xs text-gray-500 mt-2">
              Adresse: {contacts.address.substring(0, 30)}...
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TarifCard;

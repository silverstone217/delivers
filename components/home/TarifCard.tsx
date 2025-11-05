"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Mail, Phone, Globe, Zap } from "lucide-react";
import { FaFacebook, FaWhatsapp } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { capitaliseFirstLetter } from "@/utils/function";

type Contact = {
  email: string;
  phone: string;
  facebook?: string | null;
  whatsapp?: string | null;
  website?: string | null;
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

export default function TarifCard({ tarif }: { tarif: Tarif }) {
  const { companyName, companyLogo, price, express, contacts } = tarif;

  return (
    <Card
      className="flex flex-col justify-between h-full border border-gray-200 shadow-sm hover:shadow-lg 
      transition-all duration-300 rounded-2xl overflow-hidden bg-white"
    >
      {/* HEADER */}
      <CardHeader className="flex flex-col items-center text-center pb-0">
        <div className="w-16 h-16 mb-3 rounded-full bg-gray-50 border flex items-center justify-center">
          {companyLogo ? (
            <Image
              src={companyLogo}
              alt={companyName}
              width={64}
              height={64}
              className="object-cover rounded-full"
            />
          ) : (
            <span className="text-lg font-bold text-gray-400">
              {companyName[0]?.toUpperCase()}
            </span>
          )}
        </div>
        <h3 className="font-semibold text-lg text-gray-800">
          {capitaliseFirstLetter(companyName)}
        </h3>
        <span
          className={cn(
            "mt-2 px-3 py-1 text-xs font-medium rounded-full",
            express
              ? "bg-yellow-100 text-yellow-700 flex items-center gap-1"
              : "bg-blue-100 text-blue-700"
          )}
        >
          {express && <Zap className="w-3 h-3" />}{" "}
          {express ? "Express" : "Standard"}
        </span>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="text-center py-5">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <DollarSign className="w-4 h-4" />
            <span>Tarif</span>
          </div>
          <p className="text-3xl font-extrabold text-green-600">
            {price.toLocaleString()} FC
          </p>
        </div>
      </CardContent>

      {/* FOOTER */}
      <CardFooter className="flex flex-col items-center gap-3 border-t pt-3">
        {/* Lien principal */}
        {contacts?.phone && (
          <Button
            asChild
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
          >
            <Link href={`tel:${contacts.phone}`}>
              <Phone className="w-4 h-4 mr-2" /> Contacter la compagnie
            </Link>
          </Button>
        )}

        {/* Liens secondaires */}
        <div className="flex justify-center gap-3">
          {contacts?.whatsapp && (
            <Link
              href={`https://wa.me/${contacts.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              title="WhatsApp"
              className="p-2 rounded-full bg-green-50 hover:bg-green-100 text-green-600 transition"
            >
              <FaWhatsapp className="w-4 h-4" />
            </Link>
          )}

          {contacts?.email && (
            <Link
              href={`mailto:${contacts.email}`}
              title="Email"
              className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
            >
              <Mail className="w-4 h-4" />
            </Link>
          )}

          {contacts?.website && (
            <Link
              href={
                contacts.website.startsWith("http")
                  ? contacts.website
                  : `https://${contacts.website}`
              }
              target="_blank"
              title="Site web"
              className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 transition"
            >
              <Globe className="w-4 h-4" />
            </Link>
          )}

          {contacts?.facebook && (
            <Link
              href={contacts.facebook}
              target="_blank"
              title="Facebook"
              className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 transition"
            >
              <FaFacebook className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Adresse */}
        {contacts?.address && (
          <p className="text-xs text-gray-500 text-center mt-1">
            📍{" "}
            {contacts.address.length > 35
              ? `${contacts.address.slice(0, 35)}...`
              : contacts.address}
          </p>
        )}
      </CardFooter>
    </Card>
  );
}

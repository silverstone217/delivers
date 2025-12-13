"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Globe, MapPin, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { capitaliseFirstLetter } from "@/utils/function";
import { Contact } from "@/lib/generated/prisma/client";

type Props = {
  companyId: string;
  companyName: string;
  companyLogo: string | null;
  contacts: Contact | null;
  createdAt: Date;
};

const CompanyCard = ({
  companyName,
  companyLogo,
  contacts,
  companyId,
}: Props) => {
  const noContacts =
    !contacts ||
    (!contacts.phone &&
      !contacts.email &&
      !contacts.website &&
      !contacts.whatsapp &&
      !contacts.address);

  return (
    <Card
      className="
      group p-4 rounded-xl border shadow-sm
      hover:shadow-lg hover:-translate-y-1
      transition-all duration-300 cursor-pointer
      flex flex-col justify-between h-full
      "
    >
      {/* TOP CONTENT */}
      <div>
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-3">
          {companyLogo ? (
            <Image
              src={companyLogo}
              alt={companyName}
              width={50}
              height={50}
              className="rounded-full object-cover border"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold">
              {companyName.charAt(0)}
            </div>
          )}

          <h3 className="font-bold text-lg">
            {capitaliseFirstLetter(companyName)}
          </h3>
        </div>

        {/* CONTACTS */}
        <div className="text-sm space-y-2 mb-4">
          {noContacts ? (
            <p className="text-muted-foreground italic">Contact non fourni</p>
          ) : (
            <>
              {contacts?.phone && (
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" /> {contacts.phone}
                </p>
              )}
              {contacts?.email && (
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" /> {contacts.email}
                </p>
              )}
              {contacts?.whatsapp && (
                <a
                  href={`https://wa.me/${contacts.whatsapp}`}
                  target="_blank"
                  className="flex items-center gap-2 hover:text-green-600 transition"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              )}
              {contacts?.website && (
                <a
                  href={
                    contacts.website.startsWith("http")
                      ? contacts.website
                      : `https://${contacts.website}`
                  }
                  target="_blank"
                  className="flex items-center gap-2 hover:text-blue-600 transition"
                >
                  <Globe className="w-4 h-4" /> Site Web
                </a>
              )}
              {contacts?.address && (
                <p className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" /> {contacts.address}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* ACTION BUTTON ALWAYS AT THE BOTTOM */}
      <Button
        asChild
        className="w-full mt-auto group-hover:bg-primary group-hover:text-white transition"
      >
        <Link href={`/admin/services/${companyId}`}>Voir la compagnie</Link>
      </Button>
    </Card>
  );
};

export default CompanyCard;

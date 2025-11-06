"use client";
import { updateContacts } from "@/actions/services/contact";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { roboto } from "@/lib/fonts";
import { isEmptyString } from "@/utils/function";
import { Contact, DeliveryCompany } from "@prisma/client";
import {
  Globe,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { FaFacebook } from "react-icons/fa6";
import { toast } from "sonner";

type Props = {
  company: DeliveryCompany;
  contacts: Contact | null;
};

const ModifyCompanyContacts = ({ company, contacts }: Props) => {
  const [email, setEmail] = useState(contacts?.email ?? "");
  const [phone, setPhone] = useState(contacts?.phone ?? "");
  const [address, setAddress] = useState(contacts?.address ?? "");
  const [facebook, setFacebook] = useState(contacts?.facebook ?? "");
  const [whatsapp, setWhatsapp] = useState(contacts?.whatsapp ?? "");
  const [website, setWebsite] = useState(contacts?.website ?? "");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async () => {
    setLoading(true);
    try {
      // future API call
      const result = await updateContacts({
        companyId: company.id,
        email,
        phone,
        address,
        facebook,
        whatsapp,
        website,
      });

      if (result.error) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Impossible de continuer sur cette actions");
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = useMemo((): boolean => {
    if (loading) return true;
    if (isEmptyString(email) || isEmptyString(phone) || isEmptyString(address))
      return true;

    const noChange =
      contacts &&
      email === (contacts.email ?? "") &&
      phone === (contacts.phone ?? "") &&
      address === (contacts.address ?? "") &&
      facebook === (contacts.facebook ?? "") &&
      whatsapp === (contacts.whatsapp ?? "") &&
      website === (contacts.website ?? "");

    return !!noChange; // <-- force un booléen
  }, [loading, email, phone, address, facebook, whatsapp, website, contacts]);

  const isNewContact = !contacts;

  return (
    <Card className="w-full max-w-lg border border-muted/30 rounded-2xl shadow-sm">
      <CardHeader className="text-center space-y-2">
        <CardTitle className={`${roboto.className} text-xl font-semibold`}>
          {isNewContact ? "Ajouter des contacts" : "Modifier les contacts"}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {isNewContact
            ? "Renseignez les informations de contact de votre service."
            : "Mettez à jour les informations existantes."}
        </p>
      </CardHeader>

      <CardContent className="grid gap-4 mt-4">
        {/* Email */}
        <div className="grid gap-2">
          <Label htmlFor="email">
            Email <strong className="text-destructive">*</strong>
          </Label>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="ex: contact@kiexpress.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        {/* Téléphone */}
        <div className="grid gap-2">
          <Label htmlFor="phone">
            Téléphone <strong className="text-destructive">*</strong>
          </Label>

          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-muted-foreground" />

            <div className="relative w-full flex items-center gap-2">
              {/* 📞 Indicatif +243 (fixe) */}
              <span className="p-2 px-3 border bg-secondary/30 rounded-md text-sm font-medium text-gray-700 whitespace-nowrap">
                +243
              </span>

              {/* Champ pour les 9 chiffres */}
              <Input
                id="phone"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]{9}"
                placeholder="830 123 456"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading}
                className="flex-1"
                minLength={9}
                maxLength={9}
              />
            </div>
          </div>
        </div>

        {/* Adresse */}
        <div className="grid gap-2">
          <Label htmlFor="address">
            Adresse <strong className="text-destructive">*</strong>
          </Label>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <Input
              id="address"
              type="text"
              placeholder="17, isiro, gombe, kinshasa"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="grid gap-2">
          <Label htmlFor="facebook">Facebook</Label>
          <div className="flex items-center gap-2">
            <FaFacebook className="w-4 h-4 text-muted-foreground" />
            <Input
              id="facebook"
              type="url"
              placeholder="https://facebook.com/kinexpress"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-muted-foreground" />

            <div className="relative w-full flex items-center gap-2">
              {/* 📞 Indicatif +243 (fixe) */}
              <span className="p-2 px-3 border bg-secondary/30 rounded-md text-sm font-medium text-gray-700 whitespace-nowrap">
                +243
              </span>
              <Input
                id="whatsapp"
                type="tel"
                placeholder="830 123 456"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                disabled={loading}
                className="flex-1"
                inputMode="numeric"
                pattern="[0-9]{9}"
                minLength={9}
                maxLength={9}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="website">Site web</Label>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <Input
              id="website"
              type="url"
              placeholder="https://kinexpress.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          <strong>NB:</strong> Entrez les 9 chiffres sans le 0 ni l’indicatif
          (+243)
        </p>
      </CardContent>

      <CardFooter className="flex justify-end pt-4">
        <Button onClick={handleUpdate} disabled={isButtonDisabled}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              En cours...
            </>
          ) : isNewContact ? (
            "Ajouter"
          ) : (
            "Modifier"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModifyCompanyContacts;

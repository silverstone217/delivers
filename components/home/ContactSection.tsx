"use client";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { sendContactEmail } from "@/actions/sendMail";
import { isEmptyString } from "@/utils/function";

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEmptyString(name) || isEmptyString(email) || isEmptyString(message)) {
      toast.error("Merci de remplir tous les champs.");
      return;
    }

    setLoading(true);

    try {
      const res = await sendContactEmail({
        name,
        email,
        message,
      });

      if (res.error) {
        toast.error(res.message);
        return;
      }

      toast.success("Message envoyé avec succès !");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const disabledButtonSub = useMemo(() => {
    if (loading) return true;
  }, [loading]);

  return (
    <section
      className="max-w-7xl mx-auto px-6 py-14 md:bg-background bg-gray-50 scroll-mt-20"
      id="contact"
    >
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Contactez-nous</h2>
      <p className="text-gray-600 mb-8">
        Vous avez une question ou souhaitez en savoir plus sur nos services ?
        Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Nom */}
        <div className="flex flex-col">
          <Label htmlFor="name">Nom</Label>
          <Input
            id="name"
            placeholder="ex: Jean kabeya"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="ex: kabeyajean@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Message */}
        <div className="flex flex-col md:col-span-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Votre message..."
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Bouton */}
        <div className="md:col-span-2">
          <Button type="submit" className="w-full" disabled={disabledButtonSub}>
            {loading ? "Envoi en cours..." : "Envoyer le message"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ContactSection;

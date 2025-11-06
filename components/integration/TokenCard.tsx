"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // ou ton système de notifications

export default function TokenCard() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 💡 Pour l'instant on simule la récupération du token
  useEffect(() => {
    const fetchToken = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/integration/get-token");
        const data = await res.json();
        setToken(data.token);
      } catch (error) {
        console.error(error);
        toast.error("Impossible de récupérer votre token.");
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  const handleCopy = () => {
    if (!token) return;
    navigator.clipboard.writeText(token);
    toast.success("Token copié dans le presse-papier !");
  };

  const handleRegenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/integration/regenerate-token", {
        method: "POST",
      });
      const data = await res.json();
      setToken(data.token);
      toast.success("Token régénéré avec succès !");
    } catch (error) {
      console.error(error);
      toast.error("Impossible de régénérer le token.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-muted/10 border border-muted/30 p-6 rounded-xl flex flex-col gap-4">
      <label className="text-sm font-medium">Votre token unique :</label>
      <div className="flex gap-2 items-center">
        <input
          className="flex-1 p-2 rounded border border-muted/40 bg-white text-sm font-mono"
          type="text"
          readOnly
          value={token ?? "Aucun token généré"}
        />
        <Button onClick={handleCopy} disabled={!token || loading} size="sm">
          Copier
        </Button>
      </div>
      <Button
        onClick={handleRegenerate}
        variant="outline"
        size="sm"
        disabled={loading}
      >
        Régénérer le token
      </Button>
      <p className="text-xs text-muted-foreground">
        Ce token sera utilisé pour authentifier vos requêtes vers l’API.
      </p>
    </div>
  );
}

import { createId } from "@paralleldrive/cuid2";

// IS EMPTY STRING
export function isEmptyString(str: string) {
  return str.replace(/ /g, "") === "";
}

// CAPITALIZE FIRST LETTER
export function capitaliseFirstLetter(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// FORMAT DATE
export function formatJoinedDate(value: string | Date | number) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return ""; // date invalide

  // Affiche : "1 janvier 2024 à 15:30" (date longue + heure courte)
  return d.toLocaleString("fr-FR", {
    dateStyle: "long",
    // timeStyle: "short",
  });
}

// FUNCTION IS GREATER THAN

export function isGreaterThan(a: string | number, b: string | number): boolean {
  const numA = Number(a);
  const numB = Number(b);

  if (isNaN(numA) || isNaN(numB)) {
    console.warn("Valeurs non numériques :", { a, b });
    return false;
  }

  return numA > numB;
}

// CUID
export function generateApiKey() {
  return `cmp_live_${createId()}`;
}

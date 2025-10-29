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

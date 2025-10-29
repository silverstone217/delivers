// IS EMPTY STRING
export function isEmptyString(str: string) {
  return str.replace(/ /g, "") === "";
}

// CAPITALIZE FIRST LETTER
export function capitaliseFirstLetter(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// src/utils/string.ts


export function decodeHtml(str: string): string {
  if (!str) return str;
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

// src/config/cities.ts
export type City = { slug: string; name: string };

export const cities = [
  { slug: "kobenhavn", name: "København" },
  { slug: "aarhus", name: "Aarhus" },
  { slug: "odense", name: "Odense" },
  { slug: "roskilde", name: "Roskilde" }, // (valgfri) ny by
] satisfies City[];

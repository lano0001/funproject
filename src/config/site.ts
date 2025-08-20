// src/config/site.ts
import { services } from "./services";

export type City = { slug: string; name: string };

export const cities: City[] = [
  { slug: "kobenhavn", name: "København" },
  { slug: "aarhus", name: "Aarhus" },
  { slug: "odense", name: "Odense" },
  { slug: "roskilde", name: "Roskilde" },
];

type CityRule =
  | "ALL"
  | {
      includeTags?: string[];
      excludeTags?: string[];
      plus?: string[];
      except?: string[];
      only?: string[];
    };

export const site = {
  name: "Vagternetest",
  tagline: "Autoriseret vagtfirma – døgnbemanding i hele Danmark",
  phone: "+45 12 34 56 78 90",
  email: "kontakt@vagternetest.dk",
  street: "testgade 12",
  postal: "1360",
  city: "København K",
  country: "DK",
  orgNumber: "CVR 12345678",
  url: "https://www.vagterne.dk",
  socials: {
    facebook: "https://facebook.com/vagterne",
    linkedin: "https://www.linkedin.com/company/vagterne/",
  },

  cities,
  services,

  cityServiceMap: {
    kobenhavn: "ALL", // alle services

    aarhus: { includeTags: ["core", "event", "construction", "retail"] },

    odense: {
      includeTags: ["core", "retail"],
      plus: ["brandteknisk-rundering"],
    },

    roskilde: { includeTags: ["core", "construction", "event"] },
  } as Record<string, CityRule>,
};

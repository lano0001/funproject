export type FAQ = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  blurb: string;
  tags: string[]; // grupper der gør konfiguration nem
  faqs?: FAQ[];
};

export const services: Service[] = [
  {
    slug: "brandvagt",
    name: "Brandvagt",
    blurb: "Forebyggelse, tilsyn og beredskab ved varme arbejder og events.",
    tags: ["core", "construction"],
  },
  {
    slug: "byggepladsvagt",
    name: "Byggepladsvagt",
    blurb: "Overvågning, adgangskontrol og patruljering på byggepladser.",
    tags: ["core", "construction"],
  },
  {
    slug: "eventvagt",
    name: "Eventvagt",
    blurb: "Sikkerhed, crowd control og gæsteservice ved arrangementer.",
    tags: ["core", "event"],
  },
  {
    slug: "butiksvagt",
    name: "Butiksvagt",
    blurb: "Forebygger butikstyveri, skaber tryghed for personale og kunder.",
    tags: ["retail"],
  },
  {
    slug: "receptionistvagt",
    name: "Receptionistvagt",
    blurb: "Kombineret service- og sikkerhedsvagt i receptioner.",
    tags: ["corporate"],
  },
  {
    slug: "dognvagt",
    name: "Døgnvagt",
    blurb: "24/7 tilstedeværelse for maksimal sikkerhed og tryghed.",
    tags: ["core"],
  },
  {
    slug: "mobilvagt",
    name: "Mobilvagt",
    blurb: "Patruljerende vagter, der rykker ud til adresser efter behov.",
    tags: ["core"],
  },
  {
    slug: "kontorvagt",
    name: "Kontorvagt",
    blurb: "Sikkerhedsløsninger for kontormiljøer og erhvervslejemål.",
    tags: ["corporate"],
  },
  {
    slug: "festivalvagt",
    name: "Festivalvagt",
    blurb: "Specialister i store events, crowd control og nødberedskab.",
    tags: ["event"],
  },
  {
    slug: "plejehjemsvagt",
    name: "Plejehjemsvagt",
    blurb: "Skaber tryghed for beboere og personale på plejecentre.",
    tags: ["care"],
  },
  {
    slug: "alarmpatrulje",
    name: "Alarmpatrulje",
    blurb: "Rykker hurtigt ud ved alarmudløsning eller mistænkelig aktivitet.",
    tags: ["core"],
  },
  {
    slug: "parkeringsovervaagning",
    name: "Parkeringsvagt",
    blurb: "Kontrol af private og erhvervsparkeringsområder.",
    tags: ["special"],
  },
  {
    slug: "hotelsikkerhed",
    name: "Hotelvagt",
    blurb: "Diskret sikkerhed og service for hoteller og gæster.",
    tags: ["hospitality"],
  },
  {
    slug: "lagerhalvagt",
    name: "Lagerhalvagt",
    blurb: "Overvågning og adgangskontrol til lagre og produktionshaller.",
    tags: ["construction", "corporate"],
  },
  {
    slug: "natvagt",
    name: "Natvagt",
    blurb: "Tilstedeværelse og overvågning uden for normal åbningstid.",
    tags: ["core"],
  },
  {
    slug: "udeblivelsesvagt",
    name: "Udeblivelsesvagt",
    blurb: "Sikkerhed for medarbejdere, der arbejder alene.",
    tags: ["care"],
  },
  {
    slug: "brandteknisk-rundering",
    name: "Brandteknisk rundering",
    blurb: "Systematisk gennemgang og brandsikkerhedskontrol.",
    tags: ["construction"],
  },
  {
    slug: "vaertshusvagt",
    name: "Dørmand / Værtshusvagt",
    blurb: "Sikkerhed, adgangskontrol og konflikthåndtering i nattelivet.",
    tags: ["nightlife"],
  },
  {
    slug: "borepladsvagt",
    name: "Borepladsvagt",
    blurb: "Specialiseret vagt til olie- og borepladser.",
    tags: ["special"],
  },
  {
    slug: "privatvagt",
    name: "Privatvagt",
    blurb: "Tryghed og overvågning af private hjem og ejendomme.",
    tags: ["residential"],
  },
];

// src/lib/site-helpers.ts
import type { Metadata } from "next";
import { site } from "@/config/site";
import type { Service } from "@/config/services";

/* Lookups */
export function getCityBySlug(slug: string) {
  return site.cities.find((c) => c.slug === slug);
}
export function getServiceBySlug(slug: string): Service | undefined {
  return site.services.find((s) => s.slug === slug);
}

/* Static params */
export function cityStaticParams() {
  return site.cities.map((c) => ({ city: c.slug }));
}
export function serviceStaticParams() {
  return site.services.map((s) => ({ slug: s.slug }));
}

/* City/service relation (ALL | only | includeTags | excludeTags | plus | except) */
export function servicesForCity(citySlug: string): Service[] {
  const rule = (site as any).cityServiceMap?.[citySlug];
  if (!rule || rule === "ALL") return site.services;

  if ("only" in rule && rule.only?.length) {
    const set = new Set(rule.only);
    return site.services.filter((s) => set.has(s.slug));
  }

  let list = site.services as Service[];
  if ("includeTags" in rule && rule.includeTags?.length) {
    const inc = new Set(rule.includeTags);
    list = list.filter((s) => s.tags?.some((t) => inc.has(t)));
  }
  if ("excludeTags" in rule && rule.excludeTags?.length) {
    const exc = new Set(rule.excludeTags);
    list = list.filter((s) => !s.tags?.some((t) => exc.has(t)));
  }
  if ("except" in rule && rule.except?.length) {
    const ex = new Set(rule.except);
    list = list.filter((s) => !ex.has(s.slug));
  }
  if ("plus" in rule && rule.plus?.length) {
    const add = new Set(rule.plus);
    const extra = site.services.filter((s) => add.has(s.slug));
    const map = new Map(list.map((s) => [s.slug, s] as const));
    for (const s of extra) map.set(s.slug, s);
    list = Array.from(map.values());
  }
  return list;
}

/* NYT: Hvilke byer tilbyder en given service? (til intern linking) */
export function citiesForService(slug: string) {
  return site.cities.filter((c) =>
    servicesForCity(c.slug).some((s) => s.slug === slug)
  );
}

/* Metadata builders */
export function buildCityMetadata(citySlug: string): Metadata {
  const city = getCityBySlug(citySlug);
  if (!city) return { title: site.name };
  const count = servicesForCity(citySlug).length;
  const url = `${site.url}/${city.slug}`;
  const title = `${site.name} i ${city.name}`;
  const description = `Autoriseret vagtfirma i ${city.name}. ${count}+ ydelser – ring ${site.phone}.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "da_DK",
      type: "website",
    },
  };
}

export function buildServiceMetadata(svc: Service): Metadata {
  const url = `${site.url}/services/${svc.slug}`;
  const title = `${svc.name} – ${site.name}`;
  const description = svc.blurb ?? `${svc.name} fra ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "da_DK",
      type: "article",
    },
  };
}

/* Lille helper til tel:-links */
export function telHref() {
  return `tel:${site.phone.replace(/\s+/g, "")}`;
}

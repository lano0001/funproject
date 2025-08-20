// src/lib/structured-data.ts
import { site } from "@/config/site";
import type { Service } from "@/config/services";

export function localBusinessJsonLd() {
  const sameAs = Object.values(site.socials || {}).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.street,
      postalCode: site.postal,
      addressLocality: site.city,
      addressCountry: site.country,
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function serviceJsonLd(svc: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.name,
    description: svc.blurb,
    areaServed: "DK",
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      telephone: site.phone,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.street,
        postalCode: site.postal,
        addressLocality: site.city,
        addressCountry: site.country,
      },
    },
    url: `${site.url}/services/${svc.slug}`,
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbList(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function servicesItemListJsonLd(services: Service[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${site.url}/services/${s.slug}`,
      name: s.name,
    })),
  };
}

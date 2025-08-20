import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { site } from "@/config/site";
import { breadcrumbList } from "@/lib/structured-data";

export const dynamicParams = false;
export async function generateStaticParams() {
  return site.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const svc = site.services.find((s) => s.slug === slug);
  if (!svc) return { title: "Service" };
  const title = `${svc.name} – ${site.name}`;
  const description = svc.blurb ?? `${svc.name} fra ${site.name}`;
  const url = `${site.url}/services/${slug}`;
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

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const svc = site.services.find((s) => s.slug === slug);
  if (!svc) return notFound();

  const breadcrumbs = [
    { name: "Forside", url: site.url },
    { name: "Ydelser", url: `${site.url}/services` },
    { name: svc.name, url: `${site.url}/services/${svc.slug}` },
  ];

  return (
    <article className="prose prose-slate max-w-none">
      <nav className="not-prose mb-6 text-sm">
        <Link href="/services" className="underline">
          ← Alle ydelser
        </Link>
      </nav>

      <h1>{svc.name}</h1>
      <p className="lead">{svc.blurb}</p>

      <h2>
        Hvorfor vælge {site.name} til {svc.name.toLowerCase()}?
      </h2>
      <ul>
        <li>Autoriserede vagter og dokumenteret erfaring</li>
        <li>Risikovurdering, plan og rapportering</li>
        <li>Døgnbemanding og hurtig udrykning</li>
      </ul>

      <h2>Priseksempel</h2>
      <p>
        Kontakt os for et tilbud; prisen afhænger af tidsrum, lokation og
        opgavens omfang.
      </p>

      <h2>FAQ</h2>
      <details>
        <summary>Hvor hurtigt kan I rykke ud?</summary>
        <p>Ofte samme dag i de største byer – ring {site.phone}.</p>
      </details>
      <details>
        <summary>Er I autoriserede?</summary>
        <p>Ja, vi benytter autoriserede vagter med relevant uddannelse.</p>
      </details>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbList(breadcrumbs)),
        }}
      />
    </article>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { site } from "@/config/site";
import {
  getServiceBySlug,
  serviceStaticParams,
  buildServiceMetadata,
  citiesForService,
} from "@/lib/site-helpers";
import {
  serviceJsonLd,
  faqJsonLd,
  breadcrumbList,
} from "@/lib/structured-data";

export const dynamicParams = false;
export async function generateStaticParams() {
  return serviceStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const svc = getServiceBySlug(params.slug);
  if (!svc) return { title: "Service" };
  return buildServiceMetadata(svc);
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const svc = getServiceBySlug(params.slug);
  if (!svc) return notFound();

  const related = (site.services as any[])
    .filter(
      (s) =>
        s.slug !== svc.slug &&
        s.tags?.some((t: string) => svc.tags?.includes(t))
    )
    .slice(0, 6);

  const availableCities = citiesForService(svc.slug).slice(0, 8); // vis et udvalg

  const breadcrumbs = [
    { name: "Forside", url: site.url },
    { name: "Ydelser", url: `${site.url}/services` },
    { name: svc.name, url: `${site.url}/services/${svc.slug}` },
  ];

  return (
    <section className="container">
      {/* Breadcrumb */}
      <nav className="mb-4 text-sm text-slate-600">
        <Link href="/services" className="underline">
          ← Alle ydelser
        </Link>
      </nav>

      {/* Hero card */}
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{svc.name}</h1>
            <p className="mt-2 max-w-2xl text-slate-700">{svc.blurb}</p>

            {"tags" in svc &&
              Array.isArray((svc as any).tags) &&
              (svc as any).tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {(svc as any).tags.map((t: string) => (
                    <span
                      key={t}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
          </div>

          {/* CTA side */}
          <aside className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Få et tilbud
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Ring{" "}
              <a
                className="underline"
                href={`tel:${site.phone.replace(/\s+/g, "")}`}
              >
                {site.phone}
              </a>{" "}
              eller brug formularen.
            </p>
            <a href="/#kontakt" className="btn btn-primary mt-4 w-full">
              Kontakt {site.name}
            </a>
            <p className="mt-3 text-xs text-slate-500">
              Svarer typisk inden for 1 arbejdsdag.
            </p>
          </aside>
        </div>

        {/* Feature grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Feature title="Autoriserede vagter">
            Uddannede, erfarne medarbejdere med dokumenteret baggrund.
          </Feature>
          <Feature title="Risikovurdering">
            Plan, instrukser og rapportering – tilpasset jeres behov.
          </Feature>
          <Feature title="Døgnbemanding">
            24/7 overvågning, udrykning og opfølgning.
          </Feature>
        </div>

        {/* Byer hvor ydelsen tilbydes (intern linking til lokal-intent) */}
        {availableCities.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-slate-900">
              Tilbydes i disse byer
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {availableCities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}`}
                    className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tekstsektion */}
        <div className="prose prose-slate mt-10 max-w-none">
          <h2>Sådan arbejder vi med {svc.name.toLowerCase()}</h2>
          <p>
            Vi starter med behovsafdækning og risikovurdering. Herefter
            skræddersyr vi bemanding, rutiner og rapportering efter lokation,
            åbningstider og risikoprofil.
          </p>
        </div>

        {/* FAQ (render + schema) */}
        {svc.faqs?.length ? (
          <div className="mt-10 space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">FAQ</h2>
            {svc.faqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-xl border border-slate-200 bg-white p-4"
              >
                <summary className="cursor-pointer list-none font-medium text-slate-900">
                  {f.q}
                </summary>
                <p className="mt-2 text-sm text-slate-700">{f.a}</p>
              </details>
            ))}
          </div>
        ) : null}

        {/* Relaterede ydelser (intern linking + UX) */}
        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-slate-900">
              Relaterede ydelser
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="card block">
                    <h3 className="text-base font-semibold text-slate-900">
                      {s.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">{s.blurb}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* JSON-LD: Service + FAQ + Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(svc)) }}
      />
      {svc.faqs?.length ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd(svc.faqs!)),
          }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbList(breadcrumbs)),
        }}
      />
    </section>
  );
}

function Feature({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-700">{children}</p>
    </div>
  );
}

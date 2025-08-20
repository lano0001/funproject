import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { servicesForCity } from "@/lib/site-helpers";
import { breadcrumbList } from "@/lib/structured-data";

export const dynamicParams = false;
export async function generateStaticParams() {
  return site.cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = site.cities.find((c) => c.slug === citySlug);
  if (!city) return { title: site.name };
  const svcCount = servicesForCity(citySlug).length;
  return {
    title: `${site.name} i ${city.name}`,
    description: `Autoriseret vagtfirma i ${city.name}. ${svcCount}+ ydelser – ring ${site.phone}.`,
    alternates: { canonical: `${site.url}/${citySlug}` },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = site.cities.find((c) => c.slug === citySlug);
  if (!city) return notFound();

  const services = servicesForCity(citySlug);
  const breadcrumbs = [
    { name: "Forside", url: site.url },
    { name: city.name, url: `${site.url}/${city.slug}` },
  ];

  return (
    <section className="container">
      <nav className="mb-4 text-sm text-slate-600">
        <Link href="/" className="underline">
          Forside
        </Link>{" "}
        <span className="mx-1">/</span>
        <span className="text-slate-500">{city.name}</span>
      </nav>

      <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-slate-900">
              {site.name} i {city.name}
            </h1>
            <p className="mt-2 text-slate-700">
              Vi yder vagtservice i {city.name}. Kontakt os på{" "}
              <strong className="font-semibold">{site.phone}</strong>.
            </p>
          </div>

          <aside className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div>
                <dt className="text-slate-500">Ydelser i byen</dt>
                <dd className="mt-1 text-lg font-semibold text-slate-900">
                  {services.length}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Døgnbemanding</dt>
                <dd className="mt-1 text-lg font-semibold text-slate-900">
                  24/7
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-slate-500">Kontakt</dt>
                <dd className="mt-2">
                  <a
                    href={`tel:${site.phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 font-medium text-slate-900 hover:bg-slate-50"
                  >
                    📞 {site.phone}
                  </a>
                </dd>
              </div>
            </dl>

            <Link href="/#kontakt" className="btn btn-primary mt-4 w-full">
              Få et tilbud
            </Link>
          </aside>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-slate-900">
            Ydelser i {city.name}
          </h2>
        </div>

        <ul className="mt-5 flex flex-wrap gap-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {s.name} <span aria-hidden>↗</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="prose prose-slate mt-10 max-w-none">
          <h2>Local service & bemanding</h2>
          <p>
            {site.name} dækker {city.name} og omegn med autoriserede vagter. Vi
            sammensætter bemanding efter behov – fra fast tilsyn til akut
            udrykning.
          </p>
        </div>
      </div>

      {/* JSON-LD: BreadcrumbList – bruger breadcrumbs, så ingen unused-var advarsel */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbList(breadcrumbs)),
        }}
      />
    </section>
  );
}

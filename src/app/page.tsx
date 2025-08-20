import Link from "next/link";
import { site } from "@/config/site";
import ServiceCard from "@/components/ServiceCard";
import ContactForm from "@/components/ContactForm";

export default function HomePage() {
  return (
    <>
      {/* HERO (lys, centrering, bedre kontrast) */}
      <section className="container text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs text-slate-600 shadow-sm">
          ✅ Autoriseret vagtfirma · 📍 Hele Danmark · ⏱ Døgnbemanding
        </span>

        <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          {site.name}: {site.tagline}
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Professionelle vagter til byggepladser, events, detail og erhverv.
          Hurtig respons og dokumenteret kvalitet.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <a href="#kontakt" className="btn btn-primary">
            Få et tilbud
          </a>
          <Link href="/services" className="btn btn-ghost">
            Se alle ydelser
          </Link>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 text-sm text-slate-700 sm:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            24/7 vagt
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            Autoriserede vagter
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            Landsdækkende
          </div>
          <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            Hurtig udrykning
          </div>
        </div>
      </section>

      {/* YDELSER */}
      <section className="container mt-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-white">Populære ydelser</h2>
          <Link href="/services" className="text-sm underline">
            Se alle ydelser
          </Link>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.slice(0, 6).map((s) => (
            <ServiceCard
              key={s.slug}
              title={s.name}
              description={s.blurb}
              href={`/services/${s.slug}`}
            />
          ))}
        </div>
      </section>

      {/* WHY US + PROCESS */}
      <section className="container mt-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Hvorfor vælge {site.name}?
            </h2>
            <ul className="mt-6 space-y-3 text-slate-700">
              <li className="card p-4">
                📋 Skræddersyet sikringsplan og risikovurdering
              </li>
              <li className="card p-4">
                🛡️ Autoriserede vagter med dokumenteret erfaring
              </li>
              <li className="card p-4">
                ⏱ Hurtig udrykning og tydelig rapportering
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              Sådan kommer vi i gang
            </h3>
            <ol className="mt-4 space-y-3 text-slate-700">
              <li>1. Udfyld formularen eller ring {site.phone}</li>
              <li>2. Vi laver risikovurdering og tilbud</li>
              <li>3. Opstart og løbende rapportering</li>
            </ol>
            <a href="#kontakt" className="btn btn-primary mt-6 w-full">
              Få et tilbud
            </a>
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="container mt-20">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm backdrop-blur">
          <h2 className="text-2xl font-bold text-slate-900">
            Kontakt {site.name}
          </h2>
          <p className="mt-2 text-slate-600">
            Svarer typisk inden for 1 arbejdsdag.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

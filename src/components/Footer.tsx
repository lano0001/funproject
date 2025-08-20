// src/components/Footer.tsx
import Link from "next/link";
import { site } from "@/config/site";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:justify-between md:space-x-12">
        {/* Venstre kolonne */}
        <div className="mb-8 md:mb-0 md:w-1/2">
          <h2 className="text-lg font-semibold text-slate-900">{site.name}</h2>
          <p className="mt-2 text-sm text-slate-600 max-w-sm">{site.tagline}</p>
        </div>

        {/* Midter kolonne */}
        <div className="mb-8 md:mb-0 md:w-1/3">
          <h3 className="text-sm font-semibold text-slate-900">Kontakt</h3>
          <ul className="mt-3 space-y-1 text-sm text-slate-600">
            <li>
              {site.street}, {site.postal} {site.city}
            </li>
            <li>
              Tlf:{" "}
              <a
                href={`tel:${site.phone.replace(/\s+/g, "")}`}
                className="hover:text-slate-900"
              >
                {site.phone}
              </a>
            </li>
            <li>
              E-mail:{" "}
              <a href={`mailto:${site.email}`} className="hover:text-slate-900">
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Højre kolonne */}
        <div className="md:w-1/6">
          <h3 className="text-sm font-semibold text-slate-900">Snarveje</h3>
          <ul className="mt-3 space-y-1 text-sm text-slate-600">
            <li>
              <Link href="/services" className="hover:text-slate-900">
                Ydelser
              </Link>
            </li>
            <li>
              <Link href="/#kontakt" className="hover:text-slate-900">
                Kontakt
              </Link>
            </li>
          </ul>

          {/* Sociale medier */}
          <div className="mt-4 flex space-x-4">
            {site.socials.facebook && (
              <a
                href={site.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
            )}
            {site.socials.linkedin && (
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bundlinje */}
      <div className="border-t border-slate-200 bg-slate-50 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {site.name}. Alle rettigheder forbeholdes.
      </div>
    </footer>
  );
}

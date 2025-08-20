"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { site } from "@/config/site";

export default function Header() {
  const [open, setOpen] = useState(false); // mobilmenu
  const [citiesOpen, setCitiesOpen] = useState(false); // desktop dropdown
  const citiesBtnRef = useRef<HTMLButtonElement | null>(null);

  // Luk dropdown ved klik udenfor
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!citiesBtnRef.current) return;
      const btn = citiesBtnRef.current;
      const menu = document.getElementById("cities-menu");
      if (
        menu &&
        !menu.contains(e.target as Node) &&
        !btn.contains(e.target as Node)
      ) {
        setCitiesOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        {/* Logo / navn */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          {site.name}
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="hover:underline">
            Forside
          </Link>
          <Link href="/services" className="hover:underline">
            Ydelser
          </Link>

          {/* Byer dropdown (desktop) */}
          <div className="relative">
            <button
              ref={citiesBtnRef}
              onClick={() => setCitiesOpen((v) => !v)}
              className="inline-flex items-center gap-1 hover:underline"
              aria-haspopup="menu"
              aria-expanded={citiesOpen}
              aria-controls="cities-menu"
            >
              Byer
              <span
                className={`transition-transform ${
                  citiesOpen ? "rotate-180" : ""
                }`}
              >
                ▾
              </span>
            </button>

            {citiesOpen && (
              <div
                id="cities-menu"
                role="menu"
                className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-700 bg-slate-800 p-2 shadow-lg"
              >
                <ul className="max-h-[60vh] overflow-auto">
                  {site.cities.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/${c.slug}`}
                        className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-700"
                        onClick={() => setCitiesOpen(false)}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Link
            href="/#kontakt"
            className="rounded-lg bg-white px-4 py-2 text-slate-900"
          >
            Kontakt
          </Link>
        </nav>

        {/* Mobil menu-knap */}
        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Åbn/luk menu"
          aria-expanded={open}
        >
          ☰
        </button>
      </div>

      {/* Mobilmenu */}
      {open && (
        <nav className="md:hidden bg-slate-800 px-4 pb-4">
          <Link
            href="/"
            className="block py-2 hover:underline"
            onClick={() => setOpen(false)}
          >
            Forside
          </Link>
          <Link
            href="/services"
            className="block py-2 hover:underline"
            onClick={() => setOpen(false)}
          >
            Ydelser
          </Link>

          {/* Byer (liste) */}
          <div className="py-2">
            <p className="mb-1 text-xs uppercase text-slate-400">Byer</p>
            <ul className="grid grid-cols-1 gap-1">
              {site.cities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}`}
                    className="block rounded-lg px-2 py-2 hover:bg-slate-700"
                    onClick={() => setOpen(false)}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/#kontakt"
            className="block rounded-lg bg-white px-4 py-2 text-center font-medium text-slate-900"
            onClick={() => setOpen(false)}
          >
            Kontakt
          </Link>
        </nav>
      )}
    </header>
  );
}

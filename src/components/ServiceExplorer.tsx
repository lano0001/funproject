"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Service = {
  slug: string;
  name: string;
  blurb: string;
  tags?: string[];
};

export default function ServiceExplorer({ services }: { services: Service[] }) {
  const [q, setQ] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const t = new Set<string>();
    services.forEach((s) => s.tags?.forEach((tag) => t.add(tag)));
    return Array.from(t).sort();
  }, [services]);

  const filtered = useMemo(() => {
    const qn = q.trim().toLowerCase();
    return services.filter((s) => {
      const matchQ =
        !qn ||
        s.name.toLowerCase().includes(qn) ||
        s.blurb.toLowerCase().includes(qn);
      const matchTag = !activeTag || s.tags?.includes(activeTag);
      return matchQ && matchTag;
    });
  }, [q, activeTag, services]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Søg i ydelser…"
            className="text-black w-full rounded-xl border border-slate-300 bg-white/90 px-4 py-3 pr-10 outline-none focus:border-slate-900"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            ⌘K
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <FilterChip
            label="Alle tags"
            active={!activeTag}
            onClick={() => setActiveTag(null)}
          />
          {tags.map((tag) => (
            <FilterChip
              key={tag}
              label={tag}
              active={activeTag === tag}
              onClick={() => setActiveTag(tag)}
            />
          ))}
        </div>
      </div>

      {/* Result count */}
      <p className="text-sm text-slate-600">
        Viser <strong>{filtered.length}</strong>{" "}
        {filtered.length === 1 ? "ydelse" : "ydelser"}
        {activeTag ? (
          <>
            {" "}
            med tag <span className="font-medium">{activeTag}</span>
          </>
        ) : null}
        {q ? (
          <>
            {" "}
            matchet “<span className="font-medium">{q}</span>”
          </>
        ) : null}
      </p>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="card group"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-slate-900">{s.name}</h3>
              {s.tags && s.tags.length > 0 && (
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-600">
                  {s.tags[0]}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-slate-600 line-clamp-3">
              {s.blurb}
            </p>
            <div className="mt-4 text-sm font-medium text-slate-900 underline group-hover:translate-x-0.5 transition">
              Læs mere &rarr;
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
        active
          ? "bg-slate-900 text-white shadow"
          : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}

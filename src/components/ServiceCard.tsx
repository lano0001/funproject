import Link from "next/link";

export default function ServiceCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href} className="card group">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-600">
          Læs mere
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
      <div className="mt-4 text-sm font-medium text-slate-900 underline group-hover:translate-x-0.5 transition">
        Gå til {">"}
      </div>
    </Link>
  );
}

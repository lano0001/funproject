"use client";
import { useState } from "react";
import { site } from "@/config/site";

export default function ContactForm() {
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 500));
    setStatus("Tak for din henvendelse! Vi vender tilbage snarest.");
    (e.currentTarget as HTMLFormElement).reset();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2 text-black">
      <input
        className="rounded-xl border border-slate-300 bg-white p-3 outline-none focus:border-slate-900"
        name="name"
        placeholder="Navn"
        required
      />
      <input
        className="rounded-xl border border-slate-300 bg-white p-3 outline-none focus:border-slate-900"
        type="email"
        name="email"
        placeholder="E-mail"
        required
      />
      <input
        className="rounded-xl border border-slate-300 bg-white p-3 outline-none focus:border-slate-900 sm:col-span-2"
        name="phone"
        placeholder="Telefon"
      />
      <textarea
        className="min-h-[120px] rounded-xl border border-slate-300 bg-white p-3 outline-none focus:border-slate-900 sm:col-span-2"
        name="message"
        placeholder="Hvad har du brug for hjælp til?"
        required
      />
      <button className="btn btn-primary sm:col-span-2">
        Send forespørgsel
      </button>
      <p className="text-sm text-slate-600 sm:col-span-2">
        Eller ring på{" "}
        <a className="underline" href={`tel:${site.phone}`}>
          {site.phone}
        </a>
      </p>
      {status && (
        <p className="text-sm text-emerald-700 sm:col-span-2">{status}</p>
      )}
    </form>
  );
}

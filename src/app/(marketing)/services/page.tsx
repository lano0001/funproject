import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import ServiceExplorer from "@/components/ServiceExplorer";
import type { Service } from "@/config/services";
import { servicesItemListJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Ydelser",
  description: `${site.name} tilbyder ${site.services.length}+ vagtservices i hele Danmark.`,
};

export default function ServicesPage() {
  const services = site.services as Service[];

  return (
    <section className="container">
      <div className="flex items-end justify-between text-white">
        <div>
          <p className="text-xs uppercase tracking-wide ">Ydelser</p>
          <h1 className="mt-1 text-3xl font-bold ">
            Vagtløsninger til alle behov
          </h1>
          <p className="mt-2 max-w-2xl ">
            {site.name} leverer autoriserede vagter til virksomheder,
            byggepladser og arrangementer. Vi skræddersyr løsninger efter behov
            og risikoprofil.
          </p>
        </div>
        <Link href="/" className="hidden text-sm underline sm:block">
          Til forsiden
        </Link>
      </div>

      <div className="mt-8">
        <ServiceExplorer services={services} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesItemListJsonLd(services)),
        }}
      />
    </section>
  );
}

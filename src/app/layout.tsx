import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/config/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import { localBusinessJsonLd } from "@/lib/structured-data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.tagline,
  openGraph: {
    title: site.name,
    description: site.tagline,
    url: site.url,
    siteName: site.name,
    locale: "da_DK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da">
      <body className={inter.className}>
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 bg-blob"
        />
        <Header />
        <main className="pt-24 pb-16">{children}</main>
        <Footer />

        {/* JSON-LD: LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()),
          }}
        />
      </body>
    </html>
  );
}

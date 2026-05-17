import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DinçEv | Profesyonel Akıllı Ev Sistemleri ve Kurulumu",
  description:
    "Türkiye genelinde akıllı ev kurulumu. Tuya ve Zigbee uyumlu güvenlik, aydınlatma, enerji ve otomasyon çözümleri. Ücretsiz keşif için hemen ulaşın.",
  keywords: [
    "akıllı ev",
    "akıllı ev sistemleri",
    "akıllı ev kurulumu",
    "home automation",
    "tuya",
    "zigbee",
    "akıllı aydınlatma",
    "güvenlik sistemi",
    "ev otomasyonu",
    "akıllı ev fiyatları",
  ],
  authors: [{ name: "DinçEv" }],
  openGraph: {
    title: "DinçEv | Profesyonel Akıllı Ev Sistemleri ve Kurulumu",
    description:
      "Türkiye genelinde akıllı ev kurulumu. Tuya ve Zigbee uyumlu güvenlik, aydınlatma, enerji ve otomasyon çözümleri. Ücretsiz keşif için hemen ulaşın.",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "https://www.dincev.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "DinçEv Akıllı Ev Sistemleri",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "knmLNL7YjJLNprK_rkHlvCC1nyOGyzj6uEH3mukI478",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "DinçEv Akıllı Ev Sistemleri",
              description:
                "Türkiye genelinde profesyonel akıllı ev sistemleri kurulumu. Tuya ve Zigbee altyapısıyla güvenlik, aydınlatma ve otomasyon çözümleri.",
              telephone: "+905324462543",
              email: "dincevsistem@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "İzmit",
                addressRegion: "Kocaeli",
                addressCountry: "TR",
              },
              url: "https://www.dincev.com",
              sameAs: ["https://wa.me/905324462543"],
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "08:00",
                  closes: "18:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Saturday", "Sunday"],
                  opens: "00:00",
                  closes: "00:00",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased bg-white text-[#1d1d1f] overflow-x-hidden">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
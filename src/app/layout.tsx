import type { Metadata } from "next";
import { Outfit, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/translations";
import { CartProvider } from "@/lib/cart";

const fontOutfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const fontHind = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://menusync.in"),
  title: "MenuSync | Digital Menu, Food Discovery & WhatsApp Ordering Builder",
  description:
    "MenuSync is a smart digital QR code restaurant menu builder. Allow diners to scan tables, browse menus in English/Bengali, spin for food suggestions, and place orders directly via WhatsApp.",
  keywords: [
    "MenuSync",
    "Digital Menu for Restaurant",
    "QR Code Restaurant Menu Maker",
    "WhatsApp Ordering System",
    "Free Contactless Menu Builder",
    "Restaurant QR Ordering App",
    "Bilingual Menu Bengali English",
    "Smart Dining Recommendations",
  ],
  authors: [{ name: "MenuSync Team" }],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍽️</text></svg>',
  },
  openGraph: {
    title: "MenuSync | Digital Menu, Food Discovery & WhatsApp Ordering Builder",
    description:
      "Transform your dining experience with a smart bilingual digital menu. Diners scan table QR codes, browse items in English or Bengali, spin the recommend wheel, and check out directly via WhatsApp.",
    url: "https://menusync.in",
    siteName: "MenuSync",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MenuSync | QR Code Menu & WhatsApp Ordering for Restaurants",
    description: "Give your restaurant a smart digital menu. Allow clients to scan, spin, and order via WhatsApp.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontOutfit.variable} ${fontHind.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "MenuSync",
              "operatingSystem": "All",
              "applicationCategory": "BusinessApplication",
              "description": "MenuSync is a smart digital QR code menu builder. Allow diners to scan table QR codes, browse bilingual menus, spin recommendation wheels, and place orders directly via WhatsApp.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR"
              }
            })
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-stone-100 text-stone-900">
        <LanguageProvider>
          <CartProvider>{children}</CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

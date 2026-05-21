import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Resolve the canonical site URL for OG metadata. Order of preference:
// 1. NEXT_PUBLIC_SITE_URL override (set this to https://h30.live once DNS is live)
// 2. Vercel's canonical production domain
// 3. Vercel's per-deployment URL (preview deploys)
// 4. h30.live as the eventual public default
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://h30.live");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "H30 .. Acquiring the Future of Media IP",
  description:
    "Your fans. Your platform. Your revenue. H30 builds, runs, and grows direct-to-fan ecosystems for the world's top creators.",
  openGraph: {
    title: "H30 .. Acquiring the Future of Media IP",
    description:
      "Your fans. Your platform. Your revenue. H30 builds the direct-to-fan platforms creators should have owned all along.",
    url: "/",
    siteName: "H30 Media Group",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "H30 .. Acquiring the Future of Media IP",
    description:
      "Your fans. Your platform. Your revenue. H30 builds the direct-to-fan platforms creators should have owned all along.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ground text-cream font-sans relative overflow-x-hidden">
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-V125VZ1TQM"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-V125VZ1TQM');
        `}</Script>
      </body>
    </html>
  );
}

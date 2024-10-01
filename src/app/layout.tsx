import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://bodadm2024.sd-bo.com/"),
  alternates: {
    canonical: new URL("https://bodadm2024.sd-bo.com/"),
  },
  referrer: 'origin-when-cross-origin',
  publisher: 'Boda Diego & Mafer',
  openGraph: {
    title: 'Diego & Mafer',
    description: 'Nosotros amamos porque Dios nos amó primero.',
    url: "https://bodadm2024.sd-bo.com/",
    siteName: 'Diego & Mafer',
    images: [
      {
        url: "/assets/portada.png",
        width: 800,
        height: 600,
      }
    ],
    locale: 'es_BO',
    type: 'website',
  },
  title: {
    template: '%s | Diego & Mafer',
    default: 'Diego & Mafer',
  },
  description: 'Nosotros amamos porque Dios nos amó primero.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

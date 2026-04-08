import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "100xSolutions — 3D Web Experiences That Convert",
  description:
    "We build immersive 3D web experiences for restaurants, real estate, retail, and more. Transform your business with interactive 3D websites that attract customers and boost engagement.",
  keywords:
    "3D website, 3D web experience, interactive 3D, virtual tour, 3D building, 3D restaurant, immersive web, 100xSolutions",
  openGraph: {
    title: "100xSolutions — 3D Web Experiences That Convert",
    description:
      "Transform your business with immersive 3D web experiences. Interactive tours, 3D buildings, virtual showrooms and more.",
    url: "https://3d.100xsolutions.in",
    siteName: "100xSolutions 3D",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        {/* Ambient background that glass elements interact with */}
        <div className="ambient-bg" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

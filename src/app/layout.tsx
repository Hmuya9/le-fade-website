import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Le Fade - Premium Haircut Subscriptions",
  description: "Professional haircut subscriptions for busy professionals. Consistent quality, flexible scheduling, and premium service. Essential, Premium, and Elite plans available.",
  keywords: "haircut subscription, professional haircuts, barber service, mobile barber, premium grooming",
  openGraph: {
    title: "Le Fade - Premium Haircut Subscriptions",
    description: "Professional haircut subscriptions for busy professionals",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased font-sans`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}


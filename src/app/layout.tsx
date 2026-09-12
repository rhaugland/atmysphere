import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "atmysphere — Your Calendar as Weather",
  description:
    "See your schedule at a glance. Busy days appear as storms, free days as sunshine. atmysphere transforms your calendar into an intuitive weather forecast.",
  openGraph: {
    title: "atmysphere — Your Calendar as Weather",
    description:
      "See your schedule at a glance. Busy days appear as storms, free days as sunshine.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AccessToken from "@/context/accessToken";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Be My Valentine",
  description: "Ask someone special for prom easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AccessToken>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </AccessToken>
  );
}

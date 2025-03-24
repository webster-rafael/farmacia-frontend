import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WhatsApp API",
  description: "Criado por Ahxterix",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="Pt-BR" cz-shortcut-listen="true">
      <body className={` ${inter.className}`}>{children}</body>
    </html>
  );
}

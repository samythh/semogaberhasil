// File: src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
// Import Navbar dari folder layout
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Departemen Proteksi Tanaman",
  description: "Website Resmi Departemen Proteksi Tanaman UNAND",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased bg-gray-50">
        {/* Navbar Server Component */}
        <Navbar />

        {/* PERBAIKAN DI SINI: */}
        {/* Ubah 'pt-[80px]' menjadi 'pt-0' atau hapus class-nya sama sekali */}
        {/* Ini akan memaksa Hero Slider naik mentok ke paling atas layar */}
        <div className="pt-0 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
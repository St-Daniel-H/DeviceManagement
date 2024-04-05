"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  AddCategory,
}: Readonly<{
  children: React.ReactNode;
  AddCategory: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ display: "flex" }}>
        <div>{children}</div>
        <div>{AddCategory}</div>
      </body>
    </html>
  );
}

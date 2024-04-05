import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
  CategoriesTable,
}: Readonly<{
  children: React.ReactNode;
  CategoriesTable: React.ReactNode;
}>) {
  return (
    <div>
      <div>{children}</div>
      {CategoriesTable}
    </div>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../../scss/Categories.scss";
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
  CategoriesTable,
}: Readonly<{
  children: React.ReactNode;
  CategoriesTable: React.ReactNode;
}>) {
  return (
    <div id="Categories">
      <div>{children}</div>
      <div id="CategoriesTable">{CategoriesTable}</div>
    </div>
  );
}

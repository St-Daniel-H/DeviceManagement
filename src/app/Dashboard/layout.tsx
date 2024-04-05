import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../scss/DashboardPage.scss";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
  CategoryDashboard,
}: Readonly<{
  children: React.ReactNode;
  CategoryDashboard: React.ReactNode;
}>) {
  return (
    <div style={{ display: "flex" }}>
      <div>{children}</div>
      {CategoryDashboard}
    </div>
  );
}

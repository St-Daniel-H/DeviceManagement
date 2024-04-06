"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../scss/DashboardPage.scss";
import "../scss/TopBar.scss";
import Provider from "./provider";
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
  CategoryDashboard,
  TopBar,
}: Readonly<{
  children: React.ReactNode;
  CategoryDashboard: React.ReactNode;
  TopBar: React.ReactNode;
}>) {
  return (
    <Provider>
      <div style={{ display: "flex" }}>
        <div>{children}</div>
        <div id="RightSideDashboard">
          {TopBar}
          {CategoryDashboard}
        </div>
      </div>
    </Provider>
  );
}

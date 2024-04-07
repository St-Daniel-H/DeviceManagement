"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../scss/DashboardPage.scss";
import "../scss/TopBar.scss";
import "../scss/Dashboards.scss";
import Provider from "./provider";
import "../scss/ViewItems.scss";

import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
  TopBar,
  Dashboard,
}: Readonly<{
  children: React.ReactNode;
  CategoryDashboard: React.ReactNode;
  Dashboard: React.ReactNode;
  TopBar: React.ReactNode;
  AddItem: React.ReactNode;
  ViewItems: React.ReactNode;
}>) {
  return (
    <Provider>
      <div style={{ display: "flex" }}>
        {Dashboard}
        <div id="RightSideDashboard">
          {TopBar}
          <div>{children}</div>
        </div>
      </div>
    </Provider>
  );
}

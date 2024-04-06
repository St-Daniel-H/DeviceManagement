"use client";
import Link from "next/link";
import "../../scss/DashboardPage.scss";
import { useEffect, useRef } from "react";
import { useOpen } from "../provider";
interface OpenState {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Dashboard() {
  const { open, setOpen } = useOpen() as OpenState;

  const elementRef = useRef<HTMLDivElement>(null); // Specify the type of the ref
  const manageSlider = (state: boolean) => {
    const element = elementRef.current;
    if (element) {
      if (state) {
        element.classList.remove("SlideOut");
        element.classList.add("Slidein");
      } else {
        element.classList.remove("Slidein");
        element.classList.add("SlideOut");
      }
    }
  };
  const handleResize = () => {
    if (window.innerWidth > 830) {
      manageSlider(true);
    } else {
      manageSlider(open);
    }
  };
  window.addEventListener("resize", handleResize);

  useEffect(() => {
    if (window.innerWidth < 830) {
      manageSlider(open);
    }
  }, [open]);
  return (
    <div id="DashboardPage" ref={elementRef}>
      <div id="dashboardTitle">
        <h2>Device Management</h2>
        <p>Dashboard</p>
      </div>
      <div id="dashboardMenu">
        <div id="itemMeny">
          Items
          <br />
          <ul>
            <li>
              <Link href="/Dashboard/AddItem">Add Item</Link>
            </li>
            <li>
              <Link href="/Dashboard/ViewItems">View Items</Link>
            </li>
          </ul>
        </div>
        <div id="categoryMenu">
          Categories
          <br />
          <ul>
            <li>
              <Link href="/Dashboard/CategoryDashboard">Add Category</Link>
            </li>
          </ul>
        </div>
      </div>
      <div id="signout">
        <button id="signoutButton">Signout</button>
      </div>
    </div>
  );
}

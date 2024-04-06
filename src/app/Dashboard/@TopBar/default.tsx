"use client";
import * as React from "react";
import TopBar from "@/app/components/TopBar";
import { useOpen } from "../provider";
interface OpenState {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function TobBarLayout() {
  const { open, setOpen } = useOpen() as OpenState;
  return (
    <div style={{ color: "black" }} id="TopBarLayout">
      <TopBar setOpen={setOpen} />
    </div>
  );
}

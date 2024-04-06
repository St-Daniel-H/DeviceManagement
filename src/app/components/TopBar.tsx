"use client";
import { AiOutlineMenu } from "react-icons/ai";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect } from "react";
export default function TopBar({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    async function getSession() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const session = supabase.auth.getSession();
      console.log(session);
    }

    getSession();
  }, []);

  return (
    <div id="TopBar" style={{ display: "flex", alignItems: "center" }}>
      <input
        id="BurgerMenuCheckbox"
        type="checkbox"
        style={{ display: "none" }}
        onChange={(e) => {
          console.log(e.target.checked);
          setOpen(e.target.checked);
        }}
      />
      <label htmlFor="BurgerMenuCheckbox">
        {" "}
        <AiOutlineMenu id="BurgerIcon" style={{ fontSize: "35px" }} />
      </label>
      <h1>Topbar</h1>
    </div>
  );
}

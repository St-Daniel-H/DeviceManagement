"use client";

import { ReactNode, createContext, useContext, useState } from "react";

const context = createContext({});

export default function Provider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <context.Provider value={{ open, setOpen }}>{children}</context.Provider>
  );
}
export function useOpen() {
  return useContext(context);
}

"use client";

import { createContext, useContext, useState } from "react";

type contextTypes = {
  open: boolean;
  toggle: () => void;
};

const SidebarContext = createContext<contextTypes>({
  open: true,
  toggle: () => {},
});

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);
  const toggle = () => setOpen((prev) => !prev);
  return (
    <SidebarContext.Provider value={{ open, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
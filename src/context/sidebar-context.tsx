"use client"
import * as React from "react"

interface SidebarContextProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const SidebarContext = React.createContext<SidebarContextProps>({
  isOpen: false,
  setIsOpen: () => {
    throw new Error("SidebarContext not initialized")
  },
})


export const SidebarProvider = ({ children }: React.PropsWithChildren) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

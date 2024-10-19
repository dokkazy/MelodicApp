"use client";
import React from "react";

const AppContext = React.createContext({
  sessionToken: "",
  setSessionToken: (token: string) => {},
});

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export default function AppProvider({
  children,
  initialToken="",
}: {
  children: React.ReactNode;
  initialToken?: string;
}) {
  const [sessionToken, setSessionToken] = React.useState<string>(initialToken);
  return (
    <AppContext.Provider value={{ sessionToken, setSessionToken }}>
      {children}
    </AppContext.Provider>
  );
}

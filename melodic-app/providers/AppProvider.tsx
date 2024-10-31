/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";

const AppContext = React.createContext({
  sessionToken: "",
  role: "",
  setSessionToken: (token: string) => {},
  setRole: (role: string) => {},
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
  initialToken = "",
  initalRole = "",
}: {
  children: React.ReactNode;
  initialToken?: string;
  initalRole?: string;
}) {
  const [sessionToken, setSessionToken] = React.useState<string>(initialToken);
  const [role, setRole] = React.useState<string>(initalRole);
  return (
    <AppContext.Provider
      value={{ sessionToken, setSessionToken, role, setRole }}
    >
      {children}
    </AppContext.Provider>
  );
}

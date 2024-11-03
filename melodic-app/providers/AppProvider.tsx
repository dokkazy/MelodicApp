/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { LoginResponseSchemaType } from "@/schemaValidations/auth.schema";
import React from "react";

const AppContext = React.createContext({
  sessionToken: "",
  role: "",
  user: {} as LoginResponseSchemaType,
  setSessionToken: (token: string) => {},
  setRole: (role: string) => {},
  setUser: (user: LoginResponseSchemaType) => {},
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
  initalUser = {} as LoginResponseSchemaType,
}: {
  children: React.ReactNode;
  initialToken?: string;
  initalRole?: string;
  initalUser?: LoginResponseSchemaType
}) {
  const [sessionToken, setSessionToken] = React.useState<string>(initialToken);
  const [role, setRole] = React.useState<string>(initalRole);
  const [user, setUser] = React.useState<LoginResponseSchemaType>(initalUser);
  return (
    <AppContext.Provider
      value={{ sessionToken, setSessionToken, role, setRole, user, setUser }}
    >
      {children}
    </AppContext.Provider>
  );
}

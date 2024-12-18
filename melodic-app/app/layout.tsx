import type { Metadata } from "next";
import localFont from "next/font/local";
import { cookies } from "next/headers";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AppProvider from "@/providers/AppProvider";
import { CartProvider } from "@/providers/CartProvider";
import { Suspense } from "react";
import LoadingComponent from "./components/LoadingComponent";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Melodic App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const roleBase = cookieStore.get("role");
  const userBase = {
    id: "",
    userName: "",
    email: "",
    token: "",
    role: "",
    refreshToken: {
      id: "",
      refresh: "",
      created: "",
      exprires: "",
    },
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider
          initialToken={sessionToken?.value}
          initalRole={roleBase?.value}
          initalUser={userBase}
        >
        <CartProvider>
        <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <LoadingComponent />
          </div>
        }
      >{children}
      </Suspense>
      </CartProvider>
        </AppProvider>
        <Toaster />
      </body>
    </html>
  );
}

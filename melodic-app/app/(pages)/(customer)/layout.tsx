import React, { Suspense } from "react";
import Footer from "@/app/components/Footer";
import LoadingComponent from "@/app/components/LoadingComponent";
import NavBar from "@/app/components/NavBar";
import { CartProvider } from "@/providers/CartProvider";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <LoadingComponent />
          </div>
        }
      >
        <CartProvider>{children}</CartProvider>
      </Suspense>

      <Footer />
    </>
  );
}

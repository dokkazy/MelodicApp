import AdminSidebar from "@/app/components/AdminSideBar";
import LoadingComponent from "@/app/components/LoadingComponent";
import React, { Suspense } from "react";
export default function Adminlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container flex">
      <AdminSidebar />
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <LoadingComponent />
          </div>
        }
      >
        {children}
      </Suspense>
    </section>
  );
}

import React from "react";
import RegisterDialog from "@/app/components/AuthDialog/RegisterDialog";

export default function RegisterPage() {
  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="md:min-w-[425px]">
        {" "}
        <RegisterDialog />
      </div>
    </div>
  );
}

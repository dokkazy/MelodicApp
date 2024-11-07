"use client";
import { useAppContext } from "@/providers/AppProvider";
import React from "react";

export default function ProfilePage() {
  const { user } = useAppContext();

  React.useEffect(() => {});

  React.useEffect(() => {
    console.log(user);
    
  }, []);
  return (
    <div className="min-h-screen">
      <h1>Profile</h1>
    </div>
  );
}

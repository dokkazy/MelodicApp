"use client";
import * as React from "react";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";
import { Button } from "@/components/ui/button";

export default function AuthDialog() {
  const [isLogin, setIsLogin] = React.useState(true);

  const toggleView = () => {
    setIsLogin(!isLogin);
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {isLogin ? "Login to Your Account" : "Create an Account"}
        </DialogTitle>
        <DialogDescription>
          {isLogin
            ? "Enter your credentials to access your account."
            : "Fill in your details to register for a new account."}
        </DialogDescription>
      </DialogHeader>
      {isLogin ? (
        <LoginDialog />
      ) : (
        <RegisterDialog />
      )}
      <p className="text-center text-sm mt-4">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <Button variant="link" className="p-0" onClick={toggleView}>
          {isLogin ? "Sign up" : "Log in"}
        </Button>
      </p>
    </>
  );
}

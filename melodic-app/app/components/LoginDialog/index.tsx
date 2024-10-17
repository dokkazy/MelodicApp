import * as React from "react";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Lock, Mail, User } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function LoginDialog() {
  const { toast } = useToast();
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
        <form className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="login-username">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="login-username"
                placeholder="Enter your username"
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="login-password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                className="pl-10"
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Log in
          </Button>
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Button variant="link" className="p-0" onClick={toggleView}>
              Sign up
            </Button>
          </p>
        </form>
      ) : (
        <form className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="register-username">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="register-username"
                placeholder="Choose a username"
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="register-email"
                type="email"
                placeholder="Enter your email"
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="register-password"
                type="password"
                placeholder="Create a password"
                className="pl-10"
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Button variant="link" className="p-0" onClick={toggleView}>
              Log in
            </Button>
          </p>
        </form>
      )}
    </>
  );
}

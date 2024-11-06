"use client";
import React from "react";
import { Lock, User } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  loginSchema,
  LoginSchemaType,
  UserRole,
} from "@/schemaValidations/auth.schema";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useAppContext } from "@/providers/AppProvider";
import authApiRequest from "@/api/auth";
import { useRouter } from "next/navigation";
import { adminLinks } from "@/configs/routes";

export default function LoginDialog() {
  const { toast } = useToast();
  const { setSessionToken, setRole, setUser } = useAppContext();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const loginForm = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [email, password] = useWatch({
    control: loginForm.control,
    name: ["email", "password"],
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      setLoading(true);
      const response = await authApiRequest.login(data);
      console.log(response);
      if (response.status === 200) {
        const responseFromNextServer = await authApiRequest.setToken({
          sessionToken: response.payload?.token,
          role: response.payload?.role,
        });
        setUser(response.payload);
        setSessionToken(responseFromNextServer.payload?.sessionToken);
        setRole(responseFromNextServer.payload?.role);
        toast({
          title: "Login successfully",
          description: "You have successfully logged in.",
        });
        if (response.payload?.role === UserRole.Admin) {
          router.push(adminLinks.admin.href);
        }
      } else if (response.status === 500) {
        console.log("Server failed to respond");
        
      } else {
        toast({
          variant: "destructive",
          title: `${response.payload?.title}`,
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `Error: ${error.message}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(onSubmit)}
        className="mt-4 space-y-4"
        noValidate
      >
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    {...field}
                    placeholder="Enter your username"
                    className="pl-10"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    {...field}
                    type={"password"}
                    placeholder="Enter your password"
                    className="pl-10"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={loading || !email || !password}
        >
          {loading ? (
            <svg
              className="mr-3 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Log in"
          )}
        </Button>
      </form>
    </Form>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { LogOut, Settings, User, ShoppingBasket } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import styles from "./AuthMenu.module.scss";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import envConfig from "@/configs/config";
import { apiClientLinks, apiLinks, links } from "@/configs/routes";
import { useAppContext } from "@/app/_context/AppProvider";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";

export default function AuthMenu() {
  const { toast } = useToast();
  const { setSessionToken } = useAppContext();
  const handleLogout = async () => {
    try {
      await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}${apiLinks.logout}`,
        {
          method: "POST",
        }
      ).then(async (res) => {
        if (res.ok) {
          setSessionToken("");
          toast({
            title: "Logout successfully",
          });
          await fetch(`${envConfig.NEXT_PUBLIC_API_CLIENT}${apiClientLinks.removeToken}`,{method: "POST"});
        }
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `Error: ${error.message}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className={`${cn(styles["profile"])} border flex items-center justify-center space-x-2 px-2 rounded-md h-10 sm:h-12 md:h-14`}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="hidden md:block font-semibold">Profile</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-56">
          <DropdownMenuLabel>My account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href={links.profile.href}>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span className="font-semibold">Profile</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <ShoppingBasket className="mr-2 h-4 w-4" />
              <span className="font-semibold">Orders</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span className="font-semibold">Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleLogout()} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span className="font-semibold ">Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

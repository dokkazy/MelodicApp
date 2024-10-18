import {
  LogOut,
  Settings,
  User,
  ShoppingBasket,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils"
import styles from "./AuthMenu.module.scss";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default function AuthMenu() {
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
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span className="font-semibold">Profile</span>
            </DropdownMenuItem>
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
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span className="font-semibold">Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
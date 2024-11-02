"use client";
import React from "react";
import { CircleUser, Search, ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { adminLinks, links } from "@/configs/routes";
import MobileNav from "./MobileNav";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AuthDialog from "../AuthDialog";
import AuthMenu from "../AuthMenu";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useAppContext } from "@/providers/AppProvider";
import { Badge } from "@/components/ui/badge";
import SearchDrawer from "../SearchDrawer";
import AdminNavBar from "./AdminNavBar";
import CartSheet from "../CartSheet";
import { useCartStore } from "@/providers/CartProvider";
enum UserRole {
  Admin = "Admin",
  User = "User",
}

export default function NavBar() {
  const pathname = usePathname();
  const [userRole, setUserRole] = React.useState<UserRole>(UserRole.User);
  const [isOpenCart, setIsOpenCart] = React.useState(false);
  const { sessionToken } = useAppContext();
  const navLink = [links.home, links.shop, links.contact];

  return (
    <header className="sticky top-0 z-20 mb-8 border-b bg-white">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 max-md:py-2 sm:px-6 md:max-w-4xl lg:max-w-6xl">
        <Link href={"/"} className="flex flex-col items-center py-2">
          <svg
            id="logo-38"
            width="78"
            height="32"
            viewBox="0 0 78 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z"
              className="ccustom"
              fill="#FF7A00"
            ></path>
            <path
              d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z"
              className="ccompli1"
              fill="#FF9736"
            ></path>
            <path
              d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z"
              className="ccompli2"
              fill="#FFBC7D"
            ></path>
          </svg>
          <h1 className="hidden text-2xl font-bold text-primary md:block">
            Melodic
          </h1>
        </Link>
        <nav className="hidden gap-10 md:flex md:items-center">
          {navLink.map((link, index) => (
            <div key={index}>
              {pathname === link.href ? (
                <Link prefetch href={link.href}>
                  <h1 className="text-lg font-bold text-primary">
                    {link.label}
                  </h1>
                </Link>
              ) : (
                <Link href={link.href} className="">
                  <h1 className="group relative p-2 text-lg font-bold text-gray-600 transition-colors duration-200 hover:text-white">
                    {link.label}
                    <span className="duration-450 absolute inset-0 z-[-1] scale-y-0 transform rounded-md bg-primary transition-transform group-hover:scale-y-100"></span>
                  </h1>
                </Link>
              )}
            </div>
          ))}
          {userRole === UserRole.Admin && (
            <Link href={adminLinks.user.href}>
              <AdminNavBar>
                <h1 className="text-lg font-bold text-gray-600 transition duration-100 hover:text-primary">
                  Admin
                </h1>
              </AdminNavBar>
            </Link>
          )}
        </nav>
        <div className="mr-16 flex h-12 w-12 items-center justify-center gap-3 sm:mr-12 sm:h-12 sm:w-12 md:h-16 md:w-16">
          <div>
            <SearchDrawer>
              <Search className="cursor-pointer hover:scale-105 hover:opacity-90" />
            </SearchDrawer>
          </div>
          <div className="relative">
            <Button
              className="flex h-10 w-10 flex-col gap-y-1.5 hover:scale-105 sm:h-12 sm:w-12 md:h-14 md:w-14"
              variant="outline"
              onClick={() => setIsOpenCart(true)}
            >
              <ShoppingBag />
              <span className="hidden text-xs font-semibold text-gray-500 md:block">
                Cart
              </span>
            </Button>
            <Badge className="absolute -right-2 -top-2">
              {useCartStore((state) => state.getQuantity())}
            </Badge>
            <CartSheet isOpenCart={isOpenCart} setIsOpenCart={setIsOpenCart}/>
          </div>
          {!!sessionToken ? (
            <AuthMenu />
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="flex h-10 w-10 flex-col gap-y-1.5 hover:scale-105 sm:h-12 sm:w-12 md:h-14 md:w-14"
                  variant="outline"
                >
                  <CircleUser />
                  <span className="hidden text-xs font-semibold text-gray-500 md:block">
                    Login
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <AuthDialog />
              </DialogContent>
            </Dialog>
          )}

          <MobileNav navLink={navLink} />
        </div>
      </div>
    </header>
  );
}

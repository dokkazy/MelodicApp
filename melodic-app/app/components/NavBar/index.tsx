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
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Image from "next/image";
import { formatPrice, toUpperCase } from "@/app/lib/utils";
import images from "@/assets/pictures/heroImage";
enum UserRole {
  Admin = "Admin",
  User = "User",
}

export default function NavBar() {
  const pathname = usePathname();
  const [userRole, setUserRole] = React.useState<UserRole>(UserRole.User);
  const [isOpen, setIsOpen] = React.useState(false);
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
                <Link href={link.href}>
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
              onClick={() => setIsOpen(true)}
            >
              <ShoppingBag />
              <span className="hidden text-xs font-semibold text-gray-500 md:block">
                Cart
              </span>
            </Button>
            <Badge className="absolute -right-2 -top-2">0</Badge>
            <Sheet open={isOpen} onOpenChange={() => setIsOpen(false)}>
              <SheetContent className="max-w-60">
                <div className="relative h-full w-full space-y-2">
                  <div className="border-b p-2">
                    <h1 className="text-lg font-semibold text-primary">
                      Shopping cart
                    </h1>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="group flex items-center gap-10">
                      <div className="aspect-square h-20 w-20 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                        <Image
                          src={images.hero2}
                          alt="Empty search"
                          width={500}
                          height={500}
                          className="h-full w-full cursor-pointer object-center"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-lg font-semibold">
                          {toUpperCase("Product Name")}
                        </h3>
                        <p>
                          <span>1 x</span>{" "}
                          <span className="text-sm font-semibold">
                            {formatPrice(500000)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="group flex items-center gap-10">
                      <div className="aspect-square h-20 w-20 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                        <Image
                          src={images.hero2}
                          alt="Empty search"
                          width={500}
                          height={500}
                          className="h-full w-full cursor-pointer object-center"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-lg font-semibold">
                          {toUpperCase("Product Name")}
                        </h3>
                        <p>
                          <span>1 x</span>{" "}
                          <span className="text-sm font-semibold">
                            {formatPrice(500000)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 w-full space-y-2">
                    <Button className="w-full rounded-none bg-black p-8 text-lg hover:bg-black hover:opacity-90">
                      Xem giỏ hàng
                    </Button>
                    <Button className="w-full rounded-none p-8 text-lg">
                      Thanh toán
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
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

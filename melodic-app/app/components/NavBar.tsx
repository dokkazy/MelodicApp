"use client";

import { Button } from "@/components/ui/button";
import { CircleUser, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "@/configs/routes";

const navLink = [
  links.home, links.shop, links.contact
]

export default function NavBar() {
  const pathname = usePathname();
  return (
    <header className="mb-8 border-b sticky top-0 left-0 right-0 bg-white z-20">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <Link href={"/"}>
          <h1 className="text-2xl md:text-4xl font-bold text-primary">Melodic</h1>
        </Link>
        <nav className="hidden gap-12 lg:flex ">
          {navLink.map((link, index) => (
            <div key={index}>
              {pathname === link.href ? (
                <Link href={link.href}>
                  <h1 className="text-primary text-lg font-bold">
                    {link.label}
                  </h1>
                </Link>
              ) : (
                <Link href={link.href}>
                  <h1 className="text-gray-600 transition duration-100 text-lg font-bold hover:text-primary">
                    {link.label}
                  </h1>
                </Link>
              )}
            </div>
          ))}
        </nav>
        <div className="flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16">
          <Button
            className="flex flex-col gap-y-1.5 h-10 w-10 first:mr-2 sm:h-12 sm:w-12 md:h-14 md:w-14"
            variant="outline"
          >
            <ShoppingBag />
            <span className="hidden text-xs font-semibold text-gray-500 md:block" >Cart</span>
          </Button>
          <Link href={links.login.href}>
            <Button
              className="flex flex-col gap-y-1.5 h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
              variant="outline"
            >
              <CircleUser />
              <span className="hidden text-xs font-semibold text-gray-500 md:block" >Login</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

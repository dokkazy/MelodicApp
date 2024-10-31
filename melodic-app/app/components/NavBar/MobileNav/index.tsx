"use client";
import { Menu } from "lucide-react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export default function MobileNav({
  navLink,
}: {
  navLink: Array<{ href: string; label: string }>;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  return (
    <div id="mobileNav" className="md:hidden">
      <Button onClick={() => setIsOpen(true)}>
        <Menu size={28} />
      </Button>
      <Sheet open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <SheetContent className="max-w-60">
          <nav className="flex flex-col gap-4 p-2">
            {navLink.map((link, index) => (
              <div key={index}>
                {pathname === link.href ? (
                  <Link href={link.href}>
                    <h1 className="text-lg font-bold text-primary">
                      {link.label}
                    </h1>
                  </Link>
                ) : (
                  <Link href={link.href} onClick={() => setIsOpen(false)}>
                    <h1 className="text-lg font-bold text-gray-600 transition duration-100 hover:text-primary">
                      {link.label}
                    </h1>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

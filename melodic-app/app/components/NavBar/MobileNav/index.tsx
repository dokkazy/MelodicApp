import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav({
  navLink,
}: {
  navLink: Array<{ href: string; label: string }>;
}) {
  const pathname = usePathname();
  return (
    <div id="mobileNav" className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <Button
          >
            <Menu size={28}/>
          </Button>
        </SheetTrigger>
        <SheetContent className="max-w-60">
          <nav className="gap-4 flex flex-col p-2">
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
        </SheetContent>
      </Sheet>
    </div>
  );
}

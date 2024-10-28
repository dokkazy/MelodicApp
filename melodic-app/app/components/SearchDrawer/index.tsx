import React from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import images from "@/assets/pictures/heroImage";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { toUpperCase } from "@/app/lib/utils";

export default function SearchDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="space-y-4">
          <Input
            ref={inputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products"
            className="border-0 border-b p-16 text-center text-6xl font-semibold focus-visible:ring-0 focus-visible:ring-offset-0"
          />

          {searchQuery === "" ? (
            <div className="min-h-96 text-center">
              <p className="text-lg font-semibold">
                Start typing to see products you are looking for
              </p>
            </div>
          ) : (
            <div className="max-h-96 space-y-6 divide-y overflow-y-scroll scroll-smooth">
              <div className="grid w-full grid-cols-2 gap-x-4 gap-y-10 px-16 md:grid-cols-4 md:px-20 lg:grid-cols-6 lg:px-24">
                {Array.from({ length: 24 }, (_, index) => (
                  <div key={index} className="group flex flex-col gap-1">
                    <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                      <Image
                        src={images.hero2}
                        alt="Empty search"
                        width={500}
                        height={500}
                        className="h-full w-full cursor-pointer object-center"
                      />
                    </div>
                    <h3 className="text-lg font-semibold">
                      {toUpperCase("Marshall monitor 2")}
                    </h3>
                  </div>
                ))}
              </div>
              <div className="w-full p-4 text-center">
                <Link href={"/"}>
                  <h4 className="text-sm font-semibold">VIEW ALL RESULTS</h4>
                </Link>
              </div>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

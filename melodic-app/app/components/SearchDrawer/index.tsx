import React from "react";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import images from "@/assets/pictures/heroImage";
import { toUpperCase } from "@/app/lib/utils";
import useDebounce from "@/hooks/use-debounce";
import useMediaQuery from "@/hooks/useMediaQuery";
import envConfig from "@/configs/config";
import { SearchResults } from "@/app/interface";

export default function SearchDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<SearchResults[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const deboundedValue = useDebounce(searchQuery, 500);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleClear = () => {
    setSearchQuery("");
    setSearchResults([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  React.useEffect(() => {
    const queryParams = `?$filter=contains(tolower(name), '${deboundedValue}')`;
    if (!deboundedValue.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const search = async () => {
        const response = await fetch(
          `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/odata/speakers${queryParams}`,
        ).then((res) => res.json());
        console.log("API Response:", response);
        setSearchResults(response.value || []);
        setLoading(false);
      };
      search();
    } catch (error) {
      console.error("Failed to fetch speakers:", error);
    }
  }, [deboundedValue]);

  React.useEffect(() => {
    console.log("Search Results:", searchResults);
  }, [searchResults]);

  return (
    <Drawer open={open} onOpenChange={() => setOpen(!open)}>
      <DrawerTrigger onClick={() => setOpen(true)}>{children}</DrawerTrigger>
      <DrawerContent aria-describedby={undefined}>
        <div className="space-y-4">
          <div className="relative">
            <input
              autoFocus
              ref={inputRef}
              spellCheck={false}
              value={searchQuery}
              onChange={(e) => {
                e.target.value = e.target.value.trimStart();
                setSearchQuery(e.target.value);
              }}
              placeholder="Search for products"
              className="flex h-10 w-full rounded-md border-0 border-b px-16 py-10 text-center text-2xl font-semibold placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:px-28 md:py-16 md:text-6xl"
            />
            {!!searchQuery && (
              <button
                className="absolute right-4 top-3 translate-y-1/2 cursor-pointer hover:opacity-75 md:right-8 md:top-1"
                title="Clear search"
                onClick={handleClear}
              >
                {isDesktop ? <X size={60} /> : <X size={30} />}
              </button>
            )}
          </div>

          {searchResults.length == 0 ? (
            <div className="min-h-96 text-center">
              <p className="text-lg font-semibold">
                Start typing to see products you are looking for
              </p>
            </div>
          ) : (
            <div className="max-h-[425px] space-y-6 divide-y overflow-y-scroll scroll-smooth">
              <div className="grid w-full grid-cols-2 gap-x-4 gap-y-10 px-16 md:grid-cols-4 md:px-20 lg:grid-cols-6 lg:px-24">
                {searchResults.map((product, index) => (
                  <Link
                    onClick={handleClose}
                    prefetch
                    key={index}
                    href={`/product/${product.Id}`}
                  >
                    <div className="group flex flex-col gap-1">
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
                        {toUpperCase(product.Name)}
                      </h3>
                    </div>
                  </Link>
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

import React from "react";
import Image from "next/image";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartStore } from "@/providers/CartProvider";
import { checkIsImg, formatPrice } from "@/app/lib/utils";
import images from "@/assets/pictures/heroImage";
import { Button } from "@/components/ui/button";


export default function CartSheet({
    isOpenCart,
    setIsOpenCart,
}: {
    isOpenCart: boolean;
    setIsOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const cart = useCartStore((state) => state.cart);
  return (
    <Sheet open={isOpenCart} onOpenChange={() => setIsOpenCart(false)}>
              <SheetContent className="w-full md:w-10/12">
                <div className="relative h-full w-full space-y-3">
                  <div className="border-b p-2">
                    <h1 className="text-lg font-semibold text-primary">
                      Shopping cart
                    </h1>
                  </div>
                  <ScrollArea className="h-[70%]">
                    <div className="flex flex-col gap-4">
                      {cart.map((item, index) => (
                        <div
                          key={index}
                          className="group flex items-center gap-10"
                        >
                          <div className="aspect-square h-20 w-20 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                            <Image
                              src={
                                checkIsImg(item.product.Img)
                                  ? item.product.Img
                                  : images.hero1
                              }
                              alt="Empty search"
                              width={500}
                              height={500}
                              className="h-full w-full cursor-pointer object-center"
                            />
                          </div>
                          <div className="flex flex-col">
                            <h3 className="text-lg font-semibold">
                              {item.product.Name}
                            </h3>
                            <p>
                              <span>{item.quantity} x</span>{" "}
                              <span className="text-sm font-semibold">
                                {formatPrice(item.product.Price)}
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  {cart.length > 0 && (
                    <div className="w-full space-y-2">
                      <Button className="w-full rounded-none bg-black p-8 text-lg hover:bg-black hover:opacity-90">
                        View cart
                      </Button>
                      <Button className="w-full rounded-none p-8 text-lg">
                        Check out
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
  );
}

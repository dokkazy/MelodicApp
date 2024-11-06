import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CircleX } from "lucide-react";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartStore } from "@/providers/CartProvider";
import { checkIsImg, formatPrice } from "@/app/lib/utils";
import images from "@/assets/pictures/heroImage";
import { Button } from "@/components/ui/button";
import EmptyCart from "@/app/(pages)/(customer)/cart/EmptyCart";

export default function CartSheet({
  isOpenCart,
  setIsOpenCart,
}: {
  isOpenCart: boolean;
  setIsOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const cart = useCartStore((state) => state.cart);
  const removeItem = useCartStore((state) => state.removeFromCart);

  const handleRemoveCartItem = (id: string) => {
    removeItem(id);
  };
  return (
    <Sheet open={isOpenCart} onOpenChange={() => setIsOpenCart(false)}>
      <SheetContent className="w-full md:w-10/12">
        <div className="relative h-full w-full space-y-3">
          <div className="border-b p-2">
            <h1 className="text-lg font-semibold text-primary">
              Shopping cart
            </h1>
          </div>
          {cart.length === 0 ? (
            <EmptyCart setIsOpenSheetCart={setIsOpenCart} />
          ) : (
            <>
              <ScrollArea className="h-[70%] p-6">
                <div className="flex flex-col gap-4">
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="group relative flex items-center gap-10"
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
                      <button
                        title="cart-remove"
                        className="absolute right-0 top-0 hover:opacity-80"
                        onClick={() => handleRemoveCartItem(item.product.Id)}
                      >
                        <CircleX />
                      </button>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="w-full">
                <Link href={"/cart"}>
                  <Button
                    onClick={() => {
                      setIsOpenCart(false);
                    }}
                    className="w-full rounded-none bg-black p-8 text-lg hover:bg-black hover:opacity-90 mb-2"
                  >
                    View cart
                  </Button>
                </Link>
                <Link href={"/checkout"}>
                  <Button
                    onClick={() => setIsOpenCart(false)}
                    className="w-full rounded-none p-8 text-lg"
                  >
                    Check out
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

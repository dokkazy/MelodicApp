import { Check, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SyntheticEvent, useEffect } from "react";

import { checkIsImg, formatPrice } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {  ProductType } from "@/schemaValidations/product.schema";
import { useCartStore } from "@/providers/CartProvider";
import { CartItem } from "@/stores/cartStore";
import { useToast } from "@/hooks/use-toast";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function ProductCard({
  product,
}: {
  product: ProductType;
}) {
  const addItem = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);
  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    console.log(product);
    console.log(cart);
  }, [cart]);
  const handleAddToCart = (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(product);
    const cartItem: CartItem = {
      product: product,
      quantity: 1,
    };
    addItem(cartItem);
    toast({
      title: "Add successfully",
    });
  };
  return (
    <Link prefetch href={`/product/${product.Id}`}>
      <Card
        className={`${!isMobile ? "transition duration-500 ease-in-out hover:scale-105 hover:shadow-xl" : ""}`}
      >
        <CardContent>
          <Image
            src={
              checkIsImg(product.Img) ? product.Img : "https://placehold.co/300"
            }
            alt={product.Name}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            width={300}
            height={300}
          />
          <div className="mt-4 flex flex-col gap-4">
            <div>
              <h3 className="text-sm font-semibold text-black md:text-xs lg:text-lg">
                {product.Name}
              </h3>
              <p className="text-gray-500">{product.Brand.Name}</p>
            </div>
            <div className="flex items-center gap-x-1 text-base">
              <Check />
              <p className="text-gray-700">In stock</p>
            </div>
            <p className="text-base font-medium text-gray-900">
              {formatPrice(10000000)}
            </p>

            <Button
              className={`overflow-hidden bg-black hover:bg-black ${
                isMobile ? "" : "group/btn relative"
              }`}
              onClick={handleAddToCart}
            >
              <span
                className={`inline-flex items-center ${
                  isMobile
                    ? ""
                    : "transition-transform duration-300 group-hover/btn:-translate-y-[200%]"
                }`}
              >
                Thêm vào giỏ hàng
              </span>
              {!isMobile && (
                <span className="absolute inset-0 inline-flex translate-y-full items-center justify-center transition-transform duration-300 group-hover/btn:translate-y-0">
                  <ShoppingCart className="h-5 w-5" />
                </span>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

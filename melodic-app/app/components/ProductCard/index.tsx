import { Check, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SyntheticEvent, useEffect } from "react";

import { checkIsImg, formatPrice } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductType } from "@/schemaValidations/product.schema";
import { useCartStore } from "@/providers/CartProvider";
import { CartItem } from "@/stores/cartStore";
import { useToast } from "@/hooks/use-toast";
import useMediaQuery from "@/hooks/useMediaQuery";
import images from "@/assets/pictures/heroImage";

export default function ProductCard({ product }: { product: ProductType }) {
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
        className={`${!isMobile ? "min-h-fit transition duration-500 ease-in-out hover:scale-105 hover:shadow-xl" : ""}`}
      >
        <CardContent>
          <Image
            src={
              checkIsImg(product.Img) ? product.Img : images.empty
            }
            alt={product.Name}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            width={500}
            height={500}
          />
          <div className="mt-4 flex flex-col gap-4">
            <div>
              <h3 className="overflow-hidden truncate text-2xl font-semibold text-black md:text-lg">
                {product.Name}
              </h3>
              <p className="text-2xl text-gray-500 md:text-base">
                {product.Brand.Name}
              </p>
            </div>
            <div className="flex items-center gap-x-1 text-base">
              <Check />
              <p className="text-lg text-gray-700">In stock</p>
            </div>
            <p className="text-2xl font-medium text-gray-900 md:text-base">
              {formatPrice(product.Price)}
            </p>

            <Button
              className={`overflow-hidden bg-black p-8 hover:bg-black md:p-0 ${
                isMobile ? "" : "group/btn relative"
              }`}
              onClick={handleAddToCart}
            >
              <span
                className={`inline-flex items-center text-2xl md:text-base ${
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

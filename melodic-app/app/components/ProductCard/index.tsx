import { checkIsImg, formatPrice } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SyntheticEvent } from "react";

type ProductResType = {
  Brand: {
    Name: string;
    BrandId: string;
  };
  Id: string;
  Name: string;
  CreateAt: Date;
  Price: number;
  Decription: string;
  UnitInStock: number;
  Img: string;
};

export default function ProductCard({
  product,
}: {
  product: ProductResType;
}) {

  const handleAddToCart = (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("Add to cart");
  };
  return (
      <Link href={`/product/${product.Id}`}>
        <Card className="transition duration-500 ease-in-out hover:scale-105 hover:shadow-xl">
          <CardContent>
            <Image
              src={
                checkIsImg(product.Img)
                  ? product.Img
                  : "https://placehold.co/300"
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
                className="group/btn relative overflow-hidden bg-black hover:bg-black"
                onClick={handleAddToCart}
              >
                <span className="inline-flex items-center transition-transform duration-300 group-hover/btn:-translate-y-[200%]">
                  Thêm vào giỏ hàng
                </span>
                <span className="absolute inset-0 inline-flex translate-y-full items-center justify-center transition-transform duration-300 group-hover/btn:translate-y-0">
                  <ShoppingCart className="h-5 w-5" />
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>
  );
}

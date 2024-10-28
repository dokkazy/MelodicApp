"use client";
import Image from "next/image";
import Link from "next/link";
import { SyntheticEvent, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Check, ShoppingCart } from "lucide-react";

import speakerApiRequest from "@/api/speaker";
import { ProductListResType } from "@/schemaValidations/product.schema";
import { checkIsImg, formatPrice } from "@/app/lib/utils";
import Breadcrumb from "@/app/components/BreadCrumb";
import { cn } from "@/lib/utils";
import styles from "./Shop.module.scss";
import images from "@/assets/pictures/heroImage";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import SkeletonLoading from "./SkeletonLoading";
import { Card, CardContent } from "@/components/ui/card";

const MIN = 0;
const MAX = 20000000;

export default function ShopPage() {
  const itemPerPage = 12;
  const [page, setPage] = useState(0);
  const [productList, setProductList] = useState<ProductListResType["value"]>(
    [],
  );
  const [totalCount, setTotalCount] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const pathname = usePathname();
  const [values, setValues] = useState([MIN, MAX]);

  const queryParams = `?$top=${itemPerPage}&$skip=${
    page * itemPerPage
  }&$count=true&$orderby=createAt desc`;

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await speakerApiRequest.getListSpeakers(queryParams);
        console.log("API Response:", response);
        const { value, "@odata.count": count } = response.payload;
        console.log("Total Products Count:", count);
        setProductList(value || []);
        setTotalCount(count || 0);
        setMaxPage(Math.ceil(count / itemPerPage));
        console.log("Max Page:", Math.ceil(count / itemPerPage));
      } catch (error) {
        console.error("Failed to fetch speakers:", error);
      }
    };
    fetchSpeakers();
  }, [queryParams]);
  console.log(pathname);

  const handleAddToCart = (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("Add to cart");
  }

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8">
      <div className="mx-auto lg:max-w-7xl">
        <Breadcrumb pathname={pathname} title="Shop" />
      </div>
      <div className={`${cn(styles["category-card"])}`}>
        <div className="flex flex-col items-center">
          <Image
            src={images.hero1 || "https://placehold.co/80"}
            alt="images"
            width={100}
            height={100}
            className="h-full w-full cursor-pointer object-scale-down transition duration-500 ease-in-out hover:scale-110"
          />
          <h3 className="font-bold">SONY</h3>
          <p className="">10 products</p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={images.hero2}
            alt="images"
            width={100}
            height={100}
            className="h-full w-full cursor-pointer object-scale-down transition duration-500 ease-in-out hover:scale-105"
          />
          <h3 className="font-bold">SONY</h3>
          <p>10 products</p>
        </div>
        <div className="md:w-2/4"></div>
      </div>
      <div className="mx-auto flex max-w-2xl gap-x-6 py-16 sm:py-24 lg:max-w-7xl">
        <div className="hidden max-h-max rounded-md bg-gray-50 px-4 py-8 md:block md:w-[35%]">
          <div className="w-full space-y-6">
            <h3 className="font-semibold">Lọc sản phẩm</h3>
            <Slider
              value={values}
              onValueChange={setValues}
              min={MIN}
              max={MAX}
              step={10000}
            />
            <div className="flex items-center justify-between">
              <h3>
                Giá{" "}
                <span className="font-semibold">{formatPrice(values[0])}</span>{" "}
                -{" "}
                <span className="font-semibold">{formatPrice(values[1])}</span>
              </h3>
              <Button>Lọc</Button>
            </div>
          </div>
        </div>
        {productList.length >= 0 ? (
          <div className="grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
            {Array.from({ length: 12 }, (_, index) => (
              <div key={index} className="group relative">
                <Link href={`/product/1`}>
                  <Card className="transition duration-500 ease-in-out hover:scale-105 hover:shadow-xl">
                    <CardContent>
                      <Image
                        src={
                          checkIsImg(
                            "https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-woburn-iii-black-01.webp",
                          )
                            ? "https://marshallstorevietnam.vn/wp-content/uploads/2023/03/marshall-woburn-iii-black-01.webp"
                            : "https://placehold.co/300"
                        }
                        alt={"Marshall Woburn III"}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        width={300}
                        height={300}
                      />
                      <div className="mt-4 flex flex-col gap-4">
                        <div>
                          <h3 className="text-sm font-semibold text-black md:text-xs lg:text-lg">
                            Marshall Woburn III
                          </h3>
                          <p className="text-lg text-gray-500">Marshall</p>
                        </div>
                        <div className="flex items-center gap-x-1 text-base">
                          <Check />
                          <p className="text-gray-700">In stock</p>
                        </div>
                        <p className="text-base font-medium text-gray-900">
                          {formatPrice(10000000)}
                        </p>

                        <Button className="group/btn relative overflow-hidden bg-black hover:bg-black" onClick={handleAddToCart}>
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
              </div>
            ))}

            {/* {productList.map((product) => (
              <div key={product.Id} className="group relative">
                <Link href={`/product/${product.Id}`}>
                  <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
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
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-xl text-black md:text-xs lg:text-sm">
                        {product.Name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.Brand.Name}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {formatPrice(product.Price)}
                    </p>
                  </div>
                </Link>
              </div>
            ))} */}
          </div>
        ) : (
          <SkeletonLoading />
        )}
      </div>
    </div>
  );
}

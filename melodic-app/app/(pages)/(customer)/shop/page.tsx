"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import speakerApiRequest from "@/api/speaker";
import { ProductListResType } from "@/schemaValidations/product.schema";
import { formatPrice } from "@/app/lib/utils";
import Breadcrumb from "@/app/components/BreadCrumb";
import { cn } from "@/lib/utils";
import styles from "./Shop.module.scss";
import images from "@/assets/pictures/heroImage";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import SkeletonLoading from "./SkeletonLoading";
import ProductCard from "@/app/components/ProductCard";

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
        <div className="hidden max-h-max rounded-md bg-gray-50 px-4 py-8 md:block md:w-2/4">
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
        {productList.length > 0 ? (
          <div className="space-y-12">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:w-full lg:grid-cols-4 xl:gap-x-4">
              {productList.map((product, index) => (
                <div key={index} className="group relative">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        ) : (
          <SkeletonLoading />
        )}
      </div>
    </div>
  );
}

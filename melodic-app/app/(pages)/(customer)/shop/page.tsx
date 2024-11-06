"use client";
import { useEffect, useState } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import { cn } from "@/lib/utils";
import styles from "./Shop.module.scss";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import SkeletonLoading from "./SkeletonLoading";
import ProductCard from "@/app/components/ProductCard";
import BrandCard from "@/app/components/BrandCard";
import { links } from "@/configs/routes";

const MIN = 0;
const MAX = 20000000;

export default function ShopPage() {
  const itemPerPage = 8;
  const [page, setPage] = useState(1);
  const [productList, setProductList] = useState<ProductListResType["value"]>(
    [],
  );
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [maxPage, setMaxPage] = useState(0);
  const [values, setValues] = useState([MIN, MAX]);
  const defaultQueryParams = `?$top=${itemPerPage}&$skip=${
    (page - 1) * itemPerPage
  }&$count=true&$orderby=createAt desc`;
  const [queryParams, setQueryParams] = useState(defaultQueryParams);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        setLoading(true);
        const response = await speakerApiRequest.getListSpeakers(queryParams);
        const { value, "@odata.count": count } = response.payload;
        console.log("API Response:", response);
        console.log("Total Products Count:", count);
        setProductList(value || []);
        setTotalCount(count || 0);
        setMaxPage(Math.ceil(count / itemPerPage));
        console.log("Max Page:", Math.ceil(count / itemPerPage));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch speakers:", error);
      }
    };
    fetchSpeakers();
    console.log("Query Params:", queryParams);
  }, [queryParams, page]);
  // console.log(pathname);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleFilter = (min: number, max: number) => {
    console.log("Min: ", min, "Max: ", max);
    const queryFilterPrice = `&$filter=Price ge ${min} and Price le ${max}`;
    setQueryParams(defaultQueryParams + queryFilterPrice); // Update queryParams to include filter
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8">
      <div className="mx-auto lg:max-w-7xl">
        <Breadcrumb>
          <BreadcrumbList className="text-xl">
            <BreadcrumbItem>
              <BreadcrumbLink href={links.home.href}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">Shop</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className={`${cn(styles["category-card"])}`}>
        <div className={`flex items-center gap-4 max-w-2/3 overflow-x-auto ${cn(styles["scroll-type"])}`}>
          <BrandCard />
        </div>
      </div>

      <div className="mx-auto flex max-w-2xl justify-between gap-x-6 py-16 sm:py-24 lg:max-w-7xl">
        <div className="hidden max-h-max max-w-[280px] rounded-md bg-gray-50 px-4 py-8 md:block md:w-2/4">
          <div className="w-full space-y-6">
            <h3 className="font-semibold">Filter</h3>
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
              <Button onClick={() => handleFilter(values[0], values[1])}>
                Lọc
              </Button>
            </div>
          </div>
        </div>
        {productList.length > 0 ? (
          <div className="w-full space-y-12">
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
                  {maxPage > 1 && (
                    <>
                      {/* Previous button */}
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={() =>
                            handlePageChange(Math.max(1, page - 1))
                          }
                          isActive={page !== 1}
                          className={`${
                            page === 1
                              ? "cursor-not-allowed opacity-50"
                              : "cursor-pointer hover:bg-gray-200"
                          }`}
                        />
                      </PaginationItem>

                      {/* Always show the first page */}
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={() => handlePageChange(1)}
                          isActive={page === 1}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>

                      {/* Always show the second page if there are more than one page */}
                      {maxPage > 1 && (
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            onClick={() => handlePageChange(2)}
                            isActive={page === 2}
                          >
                            2
                          </PaginationLink>
                        </PaginationItem>
                      )}

                      {/* Show ellipsis if the current page is greater than 3 */}
                      {page > 3 && <PaginationEllipsis />}

                      {/* Show current page link */}
                      {page > 2 && (
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            onClick={() => handlePageChange(page)}
                            isActive
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )}

                      {/* Show ellipsis if there are more pages after the current page */}
                      {page < maxPage - 1 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}

                      {/* Always show the last page if there are more than two pages */}
                      {maxPage > 2 && page < maxPage && (
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            onClick={() => handlePageChange(maxPage)}
                            isActive={page === maxPage}
                          >
                            {maxPage}
                          </PaginationLink>
                        </PaginationItem>
                      )}

                      {/* Next button */}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={() =>
                            handlePageChange(Math.min(maxPage, page + 1))
                          }
                          isActive={page !== maxPage}
                          className={`${
                            page === maxPage
                              ? "cursor-not-allowed opacity-50"
                              : "cursor-pointer hover:bg-gray-200"
                          }`}
                        />
                      </PaginationItem>
                    </>
                  )}

                  {/* If there is only one page, show the current page */}
                  {maxPage === 1 && (
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        1
                      </PaginationLink>
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        ) : loading ? (
          <SkeletonLoading />
        ) : (
          <div className="grid">
            <h2 className="text-center text-2xl font-semibold">
              Không có sản phẩm nào
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

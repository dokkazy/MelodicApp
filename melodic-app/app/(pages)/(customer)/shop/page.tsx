"use client";
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
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import SkeletonLoading from "./SkeletonLoading";
import ProductCard from "@/app/components/ProductCard";
import BrandCard from "@/app/components/BrandCard";

const MIN = 0;
const MAX = 20000000;

export default function ShopPage() {
  const itemPerPage = 12;
  const [page, setPage] = useState(1);
  const [productList, setProductList] = useState<ProductListResType["value"]>(
    [],
  );
  const [totalCount, setTotalCount] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const pathname = usePathname();
  const [values, setValues] = useState([MIN, MAX]);
  let defaultQueryParams = `?$top=${itemPerPage}&$skip=${
    (page - 1) * itemPerPage
  }&$count=true&$orderby=createAt desc`;
  const [queryParams, setQueryParams] = useState(defaultQueryParams);

  function getQueryParams(query: string = "") {
    return query.concat(defaultQueryParams.slice(1));
  }

  useEffect(() => {
    console.log(queryParams);

    const fetchSpeakers = async () => {
      try {
        const response = await speakerApiRequest.getListSpeakers(defaultQueryParams);
        const { value, "@odata.count": count } = response.payload;
        // console.log("API Response:", response);
        // console.log("Total Products Count:", count);
        setProductList(value || []);
        setTotalCount(count || 0);
        setMaxPage(Math.ceil(count / itemPerPage));
        console.log("Max Page:", Math.ceil(count / itemPerPage));
      } catch (error) {
        console.error("Failed to fetch speakers:", error);
      }
    };
    fetchSpeakers();
  }, [defaultQueryParams, page]);
  // console.log(pathname);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleFilter = (min: number, max: number) => {
    setQueryParams(defaultQueryParams);
    
    // setQueryParams(
    //   `?$filter=Price ge ${min} and Price le ${max}&`.concat(
    //     queryParams.slice(1),
    //   ),
    // );
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8">
      <div className="mx-auto lg:max-w-7xl">
        <Breadcrumb pathname={pathname} title="Shop" />
      </div>
      <div className={`${cn(styles["category-card"])}`}>
        <BrandCard />
      </div>

      <div className="mx-auto flex max-w-2xl justify-between gap-x-6 py-16 sm:py-24 lg:max-w-7xl">
        <div className="hidden max-h-max max-w-80 rounded-md bg-gray-50 px-4 py-8 md:block md:w-2/4">
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
                          isActive={page != 1}
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

                      {/* Show current page if it's greater than 2 and less than maxPage */}
                      {page > 2 && page < maxPage && (
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

                      {/* Show ellipsis if there are pages between the current page and the last page */}
                      {page < maxPage - 1 && <PaginationEllipsis />}

                      {page === maxPage && <PaginationEllipsis />}
                      {/* Always show the last page if there are more than two pages */}
                      {maxPage > 2 && (
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
                          isActive={page != maxPage}
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
        ) : (
          <SkeletonLoading />
        )}
      </div>
    </div>
  );
}

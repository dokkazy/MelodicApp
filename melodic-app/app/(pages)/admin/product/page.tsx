"use client"
import { ProductListResType } from '@/schemaValidations/product.schema';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import speakerApiRequest from '@/api/speaker';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import DeleteProduct from '../_component/delete-product';
import ProductCard from '@/app/components/ProductCard';
import ProductAddForm from '../_component/product-add-form';
import ProductAddButton from '../_component/product-add-button';
import ProductUpdateButton from '../_component/product-edit-button';
export default function ProductPage() {
  const itemPerPage = 8;
  const [page, setPage] = useState(1);
  const [productList, setProductList] = useState<ProductListResType["value"]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [maxPage, setMaxPage] = useState(0);

  const pathname = usePathname();
  const createQueryParams = () => {
    return `?$top=${itemPerPage}&$skip=${(page - 1) * itemPerPage}&$count=true&$orderby=createAt desc`;
  };
  const [queryParams, setQueryParams] = useState(createQueryParams());

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await speakerApiRequest.getListSpeakers(queryParams);
        const { value, "@odata.count": count } = response.payload;
        setProductList(value || []);
        setTotalCount(count || 0);
        setMaxPage(Math.ceil(count / itemPerPage));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch speakers:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [queryParams]);

  useEffect(() => {
    setQueryParams(createQueryParams());
  }, [page]);


  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  }


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Product List</h1>
      {loading ? (
        <div className="text-center text-xl">Loading...</div>
      ) : (
        <>
          <div className='mb-4'>
            <ProductAddButton />
          </div>
          <Table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <TableCaption>Product List</TableCaption>
            <TableHeader>
              <TableRow className=" text-black font-bold">
                <TableHead className='text-black'>ID</TableHead>
                <TableHead className='text-black'>Name</TableHead>
                <TableHead className='text-black'>Price</TableHead>
                <TableHead className='text-black'>Description</TableHead>
                <TableHead className='text-black'>Unit In Stock</TableHead>
                <TableHead className='text-black'>Brand</TableHead>
                <TableHead className='text-black'>Created At</TableHead>
                <TableHead className='text-black'>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productList.map((product) => (
                <TableRow key={product.Id} className="hover:bg-gray-100 transition-colors">
                  <TableCell className="text-center">{product.Id}</TableCell>
                  <TableCell>{product.Name}</TableCell>
                  <TableCell className="text-center">${product.Price.toFixed(2)}</TableCell>
                  <TableCell>{product.Decription}</TableCell>
                  <TableCell className="text-center">{product.UnitInStock}</TableCell>
                  <TableCell>{product.Brand.Name}</TableCell>
                  <TableCell className="text-center">{new Date(product.CreateAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-center col-span-2">

                    <ProductUpdateButton id={product.Id} />

                  </TableCell>
                  <TableCell>
                    <DeleteProduct product={product} />

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent>
                {maxPage > 1 && (
                  <>
                    {/* Previous button */}
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={() => handlePageChange(Math.max(1, page - 1))}
                        isActive={page !== 1}
                        className={`${page === 1
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
                        onClick={() => handlePageChange(Math.min(maxPage, page + 1))}
                        isActive={page !== maxPage}
                        className={`${page === maxPage
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
        </>
      )}
    </div>
  );
}

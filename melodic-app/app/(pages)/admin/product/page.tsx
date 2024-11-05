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
import DeleteProduct from '../_component/delete-product';
import ProductCard from '@/app/components/ProductCard';
import ProductAddForm from '../_component/product-add-form';
import ProductAddButton from '../_component/product-add-button';
import UpdateSpeakerForm from './update/page';
import ProductUpdateButton from '../_component/product-edit-button';
export default function ProductPage() {
  const itemPerPage = 8;
  const [page, setPage] = useState(1);
  const [productList, setProductList] = useState<ProductListResType["value"]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [maxPage, setMaxPage] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<ProductListResType["value"][0] | null>(null);
  const pathname = usePathname();
  const defaultQueryParams = `?$top=${itemPerPage}&$skip=${(page - 1) * itemPerPage}&$count=true&$orderby=createAt desc`;
  const [queryParams, setQueryParams] = useState(defaultQueryParams);

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
  }, [queryParams, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleEdit = (productId: string) => {
    const productToEdit = productList.find(product => product.Id === productId);
    setSelectedProduct(productToEdit || null);
  };

  const handleCloseEditForm = () => {
    setSelectedProduct(null);
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Product List</h1>
      {loading ? (
        <div className="text-center text-xl">Loading...</div>
      ) : (
        <>
          <div>
            <ProductAddButton />
          </div>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border border-gray-300 p-3">ID</th>
                <th className="border border-gray-300 p-3">Name</th>
                <th className="border border-gray-300 p-3">Price</th>
                <th className="border border-gray-300 p-3">Description</th>
                <th className="border border-gray-300 p-3">Unit In Stock</th>
                <th className="border border-gray-300 p-3">Brand</th>
                <th className="border border-gray-300 p-3">Created At</th>
                <th className="border border-gray-300 p-3" colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product) => (
                <tr key={product.Id} className="hover:bg-gray-100 transition-colors">
                  <td className="border border-gray-300 p-3 text-center">{product.Id}</td>
                  <td className="border border-gray-300 p-3">{product.Name}</td>
                  <td className="border border-gray-300 p-3 text-center">${product.Price.toFixed(2)}</td>
                  <td className="border border-gray-300 p-3">{product.Decription}</td>
                  <td className="border border-gray-300 p-3 text-center">{product.UnitInStock}</td>
                  <td className="border border-gray-300 p-3">{product.Brand.Name}</td>
                  <td className="border border-gray-300 p-3 text-center">{new Date(product.CreateAt).toLocaleDateString()}</td>
                  <td className="border border-gray-300 p-3 text-center col-span-2" >
                    <button onClick={() => handleEdit(product.Id)}>
                      Edit
                    </button>
                    <DeleteProduct product={product} />
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
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

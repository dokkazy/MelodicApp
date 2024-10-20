// Add this line at the top to mark this file as a Client Component
"use client";
import Image from "next/image";
import Link from "next/link";
import speakerApiRequest from "@/api/speaker";
import { useEffect, useState } from "react";
import { ProductListResType } from "@/app/schemaValidations/product.schema";
import { checkIsImg, formatPrice } from "@/app/lib/utils";

export default function ShopPage() {
  const itemPerPage = 12;
  const [page, setPage] = useState(0);
  const [productList, setProductList] = useState<ProductListResType["value"]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [maxPage, setMaxPage] = useState(0);

  const queryParams = `?$top=${itemPerPage}&$skip=${page * itemPerPage}&$count=true&$orderby=createAt desc`;

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
  return (
    <div className="bg-white">
      <div className="mx-auto min-h-screen max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {productList.map((product) => (
            <div key={product.Id} className="group relative">
              <Link href={`/product/${product.Id}`}>
                <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                  <Image
                    src={checkIsImg(product.Img) ? product.Img : "https://placehold.co/300"}
                    alt={product.Name}
                    className="w-full h-full object-center object-cover lg:h-full lg:w-full"
                    width={300}
                    height={300}
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-xl md:text-xs lg:text-sm text-black">
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
          ))}
        </div>
      </div>
    </div>
  );
}

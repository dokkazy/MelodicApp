"use client";
import React from "react";
import { Star, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductDetailResType } from "@/app/schemaValidations/product.schema";
import ImageGallery from "@/app/components/ImageGallery";
import speakerApiRequest from "@/api/speaker";
import { formatPrice } from "@/app/lib/utils";
import SkeletonLoading from "./SkeletonLoading";

export default function ProductDetail({ Id }: { Id: string }) {
  const [data, setData] = React.useState<ProductDetailResType | null>(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    try {
      setLoading(true);
      const fetchData = async (id: string) => {
        const response = await speakerApiRequest.getSpeakerDetails(id);
        return response;
      };
      fetchData(Id).then((res) => {
        if (res.status === 200) {
          setData(res.payload);
          console.log("Product details fetched successfully:", res.payload);
        }
      });
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.error("Failed to fetch product details:", error);
    }
  }, [Id]);

  return (
    <div className="bg-white">
      <div className="mx-auto min-h-screen max-w-screen-xl px-4 md:px-8">
        {loading || !data ? (
          <SkeletonLoading />
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            <ImageGallery image={data?.img} />
            <div className="md:py-8">
              <div className="mb-2 md:mb-3">
                <span className="mb-0.5 inline-block text-gray-500">
                  {data?.brand?.Name}
                </span>
                <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                  {data?.name}
                </h2>
              </div>

              <div className="mb-6 flex items-center gap-3 md:mb-10">
                <Button className="rounded-full gap-x-2">
                  <span className="text-sm">4.2</span>
                  <Star className="h-5 w-5" />
                </Button>
                <span className="text-sm text-gray-500 transition duration-100">
                  56 Ratings
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-end gap-2">
                  <span className="text-xl font-bold text-gray-800 md:text-2xl">
                    {formatPrice(data.price)}
                  </span>
                  <span className="mb-0.5 text-gray-300 line-through">
                    {formatPrice(data.price + 100000)}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  Incl. Val plus shipping
                </span>
              </div>

              <div className="mb-6 flex items-center gap-2 text-gray-500">
                <Truck className="h-6 w-6" />
                <span className="text-sm">2-4 Day Shipping</span>
              </div>

              <div className="flex gap-2.5 mb-6">
                <Button>Add To Bag</Button>
                <Button variant="secondary">Buy Now</Button>
              </div>

              <p className="text-base text-gray-500 tracking-normal">
                {data?.decription}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import images from "@/assets/pictures/heroImage";
import { links } from "@/configs/routes";
import { checkIsImg, formatPrice } from "@/app/lib/utils";
import speakerApiRequest from "@/api/speaker";
import { useEffect, useState } from "react";
import { ProductListResType } from "@/schemaValidations/product.schema";
import Loading from "./loading";
import BlurFade from "@/components/ui/blur-fade";

export default function Newest() {
  const newestItems = 4;
  const [productList, setProductList] = useState<ProductListResType["value"]>(
    []
  );
  const [loading, setLoading] = useState(true);

  const queryParams = `?$top=${newestItems}&$count=true&$orderby=createAt desc`;

  const fetchSpeakers = async () => {
    setLoading(true);
    try {
      const response = await speakerApiRequest.getListSpeakers(queryParams);
      const { value, "@odata.count": count } = response.payload;
      setProductList(value || []);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.error("Failed to fetch speakers:", error);
    }
  };
  console.log(productList);

  useEffect(() => {
    fetchSpeakers();
    
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-700">
            Our Newest Products
          </h2>
          <Link className="text-primary flex items-center gap-x-1" href="/shop">
            View all{" "}
            <span>
              <ArrowRight />
            </span>
          </Link>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {productList.map((product) => (
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
                    <p className="text-xl sm:text-sm font-medium text-gray-900">
                      {formatPrice(product.Price)}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
        <div className="md:flex md:items-center bg-gray-100 rounded-md w-full max-h-[520px] p-4 mt-12 sm:mt-24 sm:px-14 sm:py-12">
          <div className="w-full md:w-2/4">
            <BlurFade delay={0.25} inView>
              <Image
                src={images.hero3 || "https://placehold.co/500"}
                alt="hero image"
                width={500}
                height={500}
                className="object-cover object-center"
              />
            </BlurFade>
          </div>
          <div className="md:w-2/4">
            <BlurFade delay={0.25 * 2} inView>
              <h2 className="text-2xl md:text-5xl font-semibold tracking-tighter">
                PORTABLE SPEAKER
              </h2>

              <p className="mt-2 md:mt-4 text-wrap max-md:text-sm">
                Take sound everywhere with this portable speaker and keep your
                music going for hours on end.
              </p>
              <Link
                href={links.shop.href}
                className="mt-2 md:mt-4 px-4 py-3 flex items-center space-x-2 max-w-max bg-black text-white rounded-lg"
              >
                <span className="text-xs md:text-sm font-semibold">
                  View more
                </span>
                <span>
                  <ChevronRight size={18} />
                </span>
              </Link>
            </BlurFade>
          </div>
        </div>
      </div>
    </div>
  );
}

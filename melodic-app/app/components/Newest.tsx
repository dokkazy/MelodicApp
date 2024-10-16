import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { simplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import images from "@/assets/pictures/heroImage";

async function fetchData() {
  const queryHeroImage = "*[_type=='heroImage'][0]";
  const queryNewestProduct = `*[_type=='product'][0...8] | order(_createdAt desc){
  _id, price, name, "slug":slug.current,
    "categoryName":category->name,
    "imageUrl": image[0].asset->url
    }`;
  const heroImage = await client.fetch(queryHeroImage);
  const newestProduct = await client.fetch(queryNewestProduct);
  return { heroImage, newestProduct };
}

export default async function Newest() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: { newestProduct: simplifiedProduct[]; heroImage: any } =
    await fetchData();
  console.log(data.heroImage);
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
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.newestProduct.map((product, index) => (
            <div key={index} className="group relative">
              <Link href={`/product/${product.slug}`}>
                <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-center object-cover lg:h-full lg:w-full"
                    width={300}
                    height={300}
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-xl md:text-xs lg:text-sm text-black">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.categoryName}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="bg-gray w-full h-[470px] p-3 mt-16 sm:mt-32 sm:p-14">
          <div>
            <Image
              src={images.hero3}
              alt="https://placehold.co/500x500"
              width={500}
              height={500}
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

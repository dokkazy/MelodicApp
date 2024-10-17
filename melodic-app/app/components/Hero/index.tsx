"use client";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import images from "@/assets/pictures/heroImage";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// async function GetData(category?: string) {
//   const queryProductByCategory = `*[_type == "product" && category->name == "${category}"] {
//     _id,
//       "imageUrl":image[0].asset->url,
//         price,
//       name,
//       "slug":slug.current,
//       "categoryName":category->name
//   }`;
//   const productByCategory = await client.fetch(queryProductByCategory);
//   return { productByCategory };
// }

export default function Hero() {
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();

  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="mb-8 flex flex-wrap justify-between md:mb-16">
        <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
          <h1 className="mb-4 text-4xl font-bold text-black max-md:text-center sm:text-5xl md:mb-8 md:text-6xl">
            Top speakers for a top price!
          </h1>
          <p className="w-full leading-relaxed md:max-w-md max-md:text-center text-gray-500 xl:text-lg">
            Perfect pitch is no longer a dream. With our speakers, you can
            experience the best sound quality you have ever heard.
            {/* We only sell the most exclusive and high quality products for you.
            We are the best in the market and we are proud of it. */}
          </p>
        </div>
        <div className="hidden mb-12 md:flex w-full md:mb-16 lg:w-2/3">
          <div className="relative lef-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
            <Image
              className="h-full w-full object-cover object-center"
              src={images.hero2}
              alt="https://placehold.co/500x500"
              priority
              width={500}
              height={500}
            />
          </div>
          <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
            <Image
              className="h-full w-full object-cover object-center"
              src={images.hero1}
              alt="https://placehold.co/500x500"
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
        <div className="w-full flex justify-center md:hidden">
          <Carousel className="w-full max-w-sm">
            <CarouselContent>
              <CarouselItem>
                <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
                  <Image
                    className="h-full w-full object-cover object-center"
                    src={images.hero2}
                    alt="https://placehold.co/500x500"
                    priority
                    width={500}
                    height={500}
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
                  <Image
                    className="h-full w-full object-cover object-center"
                    src={images.hero1}
                    alt="https://placehold.co/500x500"
                    priority
                    width={500}
                    height={500}
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
            {/* <CarouselPrevious />
            <CarouselNext /> */}
          </Carousel>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex h-12 min-w-80 divide-x overflow-hidden rounded-lg border">
          <Link
            href=""
            className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Bluetooth
          </Link>
          <Link
            href=""
            className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Headphones
          </Link>
          <Link
            href=""
            className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Speakers
          </Link>
        </div>
      </div>
    </section>
  );
}

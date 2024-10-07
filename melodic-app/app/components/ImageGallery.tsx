"use client";
import { useState } from "react";
import Image from "next/image";
import { urlFor } from "../lib/sanity";

interface ImageGalleryProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
}

export default function ImageGallery({ image }: ImageGalleryProps) {
  const [bigImage, setBigImage] = useState(image[0]);
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          image.map((img: any, index: number) => (
            <div key={index} className="overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={urlFor(img).url() as string}
                alt="https://placehold.co/200x200"
                width={200}
                height={200}
                className="object-cover h-full w-full cursor-pointer"
                onClick={() => setBigImage(img)}
              />
            </div>
          ))
        }
      </div>
      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
        <Image
          src={urlFor(bigImage).url() as string}
          alt="https://placehold.co/500x500"
          width={500}
          height={500}
          className="object-cover h-full w-full cursor-pointer"
        />
        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wide text-white">
          Sale
        </span>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import Image from "next/image";

import { checkIsImg } from "@/app/lib/utils";
import images from "@/assets/pictures/heroImage";

interface ImageGalleryProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
}

export default function ImageGallery({ image }: ImageGalleryProps) {
  const [bigImage, setBigImage] = useState(image);
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        <div className="overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={checkIsImg(image) ? image : images.empty}
            alt="image"
            width={200}
            height={200}
            className="h-full w-full cursor-pointer object-cover"
            onClick={() => setBigImage(image)}
          />
        </div>
        <div className="overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={checkIsImg(image) ? image : images.empty}
            alt="image"
            width={200}
            height={200}
            className="h-full w-full cursor-pointer object-cover"
            onClick={() => setBigImage(image)}
          />
        </div>
        <div className="overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={checkIsImg(image) ? image : images.empty}
            alt="image"
            width={200}
            height={200}
            className="h-full w-full cursor-pointer object-cover"
            onClick={() => setBigImage(image)}
          />
        </div>
      </div>
      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
        <Image
          src={checkIsImg(bigImage) ? bigImage : images.empty}
          alt="image"
          width={500}
          height={500}
          className="h-full w-full cursor-pointer object-cover"
        />
        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wide text-white">
          Sale
        </span>
      </div>
    </div>
  );
}

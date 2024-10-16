import Image from "next/image";
import { client, urlFor } from "../lib/sanity";
import Link from "next/link";
import BoxReveal from "@/components/ui/box-reveal";

async function GetData(category?: string) {
  const queryHeroImage = "*[_type=='heroImage'][0]";
  const queryProductByCategory = `*[_type == "product" && category->name == "${category}"] {
    _id,
      "imageUrl":image[0].asset->url,
        price,
      name,
      "slug":slug.current,
      "categoryName":category->name
  }`;
  const heroImage = await client.fetch(queryHeroImage);
  const productByCategory = await client.fetch(queryProductByCategory);
  return {heroImage, productByCategory};
}

export default async function Hero() {
  const data = await GetData();
  console.log(data);
  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="mb-8 flex flex-wrap justify-between md:mb-16">
        <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
          <BoxReveal boxColor={"#ffffff"} duration={0.5}>
            <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">
              Top speakers for a top price!
            </h1>
          </BoxReveal>
          <BoxReveal boxColor={"#ffffff"} duration={0.5}>
          <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
            Perfect pitch is no longer a dream. With our speakers, you can
            experience the best sound quality you have ever heard.
            {/* We only sell the most exclusive and high quality products for you.
            We are the best in the market and we are proud of it. */}
          </p>
          </BoxReveal>
        </div>
        <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
          <div className="relative lef-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
            <Image
              className="h-full w-full object-cover object-center"
              src={urlFor(data.heroImage.image2)?.url()}
              alt="https://placehold.co/500x500"
              priority
              width={500}
              height={500}
            />
          </div>
          <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
            <Image
              className="h-full w-full object-cover object-center"
              src={urlFor(data.heroImage.image1)?.url()}
              alt="https://placehold.co/500x500"
              width={500}
              height={500}
              priority
            />
          </div>
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

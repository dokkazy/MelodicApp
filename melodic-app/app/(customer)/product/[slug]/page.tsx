import { Star, Truck } from "lucide-react";

import ImageGallery from "@/app/components/ImageGallery";
import { fullProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/app/lib/utils";

async function fetchData(slug: string) {
  const query = `*[_type == "product" && slug.current=="${slug}"][0]{
  _id,
    price,
    image,
    name,
    description,
    "slug":slug.current,
    "categoryName":category->name,
    
}`;
  const response = await client.fetch(query);
  return response;
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullProduct = await fetchData(params.slug);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery image={data.image} />
          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                {data.categoryName}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {data.name}
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

            <p className="text-base text-gray-500 tracking-normal">{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { simplifiedProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import { formatPrice } from "@/app/lib/utils";
import Image from "next/image";
import Link from "next/link";

async function GetData() {
  const query = `*[_type == "product"] {
  _id,
    "imageUrl":image[0].asset->url,
      price,
    name,
    "slug":slug.current,
    "categoryName":category->name
}`;
  const response = await client.fetch(query);
  return response;
}

export default async function ShopPage() {
  const data: simplifiedProduct[] = await GetData();
  console.log(data);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product, index) => (
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
                    {formatPrice(product.price)}
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

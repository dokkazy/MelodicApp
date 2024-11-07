import images from "@/assets/pictures/heroImage";
import { BrandListResType } from "@/schemaValidations/brand.schema";
import Image from "next/image";

export default function BrandCard({ items }: { items: BrandListResType[] }) {
  return (
    <>
      {items.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="h-24 w-24 sm:h-32 sm:w-32">
            <Image
              src={images.hero2}
              alt={item.name}
              width={500}
              height={500}
              className="h-full w-full cursor-pointer object-cover transition duration-500 ease-in-out hover:scale-105"
            />
          </div>
          <h3 className="font-bold">{item.name}</h3>
          {/* <p>10 products</p> */}
        </div>
      ))}
    </>
  );
}

import images from "@/assets/pictures/heroImage";
import Image from "next/image";

export default function BrandCard() {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="h-24 w-24 sm:h-32 sm:w-32">
          <Image
            src={images.hero1 || "https://placehold.co/80"}
            alt="images"
            width={500}
            height={500}
            className="h-full w-full cursor-pointer object-cover transition duration-500 ease-in-out hover:scale-110"
          />
        </div>
        <h3 className="font-bold">SONY</h3>
        <p className="">10 products</p>
      </div>
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="h-24 w-24 sm:h-32 sm:w-32">
            <Image
              src={images.hero2}
              alt="images"
              width={500}
              height={500}
              className="h-full w-full cursor-pointer object-cover transition duration-500 ease-in-out hover:scale-105"
            />
          </div>
          <h3 className="font-bold">MARSHALL</h3>
          <p>10 products</p>
        </div>
      ))}
    </>
  );
}

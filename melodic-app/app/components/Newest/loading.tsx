import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 lg:h-80">
                <Skeleton className="w-full h-full object-center object-cover lg:h-full lg:w-full" />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <Skeleton className="w-32 h-5 mb-2" />
                  <Skeleton className="w-24 h-4" />
                </div>
                <Skeleton className="w-16 h-6" />
              </div>
            </div>
          ))}
        </div>
      )
}

import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLoading() {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:w-[60%] sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {Array.from({ length: 12 }, (_, index) => (
        <div key={index} className="group relative">
          <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 lg:h-80">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <Skeleton className="h-4 w-32 md:h-3 lg:h-2" />
              <Skeleton className="mt-1 h-4 w-24 md:h-3 lg:h-2" />
            </div>
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      ))}
    </div>
  );
}

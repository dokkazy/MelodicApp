import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLoading() {
  return (
    <div className="grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-2 md:w-full lg:grid-cols-4 xl:gap-x-8">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="group relative">
          <Card className="transition duration-500 ease-in-out hover:scale-105 hover:shadow-xl">
            <CardContent>
              <Skeleton className="h-32 w-full" />
              <div className="mt-4 flex flex-col gap-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex items-center gap-x-1 text-base">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-5 w-1/4" />
                </div>
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}

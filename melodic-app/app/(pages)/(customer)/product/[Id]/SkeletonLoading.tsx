import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLoading() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="aspect-square w-full bg-gray-200">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="md:py-8">
        <div className="mb-2 md:mb-3">
          <Skeleton className="w-24 h-4 mb-2" />
          <Skeleton className="w-48 h-6" />
        </div>

        <div className="mb-6 flex items-center gap-3 md:mb-10">
          <Skeleton className="w-16 h-6 rounded-full" />
          <Skeleton className="w-24 h-4" />
        </div>

        <div className="mb-4">
          <div className="flex items-end gap-2">
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-16 h-5" />
          </div>
          <Skeleton className="w-32 h-4 mt-1" />
        </div>

        <div className="mb-6 flex items-center gap-2 text-gray-500">
          <Skeleton className="w-6 h-6" />
          <Skeleton className="w-32 h-4" />
        </div>

        <div className="flex gap-2.5 mb-6">
          <Skeleton className="w-32 h-10 rounded-full" />
          <Skeleton className="w-32 h-10 rounded-full" />
        </div>

        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-full h-4" />
      </div>
    </div>
  );
}

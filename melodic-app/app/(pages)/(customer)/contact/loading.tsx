import LoadingComponent from "@/app/components/LoadingComponent";

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      {/* <h1 className="text-4xl font-bold text-primary">Loading...</h1> */}
      <LoadingComponent />
    </div>
  );
}

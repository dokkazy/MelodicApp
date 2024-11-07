import { Button } from "@/components/ui/button";
import Link from "next/link";

// Correctly define the prop type as an object with an `id` property
export default function ProductUpdateButton({ id }: { id: string }) {
  return (
    <Link href={`product/update/${id}`}>
      <Button variant="outline" className="bg-yellow-400">Edit</Button>
    </Link>
  );
}

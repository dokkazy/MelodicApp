import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BrandAddButton() {
    
    return (
      <Link href={'brand/add'}>
        <Button variant={'default'}  className="font-bold">Add Brand</Button>
      </Link>
    )
  }
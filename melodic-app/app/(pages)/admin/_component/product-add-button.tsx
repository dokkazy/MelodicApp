import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProductAddButton() {
    
    return (
      <Link href={'product/add'}>
        <Button variant={'default'}  className="font-bold">Add Product</Button>
      </Link>
    )
  }
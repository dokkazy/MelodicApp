import { Button } from "@/components/ui/button";
import { ProductResType } from "@/schemaValidations/product.schema";
import Link from "next/link";

type Product = ProductResType['data'];

interface ProductUpdateButtonProps {
  product?: Product;
}

export default function ProductUpdateButton({ product }: ProductUpdateButtonProps) {
  const productId = product?.Id || ''; // Safely get the product ID
  return (
    <Link href={`/product/update?id=${productId}`}>
      <Button variant="secondary">Edit</Button>
    </Link>
  );
}

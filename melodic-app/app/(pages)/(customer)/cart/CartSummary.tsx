import { formatPrice } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface CartSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
}

const CartSummary = ({ subtotal, tax, total }: CartSummaryProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-6">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Tax</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <div className="h-px bg-cart-border my-4" />
        <div className="flex justify-between font-medium text-lg">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
       <Link href={'/checkout'}>
          <Button className="w-full mt-6">
            Proceed to Checkout
          </Button>
       </Link>
      </div>
    </Card>
  );
};

export default CartSummary;
import { formatPrice } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useAppContext } from "@/providers/AppProvider";
import { useRouter } from "next/navigation";

interface CartSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
}

const CartSummary = ({ subtotal, tax, total }: CartSummaryProps) => {
  const router = useRouter();
  const {sessionToken} = useAppContext();

  const handleCheckout = () => {
    if(sessionToken){
      router.push("/checkout");
    }
    toast({
      title: "Please login to proceed",
      description: "You need to login to proceed to checkout",
      variant: "destructive",
    })
  }
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
       
          <Button onClick={handleCheckout} className="w-full mt-6">
            Proceed to Checkout
          </Button>
       
      </div>
    </Card>
  );
};

export default CartSummary;
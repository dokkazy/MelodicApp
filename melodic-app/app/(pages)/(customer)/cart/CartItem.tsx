import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { CartItem } from "@/stores/cartStore";
import { checkIsImg, formatPrice } from "@/app/lib/utils";
import images from "@/assets/pictures/heroImage";

interface CartItemProps {
  item: CartItem;
  onIncreaseQuantity: (id: string) => void;
  onDecreaseQuantity: (id: string) => void;
  onRemove: (id: string) => void;
}

const CartItemComp = ({
  item,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemove,
}: CartItemProps) => {
  const handleDecreaseQuantity = (id: string, name: string) => {
    if (item.quantity > 1) {
      onDecreaseQuantity(id);
      return;
    }
    const confirm = window.confirm(
      "Are you sure you want to remove this item?",
    );
    if (confirm) {
      onDecreaseQuantity(id);
      toast({
        title: `${name} has been removed from your cart.`,
      });
    }
  };

  const handleIncreaseQuantity = (id: string, unitInStock: number) => {
    if(item.quantity >= unitInStock) {
        toast({
            title: `You can't add more than ${unitInStock} items.`,
        });
        return;
    }
    onIncreaseQuantity(id);
  };

  const handleRemove = (id: string, name: string) => {
    const confirm = window.confirm(
      "Are you sure you want to remove this item?",
    );
    if (!confirm) return;
    onRemove(id);
    toast({
      title: `${name} has been removed from your cart.`,
    });
  };

  return (
    <div className="bg-cart-item border-cart-border animate-fadeIn flex items-center gap-4 rounded-lg border p-4">
      <Image
        src={checkIsImg(item.product.Img) ? item.product.Img : images.empty}
        alt={item.product.Name}
        width={500}
        height={500}
        className="h-24 w-24 rounded-md object-cover"
      />
      <div className="flex-1">
        <h3 className="text-lg font-medium">{item.product.Name}</h3>
        <p className="text-cart-secondary">{formatPrice(item.product.Price)}</p>
        <div className="mt-2 flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              handleDecreaseQuantity(item.product.Id, item.product.Name)
            }
            className="h-8 w-8"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleIncreaseQuantity(item.product.Id, item.product.UnitInStock)}
            className="h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-medium">
          {formatPrice(item.product.Price * item.quantity)}
        </p>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleRemove(item.product.Id, item.product.Name)}
          className="text-cart-secondary mt-2 hover:text-destructive"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItemComp;

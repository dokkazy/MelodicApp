import { checkIsImg, formatPrice } from "@/app/lib/utils";
import images from "@/assets/pictures/heroImage";
import { CartItem } from "@/stores/cartStore";
import Image from "next/image";

interface OrderSummaryProps {
  items: CartItem[];
}

const OrderSummary = ({ items }: OrderSummaryProps) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.Price * item.quantity,
    0,
  );
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="space-y-4 rounded-lg bg-white p-6 border">
      <h2 className="text-xl font-semibold">
        Orders ({items.length} products)
      </h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex gap-4 border-b py-4">
            <div className="relative">
              <Image
                src={
                  checkIsImg(item.product.Img) ? item.product.Img : images.empty
                }
                alt={item.product.Name}
                width={500}
                height={500}
                className="h-16 w-16 rounded object-cover"
              />
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-500 text-xs text-white">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium">{item.product.Name}</h3>
            </div>
            <div className="text-right">
              <p className="font-medium">{formatPrice(item.product.Price)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-2 pt-4">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping fee</span>
          <span>{formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between border-t pt-2 text-lg font-medium">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

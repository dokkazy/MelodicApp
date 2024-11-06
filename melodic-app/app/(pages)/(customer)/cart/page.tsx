"use client";
import React from "react";
import EmptyCart from "./EmptyCart";
import CartItemComp from "./CartItem";
import CartSummary from "./CartSummary";
import { useCartStore } from "@/providers/CartProvider";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeItem = useCartStore((state) => state.removeFromCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const subtotal = useCartStore((state) => state.getTotal());
  const tax = 0; // 10% tax
  const total = subtotal + tax;

  if (cart.length === 0) {
    return <EmptyCart />;
  }
  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cart.map((item, index) => (
              <CartItemComp
                key={index}
                item={item}
                onIncreaseQuantity={increaseQuantity}
                onDecreaseQuantity={decreaseQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>
          <div className="lg:col-span-1">
            <CartSummary subtotal={subtotal} tax={tax} total={total} />
          </div>
        </div>
      </div>
    </div>
  );
}

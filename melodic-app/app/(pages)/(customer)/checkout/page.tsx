"use client";
import React, { useState } from "react";
import ShippingForm from "./ShippingForm";
import { FormData } from "@/app/interface";
import { toast } from "@/hooks/use-toast";
import OrderSummary from "./OrderSummary";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/providers/CartProvider";
import { ShippingInfoType } from "@/schemaValidations/cart.schema";

const CheckoutSteps = () => (
  <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
    <span>Giỏ hàng</span>
    <span>›</span>
    <span>Thông tin giao hàng</span>
    <span>›</span>
    <span>Phương thức thanh toán</span>
  </div>
);

export default function CheckOutPage() {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);


  const handleSubmit = (values: ShippingInfoType) => {
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase.",
    });
    router.push("/");
  };
  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <CheckoutSteps />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ShippingForm
          
              onSubmit={handleSubmit}
              onBack={() => router.push("/cart")}
            />
          </div>
          <div className="lg:col-span-1">
            <OrderSummary items={cart} />
          </div>
        </div>
      </div>
    </div>
  );
}

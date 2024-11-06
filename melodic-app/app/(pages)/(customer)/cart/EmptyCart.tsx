import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

interface EmptyCartProps {
  setIsOpenSheetCart?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EmptyCart({ setIsOpenSheetCart = () => {} }: EmptyCartProps) {
  return (
    <div className="animate-fadeIn min-h-screen py-16 text-center">
      <div className="bg-cart-bg mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full">
        <ShoppingCart className="text-cart-secondary h-8 w-8" />
      </div>
      <h2 className="mb-2 text-2xl font-semibold">Your cart is empty</h2>
      <p className="text-cart-secondary mb-6">
        Looks like you have not added any items to your cart yet.
      </p>
      <Button>
        <Link onClick={() => setIsOpenSheetCart(false)} href={"/shop"}>Continue Shopping</Link>
      </Button>
    </div>
  );
}

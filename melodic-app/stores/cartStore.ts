import { ProductCartType } from "@/schemaValidations/product.schema";
import { createStore } from "zustand/vanilla";
import { createJSONStorage, persist } from "zustand/middleware";
import {toast } from "@/hooks/use-toast";

export interface CartItem {
  product: ProductCartType;
  quantity: number;
}

type CartState = {
  cart: CartItem[];
};

type CartActions = {
  getCarts: () => CartItem[];
  addToCart: (product: ProductCartType) => void;
  removeFromCart: (productId: string) => void;
  getQuantity: () => number;
  getTotal: () => number;
  clearCart: () => void;
  totalItem: (productId: string) => number;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
};

export type CartStoreType = CartState & CartActions;

const SESSION_TIMEOUT_DURATION = 30 * 60 * 1000; // 30 minutes

let sessionTimeout: NodeJS.Timeout;

const initialState: CartState = {
  cart: JSON.parse(localStorage.getItem("cart-store") || "[]"),
};

export const createCartStore = (initState: CartState = initialState) => {
  return createStore<CartStoreType>()(
    persist(
      (set, get) => ({
        ...initState,
        getCarts: () => {
          resetSessionTimeout();
          return get().cart;
        },

        addToCart: (product: ProductCartType) => {
          set((state) => {
            const existingItem = state.cart.find(
              (item) => item.product.Id === product.Id,
            );

            if (existingItem) {
              const newQuantity = existingItem.quantity + 1;
              if (newQuantity <= product.UnitInStock) {
                existingItem.quantity = newQuantity;
                toast({
                  title: "Add successfully",
                });
              } else {
                alert("Quantity exceeds available stock");
              }
            } else {
              if (1 <= product.UnitInStock) {
                state.cart.push({ product, quantity: 1 });
                toast({
                  title: "Add successfully",
                });
              } else {
                alert("Quantity exceeds available stock");
              }
            }

            resetSessionTimeout();
            return { cart: [...state.cart] };
          });
        },
        removeFromCart: (productId: string) => {
          set((state) => {
            const newCart = state.cart.filter(
              (item) => item.product.Id !== productId,
            );
            toast({
              title: "Item removed from cart",
            });
            resetSessionTimeout();
            return { cart: newCart };
          });
        },

        getQuantity: () => {
          resetSessionTimeout();
          return get().cart.reduce((total, item) => total + item.quantity, 0);
        },

        getTotal: () => {
          resetSessionTimeout();
          return get().cart.reduce(
            (total, item) => total + item.quantity * item.product.Price,
            0,
          );
        },

        clearCart: () => {
          set({ cart: [] });
          clearTimeout(sessionTimeout);
        },

        totalItem: (productId: string) => {
          resetSessionTimeout();
          const item = get().cart.find((item) => item.product.Id === productId);
          return item ? item.quantity : 0;
        },

        increaseQuantity: (productId: string) => {
          set((state) => {
            const item = state.cart.find(
              (item) => item.product.Id === productId,
            );
            if (item) {
              item.quantity += 1;
              resetSessionTimeout();
            }
            return { cart: [...state.cart] };
          });
        },

        decreaseQuantity: (productId: string) => {
          set((state) => {
            const item = state.cart.find(
              (item) => item.product.Id === productId,
            );
            if (item) {
              item.quantity -= 1;
              if (item.quantity === 0) {
                const newCart = state.cart.filter(
                  (item) => item.product.Id !== productId,
                );
                resetSessionTimeout();
                return { cart: newCart };
              }
              resetSessionTimeout();
            }
            return { cart: [...state.cart] };
          });
        },
      }),
      {
        name: "cart-store",
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: () => resetSessionTimeout(),
      },
    ),
  );
};

function resetSessionTimeout() {
  clearTimeout(sessionTimeout);
  sessionTimeout = setTimeout(() => {
    localStorage.removeItem("cart-store");
  }, SESSION_TIMEOUT_DURATION);
}


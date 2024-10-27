import { create } from "zustand";
import { CartItem } from "@/app/interface";
import { createSelectors } from "./createSelectors";

type cartState =  {
  cart: CartItem[];
  
}

type cartActions = {
  getCarts: () => CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  getQuantity: () => number;
  getTotal: () => number;
  clearCart: () => void;
  totalItem: (productId: string) => number;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
}

const useCartStore = create<cartState & cartActions>((set, get) => ({
  cart: [],
  getCarts: () => {
    const cartItems = localStorage.getItem("Carts");
    if (cartItems) {
      set({ cart: JSON.parse(cartItems) });
    }
    return get().cart;
  },

  addToCart: (newItem: CartItem) => {
    set((state) => {
      const existingItem = state.cart.find(
        (item) => item.productId === newItem.productId,
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.cart.push(newItem);
      }

      saveCartToLocalStorage(state.cart);

      return { cart: [...state.cart] };
    });
  },
  removeFromCart: (productId: string) => {
    set((state) => {
      const newCart = state.cart.filter((item) => item.productId !== productId);
      saveCartToLocalStorage(newCart);
      return { cart: newCart };
    });
  },

  getQuantity: () => {
    return get().cart.reduce((total, item) => total + item.quantity, 0);
  },

  getTotal: () => {
    return get().cart.reduce(
      (total, item) => total + item.quantity * item.price,
      0,
    );
  },

  clearCart: () => {
    set({ cart: [] });
    localStorage.removeItem("Carts");
  },

  totalItem: (productId: string) => {
    const item = get().cart.find((item) => item.productId === productId);
    return item ? item.quantity : 0;
  },

  increaseQuantity: (productId: string) => {
    set((state) => {
      const item = state.cart.find((item) => item.productId === productId);
      if (item) {
        item.quantity += 1;
        saveCartToLocalStorage([...state.cart]);
      }
      return { cart: [...state.cart] };
    });
  },

  decreaseQuantity: (productId: string) => {
    set((state) => {
      const item = state.cart.find((item) => item.productId === productId);
      if (item) {
        item.quantity -= 1;
        if (item.quantity === 0) {
          const newCart = state.cart.filter(
            (item) => item.productId !== productId,
          );
          saveCartToLocalStorage(newCart);
          return { cart: newCart };
        }
        saveCartToLocalStorage([...state.cart]);
      }
      return { cart: [...state.cart] };
    });
  },
}));

function saveCartToLocalStorage(items: CartItem[]) {
  localStorage.removeItem("Carts");

  localStorage.setItem("Carts", JSON.stringify(items));
}


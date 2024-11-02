import { ProductType } from "@/schemaValidations/product.schema";
import { createStore } from "zustand/vanilla";

export interface CartItem {
  product: ProductType;
  quantity: number;
}

type CartState = {
  cart: CartItem[];
};

type CartActions = {
  getCarts: () => CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  getQuantity: () => number;
  getTotal: () => number;
  clearCart: () => void;
  totalItem: (productId: string) => number;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
};

export type CartStoreType = CartState & CartActions;

const initialState: CartState = {
  cart: JSON.parse(localStorage.getItem("carts") || "[]"),
};

export const createCartStore = (initState: CartState = initialState) => {
  return createStore<CartStoreType>()((set, get) => ({
    ...initState,
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
          (item) => item.product.Id === newItem.product.Id,
        );

        if (existingItem) {
          existingItem.quantity += newItem.quantity;
          // existingItem.totalPrice +=
          //   existingItem.totalPrice * existingItem.quantity;
        } else {
          // newItem.totalPrice = newItem.product.Price * newItem.quantity;
          state.cart.push(newItem);
        }

        saveCartToLocalStorage(state.cart);

        return { cart: [...state.cart] };
      });
    },
    removeFromCart: (productId: string) => {
      set((state) => {
        const newCart = state.cart.filter(
          (item) => item.productId !== productId,
        );
        saveCartToLocalStorage(newCart);
        return { cart: newCart };
      });
    },

    getQuantity: () => {
      return get().cart.reduce((total, item) => total + item.quantity, 0);
    },

    getTotal: () => {
      return get().cart.reduce(
        (total, item) => total + item.quantity * item.product.Price,
        0,
      );
    },

    clearCart: () => {
      set({ cart: [] });
      localStorage.removeItem("Carts");
    },

    totalItem: (productId: string) => {
      const item = get().cart.find((item) => item.product.Id === productId);
      return item ? item.quantity : 0;
    },

    increaseQuantity: (productId: string) => {
      set((state) => {
        const item = state.cart.find((item) => item.product.Id === productId);
        if (item) {
          item.quantity += 1;
          saveCartToLocalStorage([...state.cart]);
        }
        return { cart: [...state.cart] };
      });
    },

    decreaseQuantity: (productId: string) => {
      set((state) => {
        const item = state.cart.find((item) => item.product.Id === productId);
        if (item) {
          item.quantity -= 1;
          if (item.quantity === 0) {
            const newCart = state.cart.filter(
              (item) => item.product.Id !== productId,
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
};

function saveCartToLocalStorage(items: CartItem[]) {
  localStorage.removeItem("carts");

  localStorage.setItem("carts", JSON.stringify(items));
}
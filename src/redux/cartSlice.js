import { createSlice } from "@reduxjs/toolkit";
const loadCartFromStorage = () => {
  try {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    }
  } catch (error) {
    console.error("Cart could not be loaded", error);
  }

  return {
    products: [],
    quantity: 0,
    total: 0,
  };
};
const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromStorage(),
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += action.payload.quantity;
      state.total += action.payload.price * action.payload.quantity;
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    removeFromCart: (state, action) => {
      const { index } = action.payload;
      const product = state.products[index];

      if (product) {
        state.quantity -= product.quantity;
        state.total -= product.price * product.quantity;
        state.products.splice(index, 1);
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(state)); // DOĞRU!
        }
      }
    },
    resetProduct: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
    },
  },
});
export const { addProduct, removeFromCart, resetProduct } = cartSlice.actions;
export default cartSlice.reducer;

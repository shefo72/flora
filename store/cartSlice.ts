import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/axios";
import { toast } from "react-toastify";

// fetch cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (customerId: number) => {
    const response = await api.get(`/cart.php?customer_id=${customerId}`);
    return response.data || [];
  },
);

// add
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (payload: any, { dispatch }) => {
    await api.post("/cart.php", payload);
    toast.success("Item added to cart!");
    dispatch(fetchCart(payload.customer_id));
    return payload;
  },
);

// update
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async (payload: any, { dispatch }) => {
    await api.put("/cart.php", payload);
    dispatch(fetchCart(1));
    return payload;
  },
);

// delete
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (payload: any, { dispatch }) => {
    await api.delete("/cart.php", { data: payload });
    toast.success("Item removed");
    dispatch(fetchCart(1));
    return payload.cart_id;
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] as any[],
    summary: {
      subtotal: 0,
      shipping: 0,
      grand_total: 0,
    },
    isLoading: false,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all cart
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload?.items || [];
        state.summary = action.payload?.summary || {
          subtotal: 0,
          shipping: 0,
          grand_total: 0,
        };
      })
      .addCase(fetchCart.rejected, (state) => {
        state.isLoading = false;
      })

      // add new item
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
      })

      // update quantity
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false;
      })

      //  remove item
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(removeFromCart.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

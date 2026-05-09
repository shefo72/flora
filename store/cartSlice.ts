import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '@/lib/axios';
import { CartItem } from '@/schemas/api.schema';
import { toast } from 'react-toastify';

export interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  isLoading: false,
  error: null,
};

// Helper to map API cart items to our local schema
const mapCartItem = (item: any): CartItem => ({
  cart_id: item.cart_id,
  customer_id: item.customer_id,
  product_id: item.product_id,
  quantity: item.quantity,
  name: item.name ?? item.product_name,
  price: item.price ?? item.base_price ?? 0,
  image: item.image ?? item.image_url,
});

// --- Thunks ---

// GET /cart.php?customer_id={id}
export const fetchCart = createAsyncThunk<CartItem[], string | number>(
  'cart/fetchCart',
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/cart.php?customer_id=${customerId}`);
      const data = response.data;
      
      let itemsArray = [];
      if (Array.isArray(data)) {
        itemsArray = data;
      } else {
        itemsArray = data?.data || data?.items || [];
      }
      
      return itemsArray.map(mapCartItem);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
    }
  }
);

// POST /cart.php
export const addToCart = createAsyncThunk<CartItem, Omit<CartItem, 'cart_id'>>(
  'cart/addToCart',
  async (itemData, { rejectWithValue }) => {
    try {
      const response = await api.post('/cart.php', itemData);
      toast.success('Item added to cart!');
      const responseData = response.data;
      if (responseData && typeof responseData === 'object' && 'product_id' in responseData) {
        return mapCartItem(responseData);
      }
      return mapCartItem(itemData);
    } catch (error: any) {
      toast.error('Failed to add item to cart.');
      return rejectWithValue(error.response?.data?.message || 'Failed to add item to cart');
    }
  }
);

// PUT /cart.php (Update Quantity)
export const updateCartQuantity = createAsyncThunk<
  any,
  { cart_id?: string | number; product_id: string | number; quantity: number },
  { rejectValue: CartItem }
>(
  'cart/updateCartQuantity',
  async (arg, { rejectWithValue, getState }) => {
    const state = getState() as { cart: CartState };
    const originalItem = state.cart.items.find(
      i => (arg.cart_id && i.cart_id === arg.cart_id) || i.product_id === arg.product_id
    );

    try {
      const response = await api.put('/cart.php', arg);
      return response.data;
    } catch (error: any) {
      toast.error('Failed to update quantity.');
      return rejectWithValue(originalItem as CartItem);
    }
  }
);

// DELETE /cart.php (Remove Item)
export const removeFromCart = createAsyncThunk<
  any,
  { cart_id?: string | number; product_id: string | number },
  { rejectValue: CartItem }
>(
  'cart/removeFromCart',
  async (arg, { rejectWithValue, getState }) => {
    const state = getState() as { cart: CartState };
    const originalItem = state.cart.items.find(
      i => (arg.cart_id && i.cart_id === arg.cart_id) || i.product_id === arg.product_id
    );

    try {
      await api.delete('/cart.php', { data: arg });
      toast.success('Item removed from cart.');
      return arg;
    } catch (error: any) {
      toast.error('Failed to remove item.');
      return rejectWithValue(originalItem as CartItem);
    }
  }
);

// --- Slice ---

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchCart
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // addToCart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // OPTIMISTIC UPDATE: updateCartQuantity
      .addCase(updateCartQuantity.pending, (state, action) => {
        const { cart_id, product_id, quantity } = action.meta.arg;
        const item = state.items.find(
          i => (cart_id && i.cart_id === cart_id) || i.product_id === product_id
        );
        if (item) {
          item.quantity = quantity; // Optimistically update
        }
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        if (action.payload) {
          const originalItem = action.payload;
          const item = state.items.find(
            i => (originalItem.cart_id && i.cart_id === originalItem.cart_id) || i.product_id === originalItem.product_id
          );
          if (item) {
            item.quantity = originalItem.quantity;
          }
        }
      })
      
      // OPTIMISTIC UPDATE: removeFromCart
      .addCase(removeFromCart.pending, (state, action) => {
        const { cart_id, product_id } = action.meta.arg;
        state.items = state.items.filter(
          i => !((cart_id && i.cart_id === cart_id) || i.product_id === product_id)
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        if (action.payload) {
          state.items.push(action.payload);
        }
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

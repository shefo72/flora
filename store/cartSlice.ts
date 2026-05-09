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

// --- Thunks ---

// GET /cart.php?customer_id={id}
export const fetchCart = createAsyncThunk<CartItem[], string | number>(
  'cart/fetchCart',
  async (customerId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/cart.php?customer_id=${customerId}`);
      const data = response.data;
      
      // Handle potential object wrapping like { data: [...] } or { items: [...] }
      if (Array.isArray(data)) {
        return data;
      }
      return data?.data || data?.items || [];
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
      
      // If the API returns the created item, use it. Otherwise, fallback to the item data sent.
      // This assumes the API returns the item or at least we have enough data to display it.
      const responseData = response.data;
      if (responseData && typeof responseData === 'object' && 'product_id' in responseData) {
        return responseData as CartItem;
      }
      return itemData as CartItem;
    } catch (error: any) {
      toast.error('Failed to add item to cart.');
      return rejectWithValue(error.response?.data?.message || 'Failed to add item to cart');
    }
  }
);

// --- Slice ---

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
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
      });
  },
});

export default cartSlice.reducer;

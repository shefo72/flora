import { authReducer, AuthState } from "./authSlice";
import cartReducer, { CartState } from "./cartSlice";
import { configureStore } from "@reduxjs/toolkit";

export function makeStore() {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
    },
  });

  return store;
}

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = typeof store.dispatch;

import { authReducer } from "./authSlice";
import cartReducer from "./cartSlice";
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
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

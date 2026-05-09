import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  customer_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  userInfo: null | User;
};

const loadState = (): AuthState => {
  if (typeof window !== "undefined") {
    const savedAuth = localStorage.getItem("authInfo");
    if (savedAuth) {
      return JSON.parse(savedAuth);
    }
  }
  return { isAuthenticated: false, userInfo: null };
};

const initialState: AuthState = loadState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthInfo: function (state, action: PayloadAction<AuthState>) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userInfo = action.payload.userInfo;

      if (typeof window !== "undefined") {
        localStorage.setItem("authInfo", JSON.stringify(action.payload));
      }
    },
    logout: function (state) {
      state.isAuthenticated = false;
      state.userInfo = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("authInfo");
      }
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setAuthInfo, logout } = authSlice.actions;

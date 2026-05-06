import { authReducer, AuthState } from '../app/store/authSlice';
import { configureStore } from '@reduxjs/toolkit';

type PreloadedState = {
  auth: AuthState;
};

export function makeStore(preloadedState?: PreloadedState) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState,
  });

  return store;
}

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
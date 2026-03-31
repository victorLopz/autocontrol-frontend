import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser, NavigationModule } from "@//types/auth-session";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  modules: NavigationModule[];
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  modules: [],
  isAuthenticated: false,
  loading: false,
  error: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ user: AuthUser; token: string; modules: NavigationModule[] }>
    ) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.modules = action.payload.modules;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.modules = [];
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    }
  }
});

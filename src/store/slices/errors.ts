import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ErrorType = {
  code: string;
  message: string;
  detail: string;
};

const initialState: ErrorType = {
  code: "",
  message: "",
  detail: "",
};

export const errorSlice = createSlice({
  name: "global-error",
  initialState,
  reducers: {
    save: (state, action: PayloadAction<ErrorType>) => {
      state.code = action.payload.code;
      state.message = action.payload.message;
      state.detail = action.payload.detail;
    },
    reset: () => initialState,
  },
});

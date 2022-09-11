import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hasError: false,
  tokenExpirationError: false,
};

const errorSlice = createSlice({
  name: 'hasError',
  initialState,
  reducers: {
    setError() {
      return {
        ...initialState,
        hasError: true,
      };
    },
    setFine() {
      return {
        ...initialState,
        hasError: false,
      };
    },
    setTokenExpirationError() {
      return {
        ...initialState,
        tokenExpirationError: true,
      };
    },
    setTokenExpirationErrorFine() {
      return {
        ...initialState,
      };
    },
  },
});

export const errorActions = errorSlice.actions;
export default errorSlice.reducer;

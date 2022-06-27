import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  whereToGoScrollY: { scrollY: 0 },
};

const scrollSlice = createSlice({
  name: 'scrollY',
  initialState,
  reducers: {
    whereToGoScrollY(state, action) {
      return {
        whereToGoScrollY: action.payload.scrollY,
      };
    },
    scrollCancle() {
      return initialState;
    },
  },
});

export const scrollActions = scrollSlice.actions;
export default scrollSlice.reducer;

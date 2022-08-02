import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  whereToGoScrollY: { scrollY: 0 },
  detailPlaceScrollY: { scrollY: 0 },
  myStorageY: { scrollY: 0 },
  homeY: { scrollY: 0 },
};

const scrollSlice = createSlice({
  name: 'scrollY',
  initialState,
  reducers: {
    scroll(state, action) {
      return {
        whereToGoScrollY: action.payload.whereToGo,
        detailPlaceScrollY: action.payload.detailPlace,
        myStorageY: action.payload.myStorage,
        homeY: action.payload.home,
      };
    },
    scrollInit() {
      return initialState;
    },
  },
});

export const scrollActions = scrollSlice.actions;
export default scrollSlice.reducer;

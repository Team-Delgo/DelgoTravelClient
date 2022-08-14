import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  whereToGoScrollY: 0,
  detailPlaceScrollY: 0,
  myStorageScrollY: 0,
  homeScrollY: 0,
  myAccountScrollY:0,
};

const scrollSlice = createSlice({
  name: 'scrollY',
  initialState,
  reducers: {
    scroll(state, action) {
      return {
        whereToGoScrollY: action.payload.whereToGo,
        detailPlaceScrollY: action.payload.detailPlace,
        myStorageScrollY: action.payload.myStorage,
        homeScrollY: action.payload.home,
        myAccountScrollY:action.payload.myAccount
      };
    },
    scrollInit() {
      return initialState;
    },
  },
});

export const scrollActions = scrollSlice.actions;
export default scrollSlice.reducer;

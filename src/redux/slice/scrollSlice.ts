import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  whereToGoScrollY: 0,
  detailPlaceScrollY: 0,
  myStorageScrollY: 0,
  homeScrollY: 0,
  myAccountScrollY: 0,
  myReviewsY:0,
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
        myAccountScrollY:action.payload.myAccount,
        myReviewsY:action.payload.myReviews,
      };
    },
    scrollInit() {
      return initialState;
    },
    myAccountScroll(state, action) {
      return {
        ...state,
        myAccountScrollY: action.payload.myAccount
      };
    },
    myReviewsScroll(state, action) {
      return {
        ...state,
        myReviewsY: action.payload.myReviews
      };
    },
    myStorageScroll(state, action) {
      return {
        ...state,
        myStorageScrollY: action.payload.myStorage
      };
    },
    detailPlaceScroll(state, action) {
      return {
        ...state,
        detailPlaceScrollY: action.payload.detailPlace
      };
    },
  },
});

export const scrollActions = scrollSlice.actions;
export default scrollSlice.reducer;

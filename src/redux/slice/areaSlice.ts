import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  whereToGo:{areaName:""},
};

const areaSlice = createSlice({
  name: 'whereToGoAreaName',
  initialState,
  reducers: {
    setArea(state, action) {
      return {
        whereToGo: action.payload.areaName,
      };
    },
    initArea() {
      return initialState;
    },
  },
});

export const areaActions = areaSlice.actions;
export default areaSlice.reducer;

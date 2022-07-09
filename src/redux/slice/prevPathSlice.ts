import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  detailPlace:{prevPath:""},
};

const prevPathSlice = createSlice({
  name: 'detailPlacePrevPath',
  initialState,
  reducers: {
    prevPath(state, action) {
      return {
        detailPlace: action.payload.prevPath,
      };
    },
    initPrevPath() {
      return initialState;
    },
  },
});

export const prevPathActions = prevPathSlice.actions;
export default prevPathSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  detailPlace:{prevPath:""},
};

const prevPathSlice = createSlice({
  name: 'prevPath',
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

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
detailPlacePrevPath:"",
};

const prevPathSlice = createSlice({
  name: 'prevPath',
  initialState,
  reducers: {
    prevPath(state, action) {
      return {
        detailPlacePrevPath: action.payload.prevPath,
      };
    },
    initPrevPath() {
      return initialState;
    },
  },
});

export const prevPathActions = prevPathSlice.actions;
export default prevPathSlice.reducer;

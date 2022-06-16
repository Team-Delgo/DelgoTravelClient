import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPlace: { placeId: 0, name: '', address: '', checkIn: '', checkOut: '' },
};

const placeSlice = createSlice({
  name: 'currentPlace',
  initialState,
  reducers: {
    currentPlace(state, action) {
      return {
        currentPlace: action.payload.place,
      };
    },
    currentPlaceCancle() {
      return initialState;
    },
  },
});

export const currentPlaceActions = placeSlice.actions;
export default placeSlice.reducer;

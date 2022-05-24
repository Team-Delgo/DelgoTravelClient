import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  place: { placeId: 0, name: '', address: ''},
  room: { roomId: 0, name: '', checkin: '', checkout: '', price: 0, images: []},
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    reservation(state, action) {
      return {
        place: action.payload.place,
        room: action.payload.room,
      };
    },
    reservationCancle() {
      return initialState;
    },
  },
});

export const reservationActions = reservationSlice.actions;
export default reservationSlice.reducer;
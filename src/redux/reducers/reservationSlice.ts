import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  place: { placeId: 0, name: '', address: '' },
  room: { roomId: 0, name: '', price: 0 },
  date: {
    date: {
      start: '',
      end: '',
    },
    dateString:'',
  },
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    reservation(state, action) {
      return {
        place: action.payload.place,
        room: action.payload.room,
        date: action.payload.date,
      };
    },
    reservationCancle() {
      return initialState;
    },
  },
});

export const reservationActions = reservationSlice.actions;
export default reservationSlice.reducer;

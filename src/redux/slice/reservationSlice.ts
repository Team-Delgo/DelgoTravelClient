import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: { id: 0, nickname: '', email: '', phone: '' },
  place: { placeId: 0, name: '', address: '' },
  room: { roomId: 0, name: '', price: 0, personNum: 0 },
  date: {
    date: {
      start: '',
      end: '',
    },
    dateString: '',
    checkIn: '',
    checkOut: '',
  },
  coupon:{couponId:0}
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    reservation(state, action) {
      return {
        user: action.payload.user,
        place: action.payload.place,
        room: action.payload.room,
        date: action.payload.date,
        coupon:action.payload.coupon
      };
    },
    reservationInit() {
      return initialState;
    },
  },
});

export const reservationActions = reservationSlice.actions;
export default reservationSlice.reducer;

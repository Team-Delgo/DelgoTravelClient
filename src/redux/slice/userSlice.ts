import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignIn: false,
  couponList:[],
  user: { id: 0, nickname: '', email: '', phone: '' },
  pet: { name: '', petId: 0, birthday: '', size: '', weight: 0, image: '' },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signin(state, action) {
      return {
        isSignIn: true,
        couponList: action.payload.couponList,
        user: action.payload.user,
        pet: action.payload.pet,
      };
    },
    signout() {
      return initialState;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;

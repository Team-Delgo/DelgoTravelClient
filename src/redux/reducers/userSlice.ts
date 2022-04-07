import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignIn: false,
  id: '',
  nickname: '',
  email: '',
  phone: '',
  pets: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signin(state, action) {
      return {
        isSignIn: true,
        id: action.payload.id,
        nickname: action.payload.nickname,
        email: action.payload.email,
        phone: action.payload.phone,
        pets: action.payload.pets,
      };
    },
    signout() {
      return initialState;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;

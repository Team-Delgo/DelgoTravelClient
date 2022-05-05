import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignIn: false,
  user: { id: 0, nickname: '', email: '', phone: '' },
  pets: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signin(state, action) {
      return {
        isSignIn: true,
        user: action.payload.user,
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

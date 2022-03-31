import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignIn: false,
    id: '',
    nickname: '',
    email: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signin(state,action) {
      return { isSignIn: true, id: action.payload.id, nickname: action.payload.nickname, email: action.payload.email };
    },
    signout(){
      return initialState;
    }
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;

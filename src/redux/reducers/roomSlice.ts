import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentRoom: { roomId: 0, name: '', price: 0 },
};

const roomSlice = createSlice({
  name: 'currentRoom',
  initialState,
  reducers: {
    currentRoom(state, action) {
      return {
        currentRoom: action.payload.room
      };
    },
    currentRoomCancle() {
      return initialState;
    },
  },
});

export const currentRoomActions = roomSlice.actions;
export default roomSlice.reducer;
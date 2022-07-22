import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentRoom: { roomId: 0, name: '', price: 0, personNum: 0 },
};

const roomSlice = createSlice({
  name: 'currentRoom',
  initialState,
  reducers: {
    currentRoom(state, action) {
      return {
        currentRoom: action.payload.room,
      };
    },
    currentRoomCancle() {
      return initialState;
    },
    currentRoomPrice(state, action) {
      return {
        currentRoom: {
          roomId: state.currentRoom.roomId,
          name: state.currentRoom.name,
          personNum: state.currentRoom.personNum,
          price:action.payload,
        }
      };
    },
  },
});

export const currentRoomActions = roomSlice.actions;
export default roomSlice.reducer;

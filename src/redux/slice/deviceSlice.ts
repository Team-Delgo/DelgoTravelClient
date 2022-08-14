import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  device : '',
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    android() {
      return {
        device : 'anroid'
      };
    },
    ios() {
      return {
        device : 'ios',
      };
    },
    
  },
});

export const deviceAction = deviceSlice.actions;
export default deviceSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import userSlice from './slice/userSlice';
import tokenSlice from './slice/tokenSlice';
import dateSlice from './slice/dateSlice';
import errorSlice from './slice/errorSlice';
import reservationSlice from './slice/reservationSlice';
import placeSlice from './slice/placeSlice';
import roomSlice from './slice/roomSlice';
import scrollSlice from './slice/scrollSlice';
import areaSlice from './slice/areaSlice';
import prevPathSlice from './slice/prevPathSlice';

const reducers = combineReducers({
  user: userSlice,
  currentPlace:placeSlice,
  currentRoom:roomSlice,
  reservation: reservationSlice,
  area:areaSlice,
  scroll:scrollSlice,
  prevPath:prevPathSlice
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: { persist: persistedReducer, token: tokenSlice, error: errorSlice, date: dateSlice},
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

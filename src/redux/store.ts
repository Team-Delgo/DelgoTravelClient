import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import userSlice from './reducers/userSlice';
import tokenSlice from './reducers/tokenSlice';
import dateSlice from './reducers/dateSlice';
import errorSlice from './reducers/errorSlice';
import reservationSlice from './reducers/reservationSlice';
import placeSlice from './reducers/placeSlice';
import roomSlice from './reducers/roomSlice';
import scrollSlice from './reducers/scrollSlice';

const reducers = combineReducers({
  user: userSlice,
  currentPlace:placeSlice,
  currentRoom:roomSlice,
  reservation: reservationSlice,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: { persist: persistedReducer, token: tokenSlice, error: errorSlice, date: dateSlice,scroll:scrollSlice},
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

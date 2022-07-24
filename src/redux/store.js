import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer ,persistCombineReducers} from 'redux-persist';
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

const togglePersistConfig = {
  key: 'toggle',
  storage
};
const persistConfig = {
  key: 'root',
  storage,
  debug: true,
  whitelist: ['toggle']
};

const reducers = {
  user: persistReducer(togglePersistConfig, userSlice),
  currentPlace:persistReducer(togglePersistConfig, placeSlice),
  currentRoom:persistReducer(togglePersistConfig, roomSlice),
  reservation: persistReducer(togglePersistConfig, reservationSlice),
  area:persistReducer(togglePersistConfig, areaSlice),
  scroll:persistReducer(togglePersistConfig, scrollSlice),
  prevPath:persistReducer(togglePersistConfig, prevPathSlice)
}

const persistedReducer = persistCombineReducers(persistConfig, reducers);

const store = configureStore({
  reducer: { persist: persistedReducer, token: tokenSlice, error: errorSlice, date: dateSlice },
  // devTools: process.env.NODE_ENV !== 'production',
  devTools: true,
});

export default store;


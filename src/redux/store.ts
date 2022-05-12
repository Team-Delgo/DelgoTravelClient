import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import userSlice from './reducers/userSlice';
import tokenSlice from './reducers/tokenSlice';

const reducers = combineReducers({
  user: userSlice,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: { persist: persistedReducer, token: tokenSlice },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

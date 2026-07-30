import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './toolkit';
import userReducer from './user';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
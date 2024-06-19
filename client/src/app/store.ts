import { configureStore } from '@reduxjs/toolkit'
import useReducer from './reducers/user.ts';
import globalReducer from './reducers/global.ts';

const store = configureStore({
  reducer: {
    user: useReducer,
    global: globalReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
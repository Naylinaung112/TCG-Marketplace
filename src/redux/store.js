import {configureStore, combineReducers} from '@reduxjs/toolkit';
import appSlice from './appSlice';

const rootReducer = combineReducers({
  app: appSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    });
  },
});

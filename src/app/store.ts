import { configureStore } from '@reduxjs/toolkit';

import uiReducer from '../features/ui/uiSlice';
import sortReducer from '../features/sorting/sortingSlice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    sorting: sortReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

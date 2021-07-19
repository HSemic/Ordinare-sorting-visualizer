import { createSlice } from "@reduxjs/toolkit";

// TYPES

type Value = 0 | 1 | 2 | 3;

interface UIState {
  value: Value;
  darkTheme: boolean;
}

// INITIAL STATE

const initialState = {
  value: 0,
  darkTheme: false,
} as UIState;

// Slice

const slice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    switchValue(state, action) {
      state.value = action.payload;
    },
    switchTheme(state) {
      state.darkTheme = !state.darkTheme;
    },
  },
});

export const { switchValue, switchTheme } = slice.actions;

export default slice.reducer;

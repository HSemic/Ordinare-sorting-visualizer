import { createSlice } from '@reduxjs/toolkit';

import { sortingAlgorithms, arraySizes, sortingSpeeds } from '../../app/config';

// TYPES

interface SortingState {
  sortingAlgorithm: number;
  array: number[];
  size: number;
  speed: number;
  playing: boolean;
}

// INITIAL STATE

const initialState = {
  sortingAlgorithm: sortingAlgorithms.get('Bubble Sort'),
  array: [],
  size: arraySizes.get('25'),
  speed: sortingSpeeds.get('1x'),
  playing: false
} as SortingState;

// Slice

const slice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    switchAlgorithm(state, action) {
      state.sortingAlgorithm = action.payload;
    },
    setArray(state, action) {
      state.array = action.payload as number[];
    },
    switchSize(state, action) {
      state.size = action.payload;
    },
    switchSpeed(state, action) {
      state.speed = action.payload;
    },
    setPlaying(state, action) {
      state.playing = action.payload;
    }
  }
});

export const {
  switchAlgorithm,
  switchSize,
  switchSpeed,
  setPlaying,
  setArray
} = slice.actions;

export default slice.reducer;

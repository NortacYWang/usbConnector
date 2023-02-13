import {createSlice} from '@reduxjs/toolkit';

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    centerRegion: [100, 100],
  },
  reducers: {
    setCenterRegion(state, action) {
      state.centerRegion = action.payload;
    },
  },
});

export const {setCenterRegion} = mapSlice.actions;

export default mapSlice.reducer;

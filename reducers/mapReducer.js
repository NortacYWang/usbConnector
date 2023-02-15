import {createSlice} from '@reduxjs/toolkit';

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    centerRegion: [100, 100],
    descriptionInfo: "",
    isMapReady: false,
  },
  reducers: {
    setCenterRegion(state, action) {
      state.centerRegion = action.payload;
    },

    setIsMapReady(state, action) {
      state.isMapReady = action.payload;
    },

    setDescriptionInfo(state, action) {
      state.descriptionInfo = action.payload
    }

  },
});

export const {setCenterRegion, setDescriptionInfo, setIsMapReady} = mapSlice.actions;

export default mapSlice.reducer;

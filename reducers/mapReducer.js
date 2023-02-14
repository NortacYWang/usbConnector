import {createSlice} from '@reduxjs/toolkit';

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    centerRegion: [100, 100],
    descriptionInfo: "",
  },
  reducers: {
    setCenterRegion(state, action) {
      state.centerRegion = action.payload;
    },

    setDescriptionInfo(state, action) {

      state.descriptionInfo = action.payload
    }
  },
});

export const {setCenterRegion, setDescriptionInfo} = mapSlice.actions;

export default mapSlice.reducer;

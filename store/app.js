import {createSlice} from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    language: 'en',
  },
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
    },
  },
});

export const {setLanguage} = appSlice.actions;

export default appSlice.reducer;

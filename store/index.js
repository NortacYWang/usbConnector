import {configureStore} from '@reduxjs/toolkit';
//all seperate reducers will come here
import appReducer from './app';
import mapReducer from '../components/map/map';

export const store = configureStore({
  reducer: {
    app: appReducer,
    map: mapReducer,
  },
});

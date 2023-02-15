import {configureStore} from '@reduxjs/toolkit';

//all seperate reducers will come here
import appReducer from '@reducers/appReducer';
import mapReducer from '@reducers/mapReducer';
import polygonReducer from '@reducers/polygonReducer';

export const store = configureStore({
  reducer: {
    app: appReducer,
    map: mapReducer,
    polygon: polygonReducer
  },
});

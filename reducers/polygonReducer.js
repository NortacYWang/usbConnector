import {createSlice} from '@reduxjs/toolkit';
import {DummyPolygon} from '../components/map/DummyData';

const initialPolygon = {
  coordinate: [],
  distance: 0,
  lastLatLng: undefined,
  initialLatLng: undefined,
  centerLatLng: undefined,
};

const polygonSlice = createSlice({
  name: 'polygon',
  initialState: {
    polygons: [...DummyPolygon],
    isEditingPolygon: false,
    editPolygon: initialPolygon,
    points: [],
  },
  reducers: {
    finishDrawingPolygon(state, action) {
      state.polygons = [...state.polygons, state.editPolygon];
      state.isEditingPolygon = false;
      state.editPolygon = initialPolygon;
      state.points = [];
    },

    setPolygonPoints(state, action) {
      state.points = action.payload;
    },

    setIsPolygonEditing(state, action) {
      state.isEditingPolygon = action.payload;
    },

    resetPolygonEditing(state, action) {
      state.editPolygon = initialPolygon;
      state.points = [];
    },
  },
});

export const {setIsPolygonEditing, finishDrawingPolygon, setPolygonPoints, resetPolygonEditing} =
  polygonSlice.actions;

export default polygonSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';
import {DummyPolygon} from '../components/map/DummyData';

const polygonSlice = createSlice({
  name: 'polygon',
  initialState: {
    polygons: [...DummyPolygon],
    editPolygon: null,
    creatingHole: false,
    isDrawingPolygon: false,
  },
  reducers: {
    finishDrawingPolygon(state, action) {
        state.polygons = [...state.polygons, state.editPolygon];
        state.editPolygon = null;
        state.creatingHole = false;
        state.isDrawingPolygon = false;
    },

    createHole(state, action) {
      const {editPolygon, creatingHole} = state;
      if (!creatingHole) {
        state.creatingHole = true;
        state.editPolygon = {
          ...editPolygon,
          holes: [...editPolygon.holes, []],
        };
      } else {
        const holes = [...editPolygon.holes];
        if (holes[holes.length - 1].length === 0) {
          holes.pop();
          state.editPolygon = {
            ...editPolygon,
            holes,
          };
        }
      }
      state.creatingHole = false;
    },

    setEditPolygon(state, action) {
      state.editPolygon = action.payload;
      state.polygons = [...state.polygons, action.payload];
    },

    setIsDrawingPolygon(state, action) {
        state.isDrawingPolygon = action.payload;
    }
  },
});

export const {setEditPolygon, finishDrawingPolygon, createHole, setIsDrawingPolygon} = polygonSlice.actions;

export default polygonSlice.reducer;

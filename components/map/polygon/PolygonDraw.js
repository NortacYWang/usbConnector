import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import MapView, {MAP_TYPES, Polygon} from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';





const PolygonDraw = () => {

    const editPolygon = useSelector(state => state.polygon.editPolygon);
    const creatingHole = useSelector(state => state.polygon.creatingHole);

    return (
      <View style={styles.container}>
          {editPolygon && (
            <Polygon
              key={editPolygon.id}
              coordinates={editPolygon.coordinates}
              holes={editPolygon.holes}
              strokeColor="#FF0000"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={3}
            />
          )}
       
     
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default PolygonDraw;

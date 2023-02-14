import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MapView from "react-native-map-clustering";

import {useSelector, useDispatch} from 'react-redux';

import {setDescriptionInfo} from '@reducers/mapReducer';

import Markers from './Markers';
import Polygons from './Polygons';

const INITIALREGION = {
  latitude: 16.5580192,
  longitude: 120.579284,
  latitudeDelta: 1,
  longitudeDelta: 1,
};

const Map = () => {
  const [mapRegion, setMapRegion] = useState(INITIALREGION);
  const dispatch = useDispatch();

  const descriptionInfo = useSelector(state => state.map.descriptionInfo);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={INITIALREGION}
        onRegionChange={setMapRegion}
        mapType={'standard'}
        onPress={e => {
          e.stopPropagation();
          dispatch(setDescriptionInfo(''));
        }}>
        {/*  display Markers */}
        <Markers />

        {/* display Polygons */}
        <Polygons />
      </MapView>
      {descriptionInfo.length > 0 && (
        <View
          style={{
            width: 300,
            height: 200,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 21, color: 'white'}}>{descriptionInfo}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});

export default Map;

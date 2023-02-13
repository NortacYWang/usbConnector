import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';

const INITIALREGION = {
  latitude: 16.5580192,
  longitude: 120.579284,
  latitudeDelta: 1,
  longitudeDelta: 1,
};

const Map = () => {
  const [mapRegion, setMapRegion] = useState(INITIALREGION);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={INITIALREGION}
        onRegionChange={setMapRegion}
        mapType={'standard'}></MapView>
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
  },
});

export default Map;

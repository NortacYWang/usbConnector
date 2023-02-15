import React, {useState, useRef, useCallback} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MapView from 'react-native-map-clustering';
import {Marker} from 'react-native-maps';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {setDescriptionInfo, setIsMapReady} from '@reducers/mapReducer';
import {DummyMarkers} from './DummyData';
import Polygons from './polygon/Polygons';
import PolygonDraw from './polygon/PolygonDraw';

const INITIALREGION = {
  latitude: 16.5580192,
  longitude: 120.579284,
  latitudeDelta: 1,
  longitudeDelta: 1,
};

const Map = () => {
  const [mapRegion, setMapRegion] = useState(INITIALREGION);
  const mapRef = useRef(null);

  const dispatch = useDispatch();

  const descriptionInfo = useSelector(state => state.map.descriptionInfo);

  const myIcon = <Icon name="location-arrow" size={50} color="#900" />;

  const handleMapReady = useCallback(
    () => mapRef.current && dispatch(setIsMapReady(true)),
    [],
  );

  const convertByPoint = async item =>{
    console.log("item", item);
    await mapRef.current?.coordinateForPoint(item);
  }
    

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={INITIALREGION}
        // onRegionChange={setMapRegion}
        mapType={'standard'}
        onPress={e => {
          e.stopPropagation();
          dispatch(setDescriptionInfo(''));
        }}
        ref={mapRef}
        onMapReady={handleMapReady}>
        {/*  display Markers, KEEP THESE LINES inside MapView, otherwise the cluster will not work */}
        {DummyMarkers.map(marker => (
          <Marker
            key={marker.title}
            coordinate={marker.coordinate}
            title={marker.title}
            onPress={() => {
              dispatch(setDescriptionInfo(marker.description));
            }}>
            {myIcon}
          </Marker>
        ))}

        {/* display Polygons */}
        <Polygons />
        
      </MapView>
      <PolygonDraw convertByPoint={convertByPoint}/>
      {descriptionInfo.length > 0 && (
        <View
          style={{
            width: 400,
            height: 100,
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
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});

export default Map;

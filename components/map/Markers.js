import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch} from 'react-redux';

import {setDescriptionInfo} from '@reducers/mapReducer';
import {DummyMarkers} from './DummyData';

export default function Markers() {
  const myIcon = <Icon name="location-arrow" size={50} color="#900" />;
  const dispatch = useDispatch();

  return (
    <View>
      {/*Render our MapView*/}

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
    </View>
  );
}

//create our styling code:
const styles = StyleSheet.create({});

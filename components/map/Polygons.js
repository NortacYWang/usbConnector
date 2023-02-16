import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Polygon,
} from 'react-native-maps';
import {useDispatch} from 'react-redux';

import {setDescriptionInfo} from '@reducers/mapReducer';

import {DummyPolygon} from './DummyData';

export default function Polygons() {

  const dispatch = useDispatch();
  return (
    <>
      {DummyPolygon.map((polygon, index) => (
        <Polygon
          key={index}
          coordinates={polygon.coordinate}
          strokeColor="#000"
          fillColor="rgba(255,0,0,0.5)"
          strokeWidth={1}
          zIndex={11}
          tappable={true}
          name={polygon.name}
          onPress={data => {
            dispatch(setDescriptionInfo(polygon.description))
          }}
        />
      ))}
    </>
  );
}

//create our styling code:
const styles = StyleSheet.create({
 
});

import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Polygon} from 'react-native-maps';
import {useSelector} from 'react-redux';

const PolygonDraw = () => {
  const editPolygon = useSelector(state => state.polygon.editPolygon);

  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({});

export default PolygonDraw;

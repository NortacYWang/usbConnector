import React, { useState, useCallback, useRef, useMemo } from 'react';
import {
  StyleSheet,
  Animated,
  View,
  Image,
  SafeAreaView,
  Text,
} from 'react-native';
// import MapViewGestures from 'react-native-maps-draw';
import MapViewGestures from "@dev-event/react-native-maps-draw"
import { Polygon } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import { setIsPolygonEditing, finishDrawingPolygon, setPolygonPoints, resetPolygonEditing } from '@reducers/polygonReducer';

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

export default function PolygonDraw({
    convertByPoint
}) {

  const dispatch = useDispatch();

  const isEditingPolygon = useSelector(state => state.polygon.isEditingPolygon);
  const editPolygon = useSelector(state => state.polygon.editPolygon);
  const polygonPoints = useSelector(state => state.polygon.points);
  const isMapReady = useSelector(state=>state.map.isMapReady)

  const [points, setPoints] = useState([]);

//   const initialPolygon = useRef({
//     polygons: [],
//     distance: 0,
//     lastLatLng: undefined,
//     initialLatLng: undefined,
//     centerLatLng: undefined,
//   });

//   const [isActiveDraw, setDrawMode] = useState(false);
//   const [polygon, setPolygon] = useState(initialPolygon.current);
//   const [isReady, setIsReady] = useState(false);
//   const [points, setPoints] = useState([]);

//   const handleMapReady = useCallback(
//     () => mapRef.current && setIsReady(true),
//     []
//   );

//   const convertByPoint = async (item) =>
//     await mapRef.current?.coordinateForPoint(item);

  const handleRemovePolygon = () => {
    dispatch(resetPolygonEditing())
  };

  const handleCanvasEndDraw = useCallback((locations) => {
    // setPolygon(locations);
    console.log("locations", locations);

    dispatch(setIsPolygonEditing(false))
  }, []);

  const handlePolygon = useCallback(
    (_, index) => (
      <AnimatedPolygon
        key={index}
        coordinates={editPolygon.coordinate}
        fillColor="rgba(255, 171, 171, 0.01)"
        strokeColor="rgba(255, 171, 171, 0.88)"
        strokeWidth={1}
      />
    ),
    [editPolygon.coordinate]
  );

//   const isVisiblePolygons = useMemo(
//     () => isReady && polygon.polygons && polygon.polygons.length > 0,
//     [isReady, polygon.polygons]
//   );

  return (
    <>
        {/* {isVisiblePolygons && (
          <>
            {polygon.centerLatLng && (
              <Marker
                onPress={handleRemovePolygon}
                coordinate={polygon.centerLatLng}
              >
                <View style={styles.card}>
                  <Image
                    source={require('../assets/location.png')}
                    resizeMode={'stretch'}
                    style={styles.img}
                  />
                </View>
              </Marker>
            )}
            {polygon.polygons.map(handlePolygon)}
          </>
        )} */}

      {isEditingPolygon && (
        <MapViewGestures
          points={points}
          widthLine={3}
          colorLine={'green'}
          onStartDraw={() => {
            console.log("startDear")
          }}
          onEndDraw={handleCanvasEndDraw}
        //   onChangePoints={(value) => {
        //     console.log("point value", value);
        //     dispatch(setPolygonPoints(value))
        //   }}
          onChangePoints={setPoints}
          backgroundCanvas={'rgba(0, 0, 0, 0.5)'}
          convertByPoint={convertByPoint}
        />
      )}

      {/* <View style={styles.panel}>
        <Text style={styles.title}>Menu</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <MenuCard
            enabled={isActiveDraw}
            title={'Draw Area'}
            onTap={() => {
              setPolygon(initialPolygon.current);
              setPoints([]);
              setDrawMode(true);
            }}
          />
        </View>
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  panel: {
    flexDirection: 'column',
    bottom: '0%',
    width: '100%',
    height: '20%',
    backgroundColor: 'white',
    position: 'absolute',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  title: {
    color: '#241f1f',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    alignSelf: 'center',
  },
  img: {
    height: 18,
    width: 18,
    tintColor: 'white',
  },
  map: {
    flex: 1,
  },

  card: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: 'orange',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
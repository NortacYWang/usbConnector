import React, {useState} from 'react';

// External
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import DropDown from 'react-native-paper-dropdown';
import {TranslationConsumer, getTranslation} from 'react-native-translation';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from 'react-native-paper';

// Internal
import {setLanguage} from '@reducers/appReducer';
import {
  finishDrawingPolygon,
  setIsDrawingPolygon,
} from '@reducers/polygonReducer';
import {Languages} from '@constants';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
  menuContainer: {
    zIndex: 2,
    elevation: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    width: width / 3,
    height: height,
    backgroundColor: 'rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  mapStyleButton: {
    width: '50%',
  },
  textView: {
    width: 200,
    height: 'auto',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 25,
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

const Menu = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.app.language);
  const editPolygon = useSelector(state => state.polygon.editPolygon);
  const isDrawingPolygon = useSelector(state => state.polygon.isDrawingPolygon);

  const [showDropDown, setShowDropDown] = useState(false);

  const lanagugeList = Languages.map(language => ({
    label: getTranslation(language),
    value: language,
  }));

  return (
    <View style={styles.menuContainer}>
      <View style={styles.textView}>
        <Text style={styles.text}>{getTranslation('moduleName.label1')}</Text>
      </View>
      <TranslationConsumer>
        {({language, updateLanguage}) => {
          return (
            <DropDown
              label={getTranslation('language')}
              //   mode={'outlined'}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={currentLanguage}
              setValue={value => {
                updateLanguage(value);
                dispatch(setLanguage(value));
              }}
              list={lanagugeList}
            />
          );
        }}
      </TranslationConsumer>

      <View style={styles.buttonContainer}>
        {!isDrawingPolygon && (
          <Button
            onPress={() => dispatch(setIsDrawingPolygon(true))}
            mode="contained">
            {getTranslation('draw_polygon')}
          </Button>
        )}

        {editPolygon && (
          <Button
            onPress={() => dispatch(finishDrawingPolygon())}
            mode="contained">
            {getTranslation('finish')}
          </Button>
        )}
      </View>
    </View>
  );
};

export default Menu;

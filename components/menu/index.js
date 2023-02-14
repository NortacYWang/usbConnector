import React, {useState} from 'react';

// External
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import DropDown from 'react-native-paper-dropdown';
import {TranslationConsumer, getTranslation} from 'react-native-translation';
import {useSelector, useDispatch} from 'react-redux';

// Internal
import {setLanguage} from '@reducers/appReducer';
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
    justifyContent: "center",
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
});

const Menu = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(state => state.app.language);

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
    </View>
  );
};

export default Menu;

import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {LanguageProvider} from 'react-native-translation';
import { useSelector } from 'react-redux';

import Map from '@components/map';
import Menu from '@components/menu';
import Translations from './translations';
import SerialDataReader from './SerialDataReader';


const App = () => {

  const language = useSelector((state) => state.app.language);

  return (
    <LanguageProvider language={language} translations={Translations}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          <Map />
          <Menu />
          <SerialDataReader />
        </ScrollView>
      </SafeAreaView>
    </LanguageProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

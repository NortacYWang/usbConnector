/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import {LanguageProvider} from 'react-native-translation';
import {store} from './store';
import Translations from './translations';

const language = 'en';
const AppWrapper = () => (
  <StoreProvider store={store}>
    <PaperProvider>
      <LanguageProvider language={language} translations={Translations}>
        <App />
      </LanguageProvider>
    </PaperProvider>
  </StoreProvider>
);

AppRegistry.registerComponent(appName, () => AppWrapper);

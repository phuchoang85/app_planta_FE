import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Mainstack from './src/Mainstack';
import { Provider } from 'react-redux';
import store from './src/redux/store/Store';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';



function App(): React.JSX.Element {
  const persistor = persistStore(store);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <Mainstack />
        </PersistGate>
      </Provider>

    </SafeAreaView>
  )
}


export default App;

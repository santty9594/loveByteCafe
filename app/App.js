import React, {Component} from 'react';
import {Provider} from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import {PersistGate} from 'redux-persist/integration/react';
import {store} from '../src/store/store';
import AppRouter from './router';
import LoadingView from './Components/LoadingView';
import {PaperProvider} from 'react-native-paper';

const persistor = persistStore(store);

export default class App extends Component {
  render() {
    return (
      <PaperProvider>
        <Provider store={store}>
          <PersistGate loading={LoadingView} persistor={persistor}>
            <AppRouter />
          </PersistGate>
        </Provider>
      </PaperProvider>
    );
  }
}

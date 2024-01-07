import React, { Component } from 'react';
import { Image,SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { ModalPortal } from 'react-native-modals';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from './store/store';
import AppRouter from './routes/router';
import LoadingView from './Components/LoadingView';
import SplashScreen from 'react-native-splash-screen';
import Assets from './constants/assets';
import { PaperProvider } from 'react-native-paper';

const persistor = persistStore(store);

export default class App extends Component {
  state = {
    isReady: false,
  };

  _cacheResourcesAsync = async () => {
    setTimeout(() => { this.setState({ isReady: true }) }, 2500);
    SplashScreen.hide();
  }

  render() {
    if (!this.state.isReady) {
      return (
          <Image
            source={Assets.Images.splash}
            onLoad={this._cacheResourcesAsync}
            style={{
              resizeMode:'center',
              height: '100%',
              width: '100%'
            }}
          />
      );
    }
    return (
      <PaperProvider>
        <Provider store={store}>
          <PersistGate loading={LoadingView} persistor={persistor}>
            <AppRouter />
            <ModalPortal />
          </PersistGate>
        </Provider>
      </PaperProvider>
    );
  }
}

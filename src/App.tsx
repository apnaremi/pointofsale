import React from 'react';
import {Provider} from 'react-redux';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import {ApplicationNavigator} from './navigation';
import configureStore from './config/reduxConfig/configureStore';
import AppColors from './theme/appColors';
import './config/i18n';
const {store} = configureStore();

const theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: AppColors.primary,
    text: AppColors.secondary,
  },
};

export default function EntryPoint() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <ApplicationNavigator />
      </PaperProvider>
    </Provider>
  );
}

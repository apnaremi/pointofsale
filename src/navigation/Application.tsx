import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {navigationRef} from './Root';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'react-native';
import LoginView from '../views/login';

const Stack = createStackNavigator();

function ApplicationNavigator() {
  return (
    <NavigationContainer theme={DefaultTheme} ref={navigationRef}>
      <StatusBar barStyle={'dark-content'} />
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="HomeScreen" component={LoginView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;

import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {navigationRef} from './Root';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'react-native';
import LoginView from '../views/login';
import HomeView from '../views/home';
import CustomerView from '../views/customer';
import PwsRecoveryView from '../views/pwsRecovery';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator headerMode={'none'}>
      <MainStack.Screen name="LoginScreen" component={LoginView} />
      <MainStack.Screen name="HomeScreen" component={HomeView} />
      <MainStack.Screen name="PwsRecoveryScreen" component={PwsRecoveryView} />
    </MainStack.Navigator>
  );
}

function ApplicationNavigator() {
  return (
    <NavigationContainer theme={DefaultTheme} ref={navigationRef}>
      <StatusBar barStyle="light-content" />
      <RootStack.Navigator
        mode="modal"
        headerMode="none"
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
          cardOverlayEnabled: true,
        }}>
        <RootStack.Screen name="Main" component={MainStackScreen} />
        <RootStack.Screen name="CustomerScreen" component={CustomerView} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;

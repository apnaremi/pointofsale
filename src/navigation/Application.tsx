import React, {useCallback} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {navigationRef} from './Root';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {StatusBar, StyleSheet} from 'react-native';
import LoginView from '../views/login';
import HomeView from '../views/home';
import CustomerView from '../views/customer';
import PwsRecoveryView from '../views/pwsRecovery';
import CodeVerifyView from '../views/codeVerify';
import AppColors from '../theme/appColors';
import SettingsView from '../views/settings';
import ProfileView from '../views/settings/Profile';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {navigateToLogin} from './actions';
const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  const onPressLogOut = useCallback(() => {
    navigateToLogin();
  }, []);
  const IconComponent = useCallback(
    ({size}) => (
      <Icon color={AppColors.clear} size={size} name={'logout-variant'} />
    ),
    [],
  );
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        style={styles.itemStyle}
        label={''}
        onPress={onPressLogOut}
        icon={IconComponent}
      />
    </DrawerContentScrollView>
  );
}

function HomeDrawer() {
  const IconComponent = useCallback(
    props => <CustomDrawerContent {...props} />,
    [],
  );
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: AppColors.primary,
        inactiveTintColor: AppColors.clear,
        itemStyle: styles.itemStyle,
      }}
      drawerContent={IconComponent}
      initialRouteName="Home"
      drawerType={'permanent'}
      drawerStyle={styles.drawerStyle}>
      <Drawer.Screen
        name="Home"
        component={HomeView}
        options={{
          drawerLabel: '',
          drawerIcon: ({color, size, focused}) => (
            <Icon
              color={color}
              size={size}
              name={focused ? 'home' : 'home-outline'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsView}
        options={{
          drawerLabel: '',
          drawerIcon: ({color, size, focused}) => (
            <Icon
              color={color}
              size={size}
              name={focused ? 'cog' : 'cog-outline'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function MainStackScreen() {
  return (
    <MainStack.Navigator headerMode={'none'}>
      <MainStack.Screen name="LoginScreen" component={LoginView} />
      <MainStack.Screen name="HomeScreen" component={HomeDrawer} />
      <MainStack.Screen name="PwsRecoveryScreen" component={PwsRecoveryView} />
      <MainStack.Screen name="CodeVerifyScreen" component={CodeVerifyView} />
      <MainStack.Screen name="ProfileScreen" component={ProfileView} />
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

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: AppColors.secondary,
    width: 60,
  },
  itemStyle: {marginVertical: 20},
});

export default ApplicationNavigator;

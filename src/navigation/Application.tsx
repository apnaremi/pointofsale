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
import {Header} from '../components';
import {useTranslation} from 'react-i18next';
import APPMetrics from '../utils/metrics';
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
  const drawerContent = useCallback(
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
      drawerContent={drawerContent}
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
        component={SettingsDrawer}
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

function SettingsDrawer() {
  const {t} = useTranslation();
  const drawerContent = useCallback(
    props => (
      <DrawerContentScrollView {...props}>
        <Header hideBackButton={true} title={t('settings')} />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    ),
    [],
  );
  return (
    <Drawer.Navigator
      drawerType={'permanent'}
      initialRouteName="ProfileScreen"
      drawerContentOptions={{
        activeTintColor: AppColors.primary,
        inactiveTintColor: AppColors.secondary,
        labelStyle: {fontSize: APPMetrics.normalFontSize},
      }}
      drawerContent={drawerContent}>
      <Drawer.Screen
        name="ProfileScreen"
        options={{drawerLabel: t('profile')}}
        component={ProfileView}
      />
      <Drawer.Screen
        name="SettingsScreen"
        options={{drawerLabel: t('seating_arrangement')}}
        component={SettingsView}
      />
      <Drawer.Screen
        name="ProfileScreen1"
        options={{drawerLabel: t('orders')}}
        component={ProfileView}
      />
      <Drawer.Screen
        name="ProfileScreen2"
        options={{drawerLabel: t('change_password')}}
        component={ProfileView}
      />
      <Drawer.Screen
        name="SettingsScreen3"
        options={{drawerLabel: t('add_category')}}
        component={SettingsView}
      />
      <Drawer.Screen
        name="ProfileScreen4"
        options={{drawerLabel: t('pin_code')}}
        component={ProfileView}
      />
      <Drawer.Screen
        name="ProfileScreen5"
        options={{drawerLabel: t('qr_code')}}
        component={ProfileView}
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

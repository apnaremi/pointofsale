import React from 'react';
import LoginView from './LoginView';
import {View} from 'react-native';
import {MainContainer} from '../../components';
import APPStyles from '../../theme/styles';

function Container() {
  return (
    <MainContainer>
      <View style={APPStyles.contentContainer}>
        <LoginView />
      </View>
    </MainContainer>
  );
}
export default Container;

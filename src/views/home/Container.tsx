import React from 'react';
import HomeView from './View';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {LogoContainer, MainContainer} from '../../components';
import APPStyles from '../../theme/styles';

type Props = {
  onLogin: Function;
};

function Container(props: Props) {
  return (
    <MainContainer>
      <View style={APPStyles.contentContainer}>
        <HomeView {...props} />
      </View>
    </MainContainer>
  );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Container);

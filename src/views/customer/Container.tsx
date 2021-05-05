import React from 'react';
import LoginView from './CustomerView';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {MainContainer} from '../../components';
import APPStyles from '../../theme/styles';

type Props = {
  onLogin: Function;
};

function Container(props: Props) {
  return (
    <MainContainer>
      <View style={APPStyles.contentContainer}>
        <LoginView {...props} />
      </View>
    </MainContainer>
  );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Container);

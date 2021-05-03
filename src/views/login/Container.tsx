import React from 'react';
import LoginView from './View';
import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import {LogoContainer, MainContainer} from '../../components';
import APPStyles from '../../theme/styles';

type Props = {
  onLogin: Function;
};

function LoginContainer(props: Props) {
  return (
    <MainContainer>
      <ScrollView
        contentContainerStyle={APPStyles.contentContainer}
        keyboardShouldPersistTaps="handled">
        <LogoContainer />
        <LoginView {...props} />
      </ScrollView>
    </MainContainer>
  );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(LoginContainer);

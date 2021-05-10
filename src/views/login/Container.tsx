import React, {useCallback} from 'react';
import LoginView from './LoginView';
import {View} from 'react-native';
import {MainContainer} from '../../components';
import APPStyles from '../../theme/styles';
import {useDispatch} from 'react-redux';
import * as loginActions from '../../config/redux/actions/loginActions';
import * as rootActions from '../../config/redux/actions/rootActions';
import {ILoginResponse} from '../../config/models/api/login';
import {navigateToCodeVerify, navigateToHome} from '../../navigation/actions';

function Container() {
  const dispatch = useDispatch();
  const requestLogin = useCallback(values => {
    dispatch(loginActions.requestLogin(values, onSuccess, onFailure));
    dispatch(rootActions.enableLoader(true));
  }, []);

  const onSuccess = (response: ILoginResponse) => {
    dispatch(rootActions.enableLoader(false));
    if (response.tfaRequired) {
      navigateToCodeVerify({
        tfaToken: response.tfaToken,
        tfaUserId: response.tfaUserId,
      });
    } else {
      navigateToHome();
    }
  };

  const onFailure = (error: any) => {
    dispatch(rootActions.enableLoader(false));
    dispatch(rootActions.enableModal(error, true));
  };

  return (
    <MainContainer>
      <View style={APPStyles.contentContainer}>
        <LoginView requestLogin={requestLogin} />
      </View>
    </MainContainer>
  );
}
export default Container;

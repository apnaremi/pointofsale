import React, {useCallback, useEffect, useState} from 'react';
import LoginView from './LoginView';
import {Keyboard, View} from 'react-native';
import {MainContainer} from '../../components';
import APPStyles from '../../theme/styles';
import {useDispatch, useSelector} from 'react-redux';
import * as loginActions from '../../redux/user/actions';
import * as rootActions from '../../config/redux/actions/rootActions';
import {ILoginResponse} from '../../config/models/api';
import {navigateToCodeVerify, navigateToHome} from '../../navigation/actions';
import {appLog} from '../../utils/helpers';
import PinView from '../settings/PIN/PinView';
import {
  enableLoader,
  enableModal,
} from '../../config/redux/actions/rootActions';
import {loginPINApi} from '../../api/loginApi';

function Container() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(enableLoader(false));
  }, []);
  const [showPINForm, setShowPINForm] = useState(true);

  const userIdLinkWithPIN = useSelector(
    (state: any) => state.rootReducer.userIdLinkWithPIN,
  );

  const toggleShowPINForm = useCallback(() => {
    setShowPINForm(previousState => !previousState);
  }, []);

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
      appLog('OrderingSettings userData', response);
      navigateToHome();
    }
  };

  const onFailure = (error: any) => {
    dispatch(rootActions.enableLoader(false));
    dispatch(rootActions.enableModal(error, true));
  };

  const loginPIN = useCallback(values => {
    Keyboard.dismiss();
    let pin = values.input1 + values.input2 + values.input3 + values.input4;
    appLog('pin', pin);
    dispatch(enableLoader(true));
    loginPINApi(pin, userIdLinkWithPIN).then((result: any) => {
      dispatch(enableLoader(false));
      if (result.success) {
        dispatch(loginActions.onLoginResponse(result));
        navigateToHome();
      } else {
        dispatch(enableModal(result.message, true));
      }
    });
  }, []);

  return (
    <MainContainer>
      <View style={APPStyles.contentContainer}>
        {userIdLinkWithPIN && showPINForm ? (
          <PinView onSuccess={loginPIN} onCancel={toggleShowPINForm} />
        ) : (
          <LoginView requestLogin={requestLogin} />
        )}
      </View>
    </MainContainer>
  );
}
export default Container;

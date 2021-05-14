import React, {useCallback} from 'react';
import CodeVerifyView from './CodeVerifyView';
import {View} from 'react-native';
import {Header, MainContainer} from '../../components';
import APPStyles from '../../theme/styles';
import {useDispatch} from 'react-redux';
import {loginTFAApi, sendVerifyCode} from '../../config/api/loginApi';
import {
  enableLoader,
  enableModal,
} from '../../config/redux/actions/rootActions';
import {getUniqueId} from 'react-native-device-info';
import {navigateToHome} from '../../navigation/actions';
import * as loginActions from '../../config/redux/actions/loginActions';
import {UNIQUE_ID_DEV} from '../../utils/constants';

type Props = {
  route?: any;
};

function Container(props: Props) {
  const dispatch = useDispatch();

  const requestLogin = useCallback(values => {
    const {params} = props.route;
    loginTFAApi(
      values.verifyCode,
      params.tfaToken,
      __DEV__ ? UNIQUE_ID_DEV : getUniqueId(),
      params.tfaUserId,
    ).then((result: any) => {
      dispatch(enableLoader(false));
      if (result.success) {
        dispatch(loginActions.onLoginResponse(result));
        navigateToHome();
      } else {
        dispatch(enableModal(result.message, true));
      }
    });
  }, []);

  const requestCode = useCallback(() => {
    const {params} = props.route;
    sendVerifyCode(
      params.tfaToken,
      __DEV__ ? UNIQUE_ID_DEV : getUniqueId(),
      params.tfaUserId,
    ).then((result: any) => {
      dispatch(enableLoader(false));
      if (!result.success) {
        dispatch(enableModal(result.message, true));
      }
    });
  }, []);
  return (
    <MainContainer>
      <Header />
      <View style={APPStyles.contentContainer}>
        <CodeVerifyView
          onSubmitForm={requestLogin}
          onResendCode={requestCode}
        />
      </View>
    </MainContainer>
  );
}
export default Container;

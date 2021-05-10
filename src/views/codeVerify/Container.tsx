import React, {useCallback} from 'react';
import CodeVerifyView from './CodeVerifyView';
import {View} from 'react-native';
import {Header, MainContainer} from '../../components';
import APPStyles from '../../theme/styles';
import {useDispatch} from 'react-redux';
import * as loginActions from '../../config/redux/actions/loginActions';
import {appLog} from '../../utils/helpers';
import {ILoginResponse} from '../../config/models/api/login';
import {navigateToPwsRecovery, navigateToHome} from '../../navigation/actions';

function Container() {
  const dispatch = useDispatch();
  const requestLogin = useCallback(values => {
    dispatch(loginActions.requestLogin(values, onSuccess, onFailure));
  }, []);

  const onSuccess = (response: ILoginResponse) => {
    if (response.tfaRequired) {
      navigateToPwsRecovery();
    } else {
      navigateToHome();
    }
    appLog('login view', response);
  };

  const onFailure = (error: any) => {
    appLog('login view error', error);
  };

  return (
    <MainContainer>
      <Header />
      <View style={APPStyles.contentContainer}>
        <CodeVerifyView onSendResetMail={requestLogin} />
      </View>
    </MainContainer>
  );
}
export default Container;

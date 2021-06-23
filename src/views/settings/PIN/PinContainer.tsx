import React, {useCallback} from 'react';
import PinView from './PinView';
import {MainContainer, Text} from '../../../components';
import {Keyboard, StyleSheet, View} from 'react-native';
import APPStyles from '../../../theme/styles';
import * as rootActions from '../../../config/redux/actions/rootActions';
import {connect, useDispatch, useSelector} from 'react-redux';
import * as navigationActions from '../../../navigation/actions';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {appLog} from '../../../utils/helpers';
import {
  createPINSuccess,
  enableLoader,
  enableModal,
} from '../../../config/redux/actions/rootActions';
import {getQRCodeFile} from '../../../api/SettingsApi';
import {createPINAPI} from '../../../api/loginApi';

export type Props = {
  enableLoader: Function;
  showModal: Function;
  userId: number;
  userHash: string;
  onLogin: Function;
  route?: any;
};

function PinContainer(props: Props) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {params} = props.route;
  const userData = useSelector((state: any) => state.loginReducer.user);
  const saveData = useCallback(values => {
    Keyboard.dismiss();
    let pin = values.input1 + values.input2 + values.input3 + values.input4;
    if (params.pin) {
      appLog('CREATE PIN');

      dispatch(enableLoader(true));
      createPINAPI(params.pin, userData.id).then((result: any) => {
        dispatch(enableLoader(false));
        if (result.success) {
          dispatch(createPINSuccess(userData.id));
          //navigationActions.navigateToHome();
          navigationActions.goBack();
          navigationActions.goBack();
          navigationActions.navigateToHome();
          dispatch(enableModal(result.message));
        } else {
          dispatch(enableModal(result.message, true));
        }
      });
    } else {
      navigationActions.pushToPin({
        pin: pin,
      });
    }
  }, []);
  return (
    <MainContainer>
      <KeyboardAwareScrollView
        contentContainerStyle={APPStyles.contentContainer}
        keyboardShouldPersistTaps="handled">
        <PinView
          onSuccess={saveData}
          pinToConfirm={params && params.pin ? params.pin : ''}
          {...props}
        />
      </KeyboardAwareScrollView>
    </MainContainer>
  );
}

export default PinContainer;
